const db = require('../db/db');
const config = require('../config');
const Promise = require('bluebird');
const _ = require('lodash');
const query = Promise.promisify(db.query.bind(db));

exports.createRecipe = function(req, res, next) {
  const { username, recipeName, imageUrl, difficulty, cookTime, prepTime, servings, instructions, description,tags, ingredients:{ quantity, items } } = req.body; 
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
    const saveTagsQuery = tags.reduce((str, value, i) => {
      return str += `("${value}", "${result.insertId}")${i === tags.length - 1 ? ';' : ', '}`
    },'INSERT INTO tags(tag_name, recipe_id) VALUES ')
      // if there are no tags, we don't query for the tags
      return tags.length === 0 ? Promise.all([query(saveIngredientsQuery)]) : Promise.all([query(saveIngredientsQuery), query(saveTagsQuery)]);
  })
    .then(result => {
      const usernameSubQuery = `SELECT id from users WHERE username = "${username}"`;
      const userRecipesQuery = `SELECT * FROM recipes WHERE recipes.user_id=(${usernameSubQuery});`
      return query(userRecipesQuery)
    })
    .then(result => res.status(200).send({ 
      message: 'The recipe was saved successfully!', 
      id: result[result.length-1].id
    }));

};

exports.getRecipe = function(req, res, next) {
  const { id, username } = req.query;
  if (!id && !username) {
    const allRecipesQuery = 'SELECT recipes.*, users.username FROM recipes JOIN users ON recipes.user_id=users.id;'
    return query(allRecipesQuery).then(recipes => res.status(200).send(recipes));
  }
  if (username) {
    const usernameSubQuery = `SELECT id from users WHERE username = "${username}"`;
    const userRecipesQuery = `SELECT * FROM recipes WHERE recipes.user_id=(${usernameSubQuery});`
    return query(userRecipesQuery).then(recipes => {
      res.status(200).send(recipes)
    });
  }
  const ingredientsQuery = `SELECT * from ingredients WHERE recipe_id = ${id};`;
  const tagsQuery = `SELECT * from tags WHERE recipe_id = ${id};`;
  const recipeQuery = `SELECT * from recipes WHERE id = ${id}`
  const userQuery = `SELECT username FROM users WHERE id = (SELECT user_id FROM recipes WHERE id = ${id})`

  query(recipeQuery).then(([recipe]) => {
    if(!recipe) return res.status(422).send({ error: 'Recipe does not exist' });
  })

  Promise.all([query(ingredientsQuery), query(tagsQuery), query(recipeQuery), query(userQuery)])
    .then(([ ingredients, tagList, [ recipe ], [ user ] ]) => {
    const [ quantity, items ] = ingredients.reduce((acc, { quantity, ingredient }) => {
      return [ [...acc[0], quantity], [...acc[1], ingredient] ];
    }, [[], []])
    const tags = tagList.reduce((arr, obj) => {
      return [...arr, obj.tag_name]
    },[])
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
      userId: user_id,
      tags
    })
  })

}