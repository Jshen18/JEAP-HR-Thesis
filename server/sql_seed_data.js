const faker = require('faker');

const express = require('express');

const app = express();
const port = 3000; //.env file 

app.listen(port, () => console.log(`listening on ${port}`))


app.get('/experiences', function(req, res) {
  const randomNeighborhood = function() {
    const neighborhoods = ['Palm Park', 'Downtown', 'Uptown', 'Westside', 'Northside', 'Eastside', 'Southside', 'Glen Oak', 'Jefferson Park', 'Hollywood', 'Hills', 'Logan Square']
    const random = neighborhoods[Math.floor(Math.random()*neighborhoods.length)];
    return random;
  }
  const randomCity= function() {
    const cities = ['New York City', 'Chicago', 'San Francisco', 'Los Angeles', 'Washington', 'Seattle', 'Boston','Austin', 'Philadelphia', 'Houston', 'San Diego', 'Denver', 'San Jose', 'Portland', 'Miami', 'Baltimore', 'Nashville', 'Dallas', 'Atlanta', 'Detroit', 'New Orleans', 'Minneapolis', 'Las Vegas', 'Honolulu', 'Phoenix', 'San Antonio', 'Milwaukee']
    const random = cities[Math.floor(Math.random()*cities.length)];
    return random;
  }
  
  res.json([{
    experience_id: faker.finance.amount(100000, 1000000, 0),
    experience_title: faker.lorem.words(),
    address: faker.address.streetAddress(),
    type_experience: Math.random() >= 0.5,
    city: randomCity(),    
    neighborhood: randomNeighborhood(),
    picture: faker.image.abstract(),
    guest_max: faker.finance.amount(1, 20, 0),
    price_USD: faker.finance.amount(10, 150, 2),
    host_id: faker.finance.amount(100000, 1000000, 0),
    user_id: faker.finance.amount(100000, 1000000, 0),    
    }
  ])
});

