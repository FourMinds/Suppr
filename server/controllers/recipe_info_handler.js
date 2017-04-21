const db = require('../db/db');
const config = require('../config');
const Promise = require('bluebird');
const _ = require('lodash');
const query = Promise.promisify(db.query.bind(db));

exports.getRecipeInfo = function(req, res, next) {
  const { recipeId } = req.query;
  const findFavoritesQuery = `SELECT * FROM favorites WHERE recipe_id=${recipeId}`;
  return query(findFavoritesQuery).then(favorites => {
    res.status(200).send({favoritesCount:favorites.length})
  });
};
