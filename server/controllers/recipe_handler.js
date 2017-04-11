const db = require('../db/db');
const config = require('../config');
const Promise = require('bluebird');
const _ = require('lodash');
const query = Promise.promisify(db.query.bind(db));

exports.createRecipe = function(req, res, next) {
  const { username, recipeName, imageUrl, parentId, difficulty, cookTime, prepTime, servings, instructions, description,tags, ingredients:{ quantity, items } } = req.body; 
  const usernameSubQuery = `SELECT id from users WHERE username = "${username}"`;
  if (!username || !recipeName || !imageUrl || !difficulty || !cookTime || !prepTime || !servings || !instructions || !description || !quantity || !items) {
    return res.status(422).send({ error: 'All fields are required' })
  }
  let saveRecipeQuery = `INSERT INTO recipes(name, image, difficulty, cook_time, prep_time, servings, instructions, description, user_id) VALUES("${recipeName}", "${imageUrl}", "${difficulty}", "${cookTime}", "${prepTime}", "${servings}", "${instructions}", "${description}", (${usernameSubQuery}));`
  if (parentId) {
    saveRecipeQuery = `INSERT INTO recipes(name, image, difficulty, cook_time, prep_time, servings, instructions, description, parent_id, user_id) VALUES("${recipeName}", "${imageUrl}", "${difficulty}", "${cookTime}", "${prepTime}", "${servings}", "${instructions}", "${description}", "${parentId}", (${usernameSubQuery}));`
  }
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
  const { id, username, variation } = req.query;
  if (!id && !username) {
    const allRecipesQuery = 'SELECT recipes.*, users.username FROM recipes JOIN users ON recipes.user_id=users.id WHERE recipes.parent_id IS NULL;'
    return query(allRecipesQuery).then(recipes => res.status(200).send(recipes));
  }
  if (variation && username) {
    const usernameSubQuery = `SELECT id from users WHERE username = "${username}"`;
    const allVariationsQuery = `SELECT recipes.*, users.username FROM recipes JOIN users ON recipes.user_id=users.id WHERE recipes.parent_id IS NOT NULL AND users.id=(${usernameSubQuery});`
    return query(allVariationsQuery).then(variations => {
      res.status(200).send(variations)
    })
  }
  if (username) {
    const usernameSubQuery = `SELECT id from users WHERE username = "${username}"`;
    const userRecipesQuery = `SELECT * FROM recipes WHERE recipes.user_id=(${usernameSubQuery});`
    return query(userRecipesQuery).then(recipes => {
      res.status(200).send(recipes)
    });
  }
  if (variation && id) {
    const getVariationsQuery = `SELECT recipes.*, users.username from recipes JOIN users ON recipes.user_id = users.id WHERE parent_id=${id};`
    return query(getVariationsQuery).then(results => {
      return Promise.all(results.map(item => {
        return returnRecipe(item.id).then(recipe => {
          item['ingredients'] = recipe.ingredients;
          item['tags'] = recipe.tags;
          return item
        })
      }))
    })
      .then(variations => {
        console.log(variations)
        res.status(200).send(variations)
      })
  }
  returnRecipe(id).then(recipe => res.status(200).send(recipe))
  
  function returnRecipe(id) {
    const ingredientsQuery = `SELECT * from ingredients WHERE recipe_id = ${id};`;
    const tagsQuery = `SELECT * from tags WHERE recipe_id = ${id};`;
    const recipeQuery = `SELECT * from recipes WHERE id = ${id};`
    const userQuery = `SELECT username FROM users WHERE id = (SELECT user_id FROM recipes WHERE id = ${id})`

    query(recipeQuery).then(([recipe]) => {
      if(!recipe) return res.status(422).send({ error: 'Recipe does not exist' });
    })

    return Promise.all([query(ingredientsQuery), query(tagsQuery), query(recipeQuery), query(userQuery)])
      .then(([ ingredients, tagList, [ recipe ], [ user ] ]) => {
      const [ quantity, items ] = ingredients.reduce((acc, { quantity, ingredient }) => {
        return [ [...acc[0], quantity], [...acc[1], ingredient] ];
      }, [[], []])
      const tags = tagList.reduce((arr, obj) => {
        return [...arr, obj.tag_name]
      },[])
      const { id, name, image, difficulty, cook_time, prep_time, servings, instructions, user_id, description, parent_id } = recipe;
      const { username } = user;
      return {
        id,
        parent_id,
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
      }
    })
  }
}

exports.deleteRecipe = function(req, res) {
  const { id } = req.query;
  if (!id) return res.status(422).send({ error: 'No id was specified' })
  const deleteIngredientsQuery = `DELETE from ingredients WHERE recipe_id=${id}`
  const deleteReviewsQuery = `DELETE from reviews WHERE recipe_id=${id}`
  const deleteFavoritesQuery = `DELETE from favorites WHERE recipe_id=${id}`
  const deleteTagsQuery = `DELETE from tags WHERE recipe_id=${id}`
  const deleteRecipeQuery = `DELETE from recipes WHERE id=${id}`
  Promise.all([query(deleteIngredientsQuery), query(deleteReviewsQuery), query(deleteFavoritesQuery), query(deleteTagsQuery), query(deleteRecipeQuery)])
    .then(results => {
      const findChildrenQuery = `SELECT * from recipes where parent_id=${id};`
      return query(findChildrenQuery)
    })
    .then(children => {
      if(!children.length) {
        return res.status(200).send({ 'message': 'Recipe was deleted' })
      } else {
        return children.map(child => child.id)
      }    
    })
    .then(childIds => {
      const updateParentQuery = `UPDATE recipes SET parent_id = NULL WHERE id = ${childIds[0]};`
      const updateChildrenQuery = `UPDATE recipes SET parent_id=${childIds[0]} WHERE parent_id=${id}`
      return Promise.all([query(updateParentQuery), query(updateChildrenQuery)])
    })
    .then(result => res.status(200).send({ 'message': 'Recipe was deleted' }))
}

exports.updateRecipe = function(req, res) {
  const { id, recipeName, imageUrl, difficulty, cookTime, prepTime, servings, instructions, description, tags, ingredients:{ quantity, items } } = req.body; 
  const updateRecipeQuery = `UPDATE recipes SET name="${recipeName}", image="${imageUrl}", difficulty="${difficulty}", cook_time="${cookTime}", prep_time="${prepTime}", servings="${servings}", instructions="${instructions}", description="${description}" WHERE id=${id};`
  const deleteIngredientsQuery = `DELETE from ingredients WHERE recipe_id=${id};`
  const deleteTagsQuery = `DELETE from tags WHERE recipe_id=${id};`
  Promise.all([query(updateRecipeQuery), query(deleteIngredientsQuery), query(deleteTagsQuery)])
    .then(results => {
      const saveIngredientsQuery = quantity.reduce((str, value, i) => {
        return str += `("${items[i]}", "${value}", "${id}")${i === quantity.length - 1 ? ';' : ', '}`
      },'INSERT INTO ingredients(ingredient, quantity, recipe_id) VALUES ');
      const saveTagsQuery = tags.reduce((str, value, i) => {
        return str += `("${value}", "${id}")${i === tags.length - 1 ? ';' : ', '}`
      },'INSERT INTO tags(tag_name, recipe_id) VALUES ');
      return Promise.all([query(saveIngredientsQuery), query(saveTagsQuery)])
    })
    .then(results => {
      res.status(200).send({ message: 'recipe was updated' })
    })
  
}