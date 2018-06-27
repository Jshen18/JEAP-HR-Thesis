import db from './index';
import {
  randomNeighborhood, experienceInventoryDataNew, randomExperience,
  reservationsIncoming, clientRequestingForUser
} from './seedHelpers';

// const query = 'INSERT INTO CITY (City) VALUES ?';
// const cityData = [['New York City'], ['Chicago'], ['San Francisco'], ['Los Angeles'], ['Washington'], ['Seattle'], ['Boston'], ['Austin'], ['Philadelphia'], ['Houston'], ['San Diego'], ['Denver'], ['San Jose'], ['Portland'], ['Miami'], ['Baltimore'], ['Nashville'], ['Dallas'], ['Atlanta'], ['Detroit'], ['New Orleans'], ['Minneapolis'], ['Las Vegas'], ['Honolulu'], ['Phoenix'], ['San Antonio'], ['Milwaukee']];
// db.query(query, [cityData], (error, cityResult) => {
//   if (error) {
//     throw error;
//   } else {
//     console.log('Successfully seeded cities', cityResult);
//   }
// });


for (let j = 0; j < 20; j++) {
  for (let i = 0; i < 500; i++) {
    const randomCityQuery = 'SELECT id FROM city ORDER BY RAND() LIMIT 1';
    db.query(randomCityQuery, (error, result) => {
      const experiencesData = [];
      for (let k = 0; k < 1000; k++) {
        experiencesData.push(randomExperience(result[0].id, null));
      }
      const experiencesQuery = `INSERT INTO EXPERIENCES (Experience_title, Guest_max, Price_USD,
          neighborhood_id, host_id, City_id, type_experience, picture, user_id, address,
          date_range) VALUES ?`;
      db.query(experiencesQuery, [experiencesData], (error, experiencesResult) => {
        if (error) {
          throw error;
        }
        console.log('+++YAY EXP SUCCESS SEEDED DB', experiencesResult.insertId);
      });
    });
  }  
}
