require('dotenv').config();

const express = require('express');

const DocsService = require('./docs.service');
const docsService = new DocsService();

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const router = express.Router();
router.get('/', (req, res) => {
  const authUrl = docsService.init();
  res.send(authUrl);
});
router.get('/auth', async (req, res) => {
  const code = req.query.code;
  await docsService.auth(code);
  res.redirect('/document');
});
router.get('/document', async (req, res) => {
  const document = await docsService.getDocument();
  res.send(document);
});

app.use(router);

app.listen(8000);