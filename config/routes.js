var express = require('express');
var router = express.Router();
var wordApi = require('../api/wordApi');

router.use('/word', wordApi);

module.exports = router;