const db = require('../db/db');
const config = require('../config');
const Promise = require('bluebird');
const query = Promise.promisify(db.query.bind(db));

exports.createRecipe = function(req, res, next) {
  const { username, recipeName, imageUrl, difficulty, cookTime, prepTime, servings, instructions, ingredients:{ quantity, items } } = req.body; 
  const usernameSubQuery = `SELECT id from users WHERE username = "${username}"`;
  const saveRecipeQuery = `INSERT INTO recipes(name, image, difficulty, cook_time, prep_time, servings, instructions, user_id) VALUES("${recipeName}", "${imageUrl}", "${difficulty}", "${cookTime}", "${prepTime}", "${servings}", "${instructions}", (${usernameSubQuery}));`

  query(saveRecipeQuery)
    .then(result => {
    const saveIngredientsQuery = quantity.reduce((str, value, i) => {
      return str += `("${items[i]}", "${value}", "${result.insertId}")${i === quantity.length - 1 ? ';' : ', '}`
    },'INSERT INTO ingredients(ingredient, quantity, recipe_id) VALUES ')
    return query(saveIngredientsQuery)
  })
    .then(result => {
      res.status(200).send({ message: 'The recipe was saved successfully!'})
    })

};

exports.getRecipe = function(req, res, next) {
  const { id } = req.query;
  if (!id) res.status(422).send({ error: 'No recipe was specified' });
  const ingredientsQuery = `SELECT * from ingredients WHERE recipe_id = ${id};`;
  const recipeQuery = `SELECT * from recipes WHERE id = ${id}`
  const userQuery = `SELECT username FROM users WHERE id = (SELECT user_id FROM recipes WHERE id = ${id})`
  Promise.all([query(ingredientsQuery), query(recipeQuery), query(userQuery)])
    .then(result => {
    let [ingredients, recipe, user] = result
    let [ quantity, items ] = ingredients.reduce((acc, value) => {
      acc[0] = [...acc[0], value['quantity']];
      acc[1] = [...acc[1], value['ingredient']];
      return acc;
    }, [[], []])
    let { name, image, difficulty, cook_time, prep_time, servings, instructions, user_id } = recipe[0];
    let { username } = user[0];
    res.status(200).send({
      username, 
      recipeName: name, 
      imageUrl: image, 
      difficulty, 
      cookTime: cook_time, 
      prepTime: prep_time, 
      servings, 
      instructions, 
      ingredients: { quantity, items },
      userId: user_id
    })
  })

}