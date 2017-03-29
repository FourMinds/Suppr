const db = require('../db/db');
const config = require('../config');
const Promise = require('bluebird');

exports.createRecipe = function(req, res, next) {
  const { username, recipe_name, image_url, difficulty, cook_time, prep_time, servings, instructions, ingredients } = req.body;

  const usernameQuery = `SELECT id from users WHERE username = "${username}";`;
  const query = Promise.promisify(db.query.bind(db));

  Promise.all([query(usernameQuery)])
    .then(username => {
      console.log('THIS IS THE USER ID: ', username)
      const saveRecipeQuery = `INSERT INTO recipes(name, image, difficulty, cooktime, preptime, servings, instructions, user_id) VALUES("${recipe_name}", "${image_url}", "${difficulty}", "${cook_time}", "${prep_time}", "${servings}", "${instructions}", "${username[0][0].id}");`
      return saveRecipeQuery;
    }
  )
    .then(recipeQuery => {
      console.log('THIS IS THE RECIPE QUERY: ', recipeQuery);
      return query(recipeQuery);
    })
    .then(result => {
      console.log('THIS IS QUERIED RESULT: ', result);
      res.status(200).json(result);
    })
    .catch((err) => console.error(err));

};