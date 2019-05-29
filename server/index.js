require('dotenv').config();

const express = require('express');
const bodyParse = require('body-parser');

const docsRouter = require('./docs/router');

const app = express();

app.use(bodyParse.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(docsRouter);

app.listen(8000);