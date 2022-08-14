const { faker } = require("@faker-js/faker");

const USERS = [];

function createUser() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    username: faker.word.noun(),
    password: "1234",
  };
}

Array.from({ length: 20 }).forEach(() => USERS.push(createUser()));

module.exports = { USERS };
