const elasticsearch = require('elasticsearch');
const { ES_ACCESS_KEY, ES_SECRET_KEY } = require('../config.js')

const client = new elasticsearch.Client({
  host:'search-suppr-tbveoknf7ddpmisilqiwr5nkd4.us-west-2.es.amazonaws.com',
  connectionClass: require('http-aws-es'),
  amazonES: {
    region: 'us-west-2',
    accessKey: ES_ACCESS_KEY,
    secretKey: ES_SECRET_KEY
  }
}) 

client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 3000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('elasticsearch is up!');
  }
});

module.exports = client