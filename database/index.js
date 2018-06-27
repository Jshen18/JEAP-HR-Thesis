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

// const insertExperienceInventory = () => (
//   connection.queryAsync('SELECT id FROM cities ORDER BY id ASC LIMIT 1')
//     .then((firstRow) => {
//       if (firstRow.id) {
//         return firstRow;
//       }
//       const query = 'INSERT INTO EXPERIENCES (Experience_title, Guest_max, Price_USD,
//    neighborhood_id, host_id, City_id, type_experience, picture, user_id, address,
//    date_range) VALUES ?';
//       const experienceArray = [];
//       for (let i = 0; i < 500; i++) {
//         //const mock = [()];
//         experienceArray.push(mock);
//       }
//       return connection.queryAsync(query, [experienceArray]);
//     })
// );

// const insertCity = () => {
//   const cityArray = [];
//   for (let i = 0; i < 500; i++) {
//     const mock = [randomCity()];
//     cityArray.push(mock);
//   }
//   return connection.queryAsync('INSERT INTO CITY (City) VALUES ?', [cityArray])
//     .then(res => console.log)
//     .catch(err => console.log('INSERT CITY BROKED SON', err));
//   // connection.queryAsync('SELECT id FROM cities ORDER BY id ASC LIMIT 1')
//   //   .then((firstRow) => {
//   //     if (firstRow.id) {
//   //       return firstRow;
//   //     }
//   //     const cityArray = [];
//   //     for (let i = 0; i < 500; i++) {
//   //       const mock = [randomCity()];
//   //       cityArray.push(mock);
//   //     }
//   //     return connection.queryAsync(query, [cityArray]);
//   //   })
//   // .then(res => Promise.resolve(res.insertId ? res.insertId : res.id))
//   // .catch(err => console.log(err))
// };

// const insertNeighborhoods = () => (
//   connection.queryAsync('SELECT id FROM cities ORDER BY id ASC LIMIT 1')
//     .then((firstRow) => {
//       if (firstRow.id) {
//         return firstRow;
//       }
//       const query = 'INSERT INTO NEIGHBORHOOD (Neighborhood, city_id) VALUES ?';
//       const neighborhoodArray = [];
//       // const cityID = for (let i = firstRow.id; i < MAX ID INSERT; i++) {

//       // }
//       for (let i = 0; i < 500; i++) {
//         const mock = [randomNeighborhood(), cityID];
//         neighborhoodArray.push(mock);
//       }
//       return connection.queryAsync(query, [neighborhoodArray]);
//     })
// );




// const initialize = () => (
//  insertCity()
//    .then(rows => insertNeighborhoods(blahblah))
//    .then(blah2 =>)
// );


/*
// 1--city, 2--neighborhood, 3--experiences, 4-reservations
insertCityTable();

const initialize = () => () =>
  insertCityTable()
    .then(blahblah => insertNeighborhoods(blahblah))
    .then(blah2 => insert)
);

promise for insertCityTable, then insertNeighborhoodTable?

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    const query = 'INSERT INTO NEIGHBORHOOD (Neighborhood) VALUES ?';
    for (let i = 0; i < 500; i++) {
      const mock = [[randomNeighborhood()]];
      connection.query(query, [mock], (error, result) => {
        if (error) {
          throw error;
        } else {
          console.log('Number of records inserted: ', result.affectedRows);
        }
      });
    }
  }
})
*/


// SELECT id FROM cities ORDER BY id ASC LIMIT 1
