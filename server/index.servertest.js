const request = require('supertest');
const expect = require('expect');
const db = require('./db/db.js');
const Promise = require('bluebird');
const _ = require('lodash');
const query = Promise.promisify(db.query.bind(db));
let app = require('./index').app;

beforeEach((done) => {
  Promise.all([
    query('DELETE from profile'),
    query('DELETE from users'),
    query('DELETE from ingredients'),
    query('DELETE from reviews'),
    query('DELETE from favorites'),
    query('DELETE from tags'),
    query('DELETE from recipes')
  ])
  .then(() => {
    request(app)
    .post('/signup')
    .send({
      email:'testUser@test.com',
      username: 'testUser',
      password: 'testUser'
    })
    .end(done);
  })
});


describe('Server Response', () =>{
  it('should return a response', (done) => {
    request(app)
      .get('/test')
      .expect(200)
      .expect('response')
      .end(done);
    })
});

describe('Signup', ()=> {
  it('should signup a new user', (done) => {
    request(app)
      .post('/signup')
      .send({
        email:'testUser2@test.com',
        username: 'testUser2',
        password: 'testUser'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.token).toBeA('string');
      })
      .end((err, res) => {
        if (err) return done(err);
        query('SELECT * from users').then(users=>{
          expect(users.length).toBe(2);
          expect(users[0].username).toBe('testUser');
          done();
        }).catch((err) => done(err))

      })

  })
});

describe('Signin', ()=> {
  it('should signin an existing user', (done) => {
        request(app)
          .post('/signin')
          .send({
            email:'testUser@test.com',
            username: 'testUser',
            password: 'testUser'
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.token).toBeA('string');
          })
          .end(done)
  })
});

describe('POST /recipe', () => {
  it('should create a new recipe', (done)=> {
    request(app)
      .post('/recipe')
      .send({
        username: 'testUser', 
        recipeName: 'recipe', 
        imageUrl: 'image', 
        difficulty : 'Easy', 
        cookTime: 10, 
        prepTime: 10, 
        servings: 4, 
        instructions: 'instructions', 
        description: 'description',
        tags: ['tag1', 'tag2', 'tag3'], 
        ingredients:{ 
          quantity: ['quantity1', 'quantity2'], 
          items: ['item1', 'item2'] 
        }
      })
      .end((err, res) => {
        if (err) return done(err);
        query('SELECT * from recipes').then(recipes => {
          expect(recipes.length).toBe(1);
          expect(recipes[0].name).toBe('recipe');
          done()
        }).catch((err) => done(err))
      })
  })
});
