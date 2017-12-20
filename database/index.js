import mysql from 'mysql';
import { Promise } from 'bluebird';
//  import seed data
Promise.promisifyAll(require('mysql/lib/Connection').prototype);


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'experiencesInventory',
  // connectionLimit: 50,
});

connection.connect((err) => {
  if (err) { throw err; }
});

module.exports = connection;
