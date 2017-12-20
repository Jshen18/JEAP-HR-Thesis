import db from './index';
import {
  randomCity, randomNeighborhood, experienceInventoryDataNew, randomExperience,
  reservationsIncoming, clientRequestingForUser
} from './seedHelpers';


const x = 1000;
const y = 200;

for (let i = 0; i < x; i++) {
  const query = 'INSERT INTO CITY (City) VALUES ?';
  const cityData = [];
  for (let i = 0; i < y; i++) {
    cityData.push([randomCity()]);
  }
  db.query(query, [cityData], (error, cityResult) => {
    if (error) {
      throw error;
    } else {
      const query2 = 'INSERT INTO NEIGHBORHOOD (Neighborhood, city_id) VALUES ?';
      const neighborhoodData = [];
      for (let j = 0; j < y; j++) {
        neighborhoodData.push([randomNeighborhood(), cityResult.insertId]);
      }
      db.query(query2, [neighborhoodData], (error2, neighborhoodResult) => {
        if (error2) {
          throw error2;
        } else {
          const experiencesQuery = `INSERT INTO EXPERIENCES (Experience_title, Guest_max, Price_USD,
          neighborhood_id, host_id, City_id, type_experience, picture, user_id, address,
          date_range) VALUES ?`;
          const experiencesData = [];
          for (let k = 0; k < y; k++) {
            experiencesData.push(randomExperience(cityResult.insertId, neighborhoodResult.insertId));
          }
          db.query(experiencesQuery, [experiencesData], (error3, experiencesResult) => {
            if (error3) {
              throw error3;
            }
            console.log('+++YAY EXP SUCCESS SEEDED DB', experiencesResult.insertId);
          });
        }
      });
    }
  });
}
