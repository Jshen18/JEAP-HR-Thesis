import mysql from 'mysql';
import request from 'supertest';
import { expect } from 'chai';
import { Promise } from 'bluebird';
import app from '../server/index';
import db from '../database';

//   test for server/node
describe('server connection GET route', () => {
  it('should respond with a 200 status code on /experiences GET', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.text).to.equal('Inventory Service!');
        done();
      });
  });
  it('should respond with experiences data', (done) => {
    request(app)
      .get('/experiences')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

// test for SQL schema
describe('Database', () => {
  it('should exist', function (done) {
    db.queryAsync('SHOW DATABASES LIKE "experiencesInventory"')
      .then(results => {
        expect(results.length).to.equal(1);
        done();
      })
  });
  it('should have tables city, neighborhood, experiences, reservations', function (done) {
    db.queryAsync('SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema="experiencesInventory"')
      .then(results => {
        expect(results.length).to.equal(4)
        results.forEach((item) => {
          const exists = ['City','Neighborhood','Experiences','Reservations'].indexOf(item['TABLE_NAME']) > -1
          expect(exists).to.equal(true);
          done();
        })
      })
  });
})

//  tests for SQL database
// describe('When running SQL server, experiencesInventory database', () => {
//   it('db.connection.connect should ...', (done) => {
//     db.connection.connect((err, result) => {
//         if(err){
//           throw err;

//           done();
//         }
//         expect(result).to.equal('SQL CONNECT SUCCESSFUL.');
//         done();
//     });
//   });
// });
// it('should have created a database, experiencesInventory', (done) => {
//   db.connection.query('SHOW DATABASES LIKE experiencesInventory');
// })
// )};

//   it('should be connected', (done) => {
//    db.connection(err, result) => {

//    })
//   it('should exist', (done, err) => {
//     db.connection.query('SHOW DATABASES LIKE experiencesInventory');
//   });
// });
//   it('should have city, experiences, neighborhood, and reservations tables', (done, err) => {
//     db.connection.query('SHOW TABLES');
//   });
