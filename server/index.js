import express from 'express';
import bodyParser from 'body-parser';
import sqs from './awsFilesOnHold/sqsSetup';
import db from '../database/index';
import redisClient from './cache';

require('dotenv').config();
//  import seed data file to post and patch

const app = express();
const port = process.env.PORT || 3000; //  .env file

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`listening on ${port}`));

app.get('/', (req, res) => {
  res.status(200).send('Inventory Service!');
});

/*
  /experiences?neighborhood=Glen%20Park
*/
//  get request from client service (filter out which experiences that are available)
app.get('/experiences', (req, res) => {
  const { city } = req.query;
  const { neighborhood } = req.query;
  const neighborhoodQuery = db.queryAsync(`SELECT id FROM NEIGHBORHOOD WHERE Neighborhood='${neighborhood}' LIMIT 1`);
  const cityQuery = db.queryAsync(`SELECT id FROM CITY WHERE City='${city}'`);

  // redisClient.getAsync(city)
  //   .then((response) => {
  //     if (response != null) {
  //       sqs.sendClient(response);
  //       res.status(200).end();
  //     }
  //   })
  //   .catch((err) => {
  //     console.log('Redis Catch', err);
  //   });

  Promise.all([cityQuery, neighborhoodQuery])
    .then((data) => {
      const [cityData, neighborhoodData] = JSON.parse(JSON.stringify(data)).map(data => data[0] || undefined);
      const query = neighborhoodData == null ? `SELECT * FROM EXPERIENCES WHERE City_id=${cityData.id} LIMIT 1` :
        `SELECT * FROM EXPERIENCES WHERE City_id=${cityData.id} AND Neighborhood_id=${neighborhoodData.id} LIMIT 1`;
      db.queryAsync(query)
        .then((data) => {
          // redisClient.set(city, JSON.stringify(data));
          sqs.sendClient(JSON.stringify(data));
          res.status(200).end();
        })
        .catch((error) => {
          res.sendStatus(400, error);
        });
    })
    .catch((error) => {
      console.log('ERROR', error);
    });
});

//  add reservations to table, from reservations handler
app.post('/reservations', (req, res) => {
  const data = Object.assign({}, req.body, { 'date_range': JSON.stringify(req.body.date_range) });
  db.queryAsync('INSERT INTO EXPERIENCES SET ?', data)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.sendStatus(400, error);
    });
});

//  post request from vendor sending new experiences to inventory
//  why is req body not have to filled out in postman??
app.post('/addExperience', (req, res) => {
  const data = Object.assign({}, req.body, { 'date_range': JSON.stringify(req.body.date_range) });
  db.queryAsync('INSERT INTO experiences SET ?', data)
    .then((data) => {
      console.log('sql data inserted using post request');
      res.json(data);
    })
    .catch((error) => {
      res.sendStatus(400, error);
    });
});

export default app;

// patch request from vendor to update experiences inventory
// app.patch('/updateExperience', (req, res) => {
//   //goal to make ten thousand requests
//   //post request to add new experiences and save them to database
//   //call connection query to insert 10k requests
//   db.connection.query('INSERT INTO Experiences SET ?', [req.body], (err, result) => {
//     console.log('sql data inserted using post request');
//   });
// });
