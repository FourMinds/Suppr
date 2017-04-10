const request = require('supertest');
const expect = require('expect');
const db = require('./db/db');
const Promise = require('bluebird');
const _ = require('lodash');
const query = Promise.promisify(db.query.bind(db));
var app = require('./index').app

beforeEach((done) => {
  
})

describe('Server Response', () =>{
  it('should return a response', (done) => {
  request(app)
    .get('/test')
    .expect(200)
    .expect('response')
    .end(done);
  })
})

describe('Signup', ()=> {
  it('should signup a new user', (done)=>{
    request(app)
      .post('/signup')
      .send({
        email:'testUser@test.com',
        username: 'testUser',
        password: 'testUser'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.token).toBeA('string')
      })
      query('SELECT * from users').then(users=>{
        expect(users.length).toBe(1)
        expect(users[0].username).toBe('testUser')
        done()
      }).catch((err) => done(err))
  })
})

// xdescribe('POST /recipe', () => {
//   it('should create a new recipe', (done)=> {
//     request(app)
//       .post('/recipe')
//       .send({
//         username:, 
//         recipeName, 
//         imageUrl, 
//         difficulty, 
//         cookTime, 
//         prepTime, 
//         servings, 
//         instructions, 
//         description,
//         tags, 
//         ingredients:{ 
//           quantity, 
//           items 
//         }
//       })
//   })
// })
