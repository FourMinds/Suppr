const db = require('../db/db');
const config = require('../config');
const Promise = require('bluebird');
const _ = require('lodash');
const query = Promise.promisify(db.query.bind(db));

exports.addFollow = function(req, res, next) {
  const { username, followName } = req.body;
  const getIdForName = name => `SELECT id from users WHERE username = "${name}"`;
  const findFollowQuery = `SELECT * from followers WHERE user_id=(${getIdForName(username)}) AND follow_id=(${getIdForName(followName)})`
  query(findFollowQuery).then(([result]) => {
    if (!result) {
      const addFollowQuery = `INSERT into followers(user_id, follow_id) VALUES((${getIdForName(username)}), (${getIdForName(followName)}));`
      return query(addFollowQuery)
    } else {
      const removeFollowQuery = `DELETE from followers WHERE user_id=(${getIdForName(username)}) AND follow_id=(${getIdForName(followName)});`
      return query(removeFollowQuery)
    }
  })
    .then(result => res.status(200).send(result))
  
}

exports.getFollows = function(req, res, next) {
  const { username } = req.query;
  if (!username) return res.status(422).send({ error: 'No username specified' })
  const getIdForName = name => `SELECT id from users WHERE username = "${name}"`;
  const getFollowersQuery = `SELECT users.username from followers JOIN users ON followers.user_id = users.id WHERE follow_id=(${getIdForName(username)});`
  const getFollowsQuery = `SELECT users.username from followers JOIN users ON followers.follow_id = users.id WHERE user_id=(${getIdForName(username)});`
  Promise.all([query(getFollowersQuery), query(getFollowsQuery)]).then(([queryFollowers, queryFollows]) => {
    let follows = queryFollows.reduce((array, value) => {
      return [...array, value.username];
    }, [])
    let followers = queryFollowers.reduce((array, value) => {
      return [...array, value.username];
    }, [])
    res.status(200).send({ followers, follows })
  })
}
