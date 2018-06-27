import faker from 'faker';
import mysql from './index';

// const exports = module.exports;

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

// function to create date daysRange
const dateRange = function () {
  const month = dateMonth();
  const range = {};
  const days = [];
  const startDay = faker.random.number({ min: 4, max: 10 });
  const endDay = faker.random.number({ min: 11, max: 15 });
  for (let i = startDay; i < endDay; i++) {
    days.push(i);
  }
  range[month] = days;
  return range;
};

// helper function for random month
const dateMonth = function () {
  return faker.random.number({ min: 1, max: 12 });
};


const experienceInventoryDataNew = {
  experience_id: faker.random.number({ min: 100000, max: 1000000 }),
  experience_title: faker.lorem.words(),
  address: faker.address.streetAddress(),
  dateRange: dateRange(),
  type_experience: Math.random() >= 0.5, // denotes experience or immersion boolean
  city: randomCity(),
  neighborhood: randomNeighborhood(),
  picture: faker.image.abstract(),
  guest_max: faker.random.number({ min: 1, max: 15 }),
  price_USD: faker.finance.amount(10, 150, 2),
  host_id: faker.random.number({ min: 100000, max: 1000000 }),
};
// mock experience inventory data
const experienceInventoryDataGenerator = (cityId, neighborhoodId) => ({
  experience_title: faker.lorem.words(),
  guest_max: faker.random.number({ min: 1, max: 15 }),
  price_USD: parseInt(faker.finance.amount(10, 150, 2), 10),
  neighborhood_id: neighborhoodId,
  host_id: faker.random.number({ min: 100000, max: 1000000 }),
  city_id: cityId,
  type_experience: Math.random() >= 0.5, // denotes experience or immersion boolean
  picture: faker.image.abstract(),
  user_id: faker.random.number({ min: 100000, max: 1000000 }),
  address: faker.address.streetAddress(),
  date_range: JSON.stringify(dateRange()),
});

// mock experience data post request from vendor

const randomExperience = (cityId, neighborhoodId) => {
  return Object.values(experienceInventoryDataGenerator(cityId, neighborhoodId));
};

// mock reservations handler data coming in
const reservationsIncoming = {
  experience_id: faker.random.number({ min: 100000, max: 1000000 }),
  blackoutDates: dateRange(),
  maxGuestCount: faker.random.number({ min: 1, max: 15 }),
};


// mock client facing service requesting data, data sent from experiences
const clientRequestingForUser = {
  type: 'experience',
  dateRange: dateRange(),
  type_experience: Math.random() >= 0.5, // denotes experience or immersion boolean
  city: randomCity(),
  neighborhood: randomNeighborhood(),
  picture: faker.image.abstract(),
  guest_max: faker.random.number({ min: 1, max: 15 }),
  price_USD: faker.finance.amount(10, 150, 2),
};

export { randomCity, randomNeighborhood, experienceInventoryDataNew, randomExperience,
  reservationsIncoming, clientRequestingForUser };

