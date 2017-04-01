const db = require('../db/db');
const config = require('../config');
const Promise = require('bluebird');
const _ = require('lodash');
const query = Promise.promisify(db.query.bind(db));

exports.createRecipe = function(req, res, next) {
  const { username, recipeName, imageUrl, difficulty, cookTime, prepTime, servings, instructions, description, ingredients:{ quantity, items } } = req.body; 
  const usernameSubQuery = `SELECT id from users WHERE username = "${username}"`;
  if (!username || !recipeName || !imageUrl || !difficulty || !cookTime || !prepTime || !servings || !instructions || !description || !quantity || !items) {
    return res.status(422).send({ error: 'All fields are required' })
  }

  const saveRecipeQuery = `INSERT INTO recipes(name, image, difficulty, cook_time, prep_time, servings, instructions, description, user_id) VALUES("${recipeName}", "${imageUrl}", "${difficulty}", "${cookTime}", "${prepTime}", "${servings}", "${instructions}", "${description}", (${usernameSubQuery}));`
  query(saveRecipeQuery)
    .then(result => {
    const saveIngredientsQuery = quantity.reduce((str, value, i) => {
      return str += `("${items[i]}", "${value}", "${result.insertId}")${i === quantity.length - 1 ? ';' : ', '}`
    },'INSERT INTO ingredients(ingredient, quantity, recipe_id) VALUES ')
    return query(saveIngredientsQuery)
  })
    .then(result => {
      return res.status(200).send({ message: 'The recipe was saved successfully!'})
    })

};

exports.getRecipe = function(req, res, next) {
  const { id } = req.query;
  if (!id) {
    const allRecipesQuery = 'SELECT recipes.*, users.username from recipes JOIN users ON recipes.user_id=users.id;'
    return query(allRecipesQuery).then(recipes => res.status(200).send(recipes));
  }
  const ingredientsQuery = `SELECT * from ingredients WHERE recipe_id = ${id};`;
  const recipeQuery = `SELECT * from recipes WHERE id = ${id}`
  const userQuery = `SELECT username FROM users WHERE id = (SELECT user_id FROM recipes WHERE id = ${id})`

  query(recipeQuery).then(([recipe]) => {
    if(!recipe) return res.status(422).send({ error: 'Recipe does not exist' });
  })

  Promise.all([query(ingredientsQuery), query(recipeQuery), query(userQuery)])
    .then(([ ingredients, [ recipe ], [ user ] ]) => {
    const [ quantity, items ] = ingredients.reduce((acc, { quantity, ingredient }) => {
      return [ [...acc[0], quantity], [...acc[1], ingredient] ];
    }, [[], []])
    const { id, name, image, difficulty, cook_time, prep_time, servings, instructions, user_id, description } = recipe;
    const { username } = user;
    res.status(200).send({
      id,
      username, 
      recipeName: name, 
      imageUrl: image, 
      difficulty, 
      description,
      cookTime: cook_time, 
      prepTime: prep_time, 
      servings, 
      instructions, 
      ingredients: { quantity, items },
      userId: user_id
    })
  })

}