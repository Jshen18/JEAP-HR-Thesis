'use strict';

// function to create randomNeighborhood
const randomNeighborhood = function () {
  const neighborhoods = ['Palm Park', 'Downtown', 'Uptown', 'Westside', 'Northside', 'Eastside', 'Southside', 'Glen Oak', 'Jefferson Park', 'Hollywood', 'Hills', 'Logan Square'];
  const random = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
  return random.toLowerCase();
};
// function to create randomCity, add list from Ephraim
const randomCity = function () {
  const cities = ['New York City', 'Chicago', 'San Francisco', 'Los Angeles', 'Washington', 'Seattle', 'Boston', 'Austin', 'Philadelphia', 'Houston', 'San Diego', 'Denver', 'San Jose', 'Portland', 'Miami', 'Baltimore', 'Nashville', 'Dallas', 'Atlanta', 'Detroit', 'New Orleans', 'Minneapolis', 'Las Vegas', 'Honolulu', 'Phoenix', 'San Antonio', 'Milwaukee'];
  const random = cities[Math.floor(Math.random() * cities.length)];
  return random.toLowerCase();
};

function generateRandomData(userContext, events, done) {
  // generate data with Faker:
  const neighborhood = randomNeighborhood();
  const city = randomCity();
  // add variables to virtual user's context:
  userContext.vars.neighborhood = neighborhood;
  userContext.vars.city = city;

  // continue with executing the scenario:
  return done();
}

module.exports = {
  generateRandomData
};

