var mysql = require('mysql');

module.exports = mysql.createConnection({
  password: '',
  user: 'root',
  database: 'coretest'
});