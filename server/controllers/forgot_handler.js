const db = require('../db/db');
const Promise = require('bluebird');
const mailer = require('../services/mailer');

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

    mailer.sendMail(email, (err, info) => {
      if (error) {
        return console.error(err);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });

  });


};