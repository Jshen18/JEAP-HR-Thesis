import express from 'express';
import bodyParser from 'body-parser';
import db from '../database/index';

require('dotenv').config();
//  import seed data file to post and patch
const app = express();
const port = process.env.PORT || 3000; //  .env file

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`listening on ${port}`));

app.get('/', (req, res) => {
  res.send('Inventory Service!');
});

//  get request from client service (filter out which experiences that are available)
app.get('/experiences', (req, res) => {
  db.queryAsync('SELECT * FROM EXPERIENCES')
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.sendStatus(400, error);
    });
});

// app.patch('/reservations', (req, res) => {
//   const data = Object.assign({}, req.body, { 'date_range' : JSON.stringify(req.body.date_range) });
//   db.queryAsync('INSERT INTO EXPERIENCES SET ?', data)
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((error) => {
//       res.sendStatus(400, error);
//     });
// });

//  post request from vendor sending new experiences to inventory
// app.post('/addExperience', (req, res) => {
//   db.queryAsync('INSERT INTO Experiences SET ?', [req.body], (err, result) => {
//     console.log('sql data inserted using post request')
//   });
// });

// patch request from vendor to update experiences inventory
app.patch('/updateExperience', (req, res) => {
  //goal to make ten thousand requests
  //post request to add new experiences and save them to database
  //call connection query to insert 10k requests
  db.connection.query('INSERT INTO Experiences SET ?', [req.body], (err, result) => {
    console.log('sql data inserted using post request');
  });
});
