const db = require('../db/db');
const config = require('../config');
const Promise = require('bluebird');
const query = Promise.promisify(db.query.bind(db));
const bcrypt = require('bcrypt-nodejs');

exports.changeEmail = function(req, res) {
  const { email, username } = req.body
  const checkEmailQuery = `SELECT * from users WHERE email = "${email}";`;
  query(checkEmailQuery).then((emailFound) => {
    if (emailFound[0]) {
      return res.status(422).send({ error: 'Email is in use' });
    }
    const updateEmailQuery = `UPDATE users SET email="${email}" WHERE username="${username}";`
    query(updateEmailQuery).then(() => res.status(200).send({ message: 'Email was updated' }))
  })
  
}

exports.changePassword = function(req, res) {
  const { password, username } = req.body
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(password, salt, null, (err, hash) => {
      const changePasswordQuery = `UPDATE users SET password = "${hash}" WHERE username="${username}";`;
      query(changePasswordQuery).then(() => {
          res.status(200).send({ message: 'Password was updated.' });
        })
          .catch(err => {
            res.status(500).send({ message: 'Server error: ', err });
          });
        })
    
  })
}