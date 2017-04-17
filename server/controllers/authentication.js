const db = require('../db/db');
const jwt = require('jwt-simple');
const config = require('../config');
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');

function generateToken(user) {
  const timeStamp = new Date().getTime();
  const exp = Math.round(Date.now() / 1000 + 5 * 60 * 60) + 14400
  return jwt.encode({ sub: user[0].id, iat: timeStamp, exp }, config.secret);
}

exports.signin = function (req, res, next) {
  res.send({ token: generateToken(req.user) });
};

exports.getUsername = function (req, res, next) {
  const { username } = req.user[0]
  res.send({ username });
};

exports.signup = function (req, res, next) {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(422).send({ error: 'You must provide email, username and password' });
  } 
  const usernameQuery = `SELECT * from users WHERE username = "${username}";`;
  const emailQuery = `SELECT * from users WHERE email = "${email}";`;
  const query = Promise.promisify(db.query.bind(db));

  Promise.all([query(emailQuery), query(usernameQuery)]).then(([emailFound, usernameFound]) => {
    if (emailFound[0]) {
      return res.status(422).send({ error: 'Email is in use' });
    }
    if (usernameFound[0]) {
      return res.status(422).send({ error: 'Username is in use' });
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(password, salt, null, (err, hash) => {
        const saveUserQuery = `INSERT INTO users(email, username, password) VALUES("${email}", "${username}", "${hash}");`
        query(saveUserQuery).then(result => {
          const initializeProfileQuery = `INSERT INTO profile(user_id) VALUES("${result.insertId}");`
          query(initializeProfileQuery)
          res.status(200).json({ token: generateToken([{ id:result.insertId }])});
        })
      });
    });
    
  })
  
};