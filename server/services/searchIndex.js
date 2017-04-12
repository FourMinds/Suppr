const $search = require('./elasticSearch')
const db = require('../db/db')
const Promise = require('bluebird');
const _ = require('lodash');
const query = Promise.promisify(db.query.bind(db));

const getAllRecipesQuery = `SELECT * from recipes WHERE parent_id IS NULL;`
const getAllSporksQuery = `SELECT * from recipes WHERE parent_id IS NOT NULL;`

query(getAllRecipesQuery).then(recipes => {
  recipes.map((item, i) => {
    $search.index({
      index: 'recipes',
      type: 'Object',
      id: i,
      body: item
    }, (error, response) => {});
  })
})

query(getAllSporksQuery).then(sporks => {
  sporks.map((item, i) => {
    $search.index({
      index: 'sporks',
      type: 'Object',
      id: i,
      body: item
    }, (error, response) => {});
  })
})

// $search.indices.delete({
//   index: 'recipes'
// })






