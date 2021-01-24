var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var fs = require('fs');
chai.use(chaiHttp);
var server = require('../');
const Faker = require('faker');

describe('User', () => {
  var User = new Object;
  User.username = Faker.internet.userName();
  User.email = Faker.internet.exampleEmail();
  User.password = Faker.internet.password();
  User.firstname = Faker.name.firstName();
  User.lastname = Faker.name.lastName();

  describe('/POST register', () => {
      it('it should return a registered user', (done) => {
        chai.request(server)
            .post('/api/user/register')
            .send(User)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body._id.should.not.be.empty;
                  done();
            })});
  });

  describe('/POST authenticate', () => {
    it('it should return a token', (done) => {
      chai.request(server)
          .post('/api/user/authenticate')
          .send(User)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                User.token=res.body.token;
                done();
          })});
  });

  describe('/get finduser', () => {
    it('it should return a user', (done) => {
      chai.request(server)
          .get('/api/user/finduser')
          .send(User)
          .end((err, res) => {
                res.should.have.status(200);
                res.body._id.should.not.be.empty;
                done();
          })});
  });

  describe('/post disable', () => {
    it('it should disable a user', (done) => {
      chai.request(server)
          .post('/api/user/disable')
          .send(User)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.isActive.should.not.be.false;
                done();
          })});
  });

  describe('/post deregister', () => {
    it('it should deregister a user', (done) => {
      chai.request(server)
          .post('/api/user/deregister')
          .send(User)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
          })});
  });

});
