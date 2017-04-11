const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host:'search-suppr-tbveoknf7ddpmisilqiwr5nkd4.us-west-2.es.amazonaws.com',
}) 
client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 3000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

module.exports = client