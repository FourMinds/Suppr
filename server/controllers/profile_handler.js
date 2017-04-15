const db = require('../db/db');
const config = require('../config');
const Promise = require('bluebird');
const _ = require('lodash');
const query = Promise.promisify(db.query.bind(db));

exports.postProfile = function(req, res) {
  const { image, bio, style, location, username } = req.body;
  const usernameSubQuery = `SELECT id from users WHERE username = "${username}"`;
  const setImage = `UPDATE profile SET image="${image}" WHERE user_id=(${usernameSubQuery});`  
  const setBio = `UPDATE profile SET bio="${bio}" WHERE user_id=(${usernameSubQuery});`  
  const setStyle = `UPDATE profile SET style="${style}" WHERE user_id=(${usernameSubQuery});`  
  const setLocation = `UPDATE profile SET location="${location}" WHERE user_id=(${usernameSubQuery});` 
  const queries = [] 
  image ? queries.push(setImage) : null; bio ? queries.push(setBio) : null;
  style ? queries.push(setStyle) : null; location ? queries.push(setLocation) : null;
  Promise.all(queries.map(set => query(set))).then(result => {
    res.status(200).send(result)
  })
}

exports.getProfile = function(req, res) {
  const { username } = req.query;
  const usernameSubQuery = `SELECT id from users WHERE username = "${username}"`;
  const getProfileQuery = `SELECT * from profile WHERE user_id=(${usernameSubQuery});`
  query(getProfileQuery).then(([result]) => {
    if (!result) return res.status(422).send({ error: 'User does not exist' });
    return res.status(200).send(result);
  })
}