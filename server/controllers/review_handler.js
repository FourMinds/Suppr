const db = require('../db/db');
const config = require('../config');
const Promise = require('bluebird');
const _ = require('lodash');
const query = Promise.promisify(db.query.bind(db));

exports.postReview = function(req, res, next) {
  const { review, recipeId, rating, username } = req.body
  const usernameSubQuery = `SELECT id from users WHERE username = "${username}"`;
  const findReviewQuery = `SELECT * FROM reviews WHERE recipe_id=${recipeId} AND user_id=(${usernameSubQuery})`
  query(findReviewQuery).then(([result]) => {
    if (!result) {
      const insertReviewQuery = `INSERT INTO reviews(review, recipe_id, rating, user_id) VALUES ("${review}", "${recipeId}", "${rating}",(${usernameSubQuery}));`
      query(insertReviewQuery).then(posted => {
        return res.status(200).send(posted)
      })
    } else {
      const updateReviewQuery = `UPDATE reviews SET review="${review}", rating="${rating}" WHERE recipe_id="${recipeId}" AND user_id=(${usernameSubQuery});`
      query(updateReviewQuery).then(updated => {
        return res.status(200).send(updated)
      })
    }
  })
}

exports.getReview = function(req, res, next ) {
  const { id } = req.query
  if (!id) return res.status(422).send({ error: 'No recipe ID was given' });
  const findReviewsQuery = `SELECT reviews.*, users.username from reviews JOIN users ON reviews.user_id = users.id WHERE recipe_id=${id};`
  query(findReviewsQuery).then(reviews => {
    return res.status(200).send(reviews)
  })
}