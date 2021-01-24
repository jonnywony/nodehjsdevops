'use strict';

const Faker = require('faker');

function generateRandomUserData(userContext, events, done) {
  
  const username = Faker.internet.userName();
  const email = Faker.internet.exampleEmail();
  const password = Faker.internet.password();
  const firstname = Faker.name.firstName();
  const lastname = Faker.name.lastName();

  userContext.vars.username = username;
  userContext.vars.email = email;
  userContext.vars.password = password;
  userContext.vars.firstname = firstname;
  userContext.vars.lastname = lastname;

  return done();
}

function generateRandomUserJson(userContext, events) {
  
  const username = Faker.internet.userName();
  const email = Faker.internet.exampleEmail();
  const password = Faker.internet.password();
  const firstname = Faker.name.firstName();
  const lastname = Faker.name.lastName();

  userContext.username = username;
  userContext.email = email;
  userContext.password = password;
  userContext.firstname = firstname;
  userContext.lastname = lastname;

  console.log(userContext)
  return userContext;
  
}

module.exports = {
    generateRandomUserData,
    generateRandomUserJson
  };
  