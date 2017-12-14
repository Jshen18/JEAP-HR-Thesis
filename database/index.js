import mysql from 'mysql';
const Promise = require('bluebird');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'experiencesInventory'
});

connection.connect(function() {
  if (err) {
    console.log('error connecting mySQL: ', err);
  } else {
    console.log('connected mySQL! ' + connection.threadId);
  }




//Initialize sql and use ping to test connection. Used to check network protocol
// const initialize = () => (connection.pingAsync()
//   .then(() => console.log('MySql connection successful!!'))
//   .catch(err => console.log('MySql connection error, no ping response. Error: ', err))
//   //create airbnb database and use database
//   .then(()=> connection.queryAsync('CREATE DATABASE IF NOT EXISTS experiencesInventory'))
//   .then(()=> connection.queryAsync('USE experiencesInventory'))
//   .catch(err => console.log('MySql create database error: ', err))
//   //create experiences table
//   .then(()=> connection.queryAsync('CREATE TABLE IF NOT EXISTS experiences'))

//   //..continue on using table now with added schema creation
// )