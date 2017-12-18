import express from 'express';
import mysql from '../database/index';
import {
  randomCity, randomNeighborhood, experienceInventoryDataNew, experienceInventoryData,
  reservationsIncoming, clientRequestingForUser
} from './sql_seed_data';

require('dotenv').config();
//import seed data file to post and patch
const app = express();
const port = process.env.PORT; //.env file 

app.listen(port, () => console.log(`listening on ${port}`))

app.get('/', (req, res) => { res.send('Inventory Service!');}

//  post request from vendor sending new experiences to inventory
app.post('/addExperience', (req, res) => {
  //goal to make ten thousand requests
  //post request to add new experiences and save them to database
  //call connection query to insert 10k requests
  mysql.connection.query('INSERT INTO Experiences SET ?', [req.body], (err, result) => {
    console.log('sql data inserted using post request')
  })

})

// patch request from vendor to update experiences inventory
app.patch('/updateExperience', (req, res) => {
  //goal to make ten thousand requests
  //post request to add new experiences and save them to database
  //call connection query to insert 10k requests
  mysql.connection.query('INSERT INTO Experiences SET ?', [req.body], (err, result) => {
    console.log('sql data inserted using post request')
  })

})