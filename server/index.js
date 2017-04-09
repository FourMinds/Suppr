const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
var db = require('./db/db');
const router = require('./router');
const regex = require('./services/regex');

db.connect(err => {
  if (err) return console.log('Cannot Connect to MySQL Database')
  console.log('Connected to MySQL Database')
});

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

// replaces double quotation marks
app.use((req, res, next) => {
  regex.parseData(req.body, true);
  next();
});

router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);

module.exports.app = server;