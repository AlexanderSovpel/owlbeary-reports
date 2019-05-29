const express = require('express');

const DocsController = require('./controller');

const router = express.Router();

router.get('/', DocsController.getAuthLink);
router.post('/auth', DocsController.authByCode);
router.get('/document', DocsController.getDocument);

module.exports = router;