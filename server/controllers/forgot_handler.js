const db = require('../db/db');
const Promise = require('bluebird');
const jwt = require('jwt-simple');
const config = require('../config');
const mailer = require('../services/mailer');

function generateToken(user) {
  const timeStamp = new Date().getTime();
  const exp = Math.round(Date.now() / 1000 + 60 * 60);
  return jwt.encode({ sub: user.email, iat: timeStamp, exp }, config.secret);
}

exports.forgotPassword = function(req, res, next) {
  const { email } = req.body;

  // send a request to the database, getting the user e-mail
  const emailQuery = `SELECT * from users WHERE email = "${email}";`;
  // db.query is the mySQL query
  const query = Promise.promisify(db.query.bind(db));

  query(emailQuery)
    .then(([emailFound]) => {

    // if e-mail isn't found we stop
    if (!emailFound) {
      return res.status(403).send({ error: 'Email does not exist' });
    }

    // generate a token
    return generateToken(emailFound);
  })
    .then(token => {
      // send an email with the email and token
      mailer.sendMail(email, token, (err, info) => {
        if (err) {
          return console.error(err);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
      });
    })
    .catch(err => console.error(err));

};
