import mysql from 'mysql';
import request from 'supertest';
import { expect } from 'chai';
import { Promise } from 'bluebird';
import db from '../database/index';
import {
  randomCity, randomNeighborhood, experienceInventoryDataNew, experienceInventoryData,
  reservationsIncoming, clientRequestingForUser
} from '../database/seedHelpers';
import seed from '../database/seed';
import app from '../server/index';


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
  
});

//  tests for SQL database
// describe('When running SQL server, experiencesInventory database', () => {
//   it('should exist', (done, err) => {
//     db.connection.query('SHOW DATABASES LIKE experiencesInventory');
//   });
// });
//   it('should have city, experiences, neighborhood, and reservations tables', (done, err) => {
//     db.connection.query('SHOW TABLES');
//   });
