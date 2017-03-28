const passport = require('passport');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local');
const Promise = require('bluebird');
const db = require('../db/db');

const query = Promise.promisify(db.query.bind(db));

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  const userQuery = `SELECT * from users WHERE id = "${payload.sub}";`
  query(userQuery).then((user) => {
    if (user.length) {
      done(null, user);
    } else {
      done(null, false);
    }
  }, e => done(e, false));
});

const comparePassword = function (password, userPassword, callback) {
  bcrypt.compare(password, userPassword, (err, match) => {
    if (err) return callback(err);

    callback(null, match);
  });
};

const localOptions = { usernameField: 'username' };
const localLogin = new LocalStrategy(localOptions, function (username, password, done) {
  const localQuery = `SELECT * FROM users WHERE username = "${username}";`
  query(localQuery).then((user) => {
    if (!user.length) return done(null, false);
    console.log(user[0].password)
    comparePassword(password, user[0].password, (err, match) => {
      if (err) return done(err);
      if (!match) return done(null, false);
      return done(null, user);
    });
  });
}, e => done(e));

passport.use(jwtLogin);
passport.use(localLogin);
