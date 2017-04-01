const db = require('../db/db');
const config = require('../config');
const Promise = require('bluebird');
const _ = require('lodash');
const query = Promise.promisify(db.query.bind(db));

exports.postFavorite = function(req, res, next) {
  const {recipeId, username} = req.body;
  const usernameSubQuery = `SELECT id from users WHERE username = "${username}"`;
  const findFavoriteQuery = `SELECT * from favorites WHERE recipe_id = "${recipeId}" AND user_id = (${usernameSubQuery});`
  console.log(findFavoriteQuery)
  query(findFavoriteQuery).then(([favorite]) => {
    if(!favorite) {
      const insertFavoriteQuery = `INSERT INTO favorites(recipe_id, user_id) VALUES("${recipeId}", (${usernameSubQuery}));`
      query(insertFavoriteQuery).then(posted => {
        res.status(200).send(posted)
      })
    } else {
      const deleteFavoriteQuery = `DELETE FROM favorites WHERE recipe_id=${recipeId} AND user_id=(${usernameSubQuery});`
      query(deleteFavoriteQuery).then(deleted => {
        res.status(200).send(deleted)
      })
    }
  })
}

exports.getFavorites = function(req, res, next) {
  const { id } = req.query
  if (!id) return res.status(422).send({ error: 'No user ID was given' });
  const findFavoritesQuery = `SELECT favorites.*, users.username from favorites JOIN users ON favorites.user_id = users.id WHERE user_id=${id};`
  query(findFavoritesQuery).then(reviews => {
    return res.status(200).send(reviews)
  })
}