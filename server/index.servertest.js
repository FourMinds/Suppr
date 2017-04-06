const request = require('supertest');

var app = require('./index').app

it('should return a response', (done) => {
  request(app)
    .get('/test')
    .expect(200)
    .expect('response')
    .end(done);
})