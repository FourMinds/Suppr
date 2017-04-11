const $search = require('./elasticSearch')
const db = require('../db/db')
const Promise = require('bluebird');
const _ = require('lodash');
const query = Promise.promisify(db.query.bind(db));

const getAllRecipesQuery = `SELECT * from recipes WHERE parent_id IS NULL;`

// query(getAllRecipesQuery).then(recipes => {
//   $search.index({
//     index: 'recipes',
//     type: 'parents',
//     id: '1',
//     body: {recipes}
//   }, function (error, response) {
//   });
// })

$search.search({
  index: 'recipes',
  q:'2134'
}, function (error, response) {
  // ...
  console.log(response.hits.hits[0]._source.recipes)
});


