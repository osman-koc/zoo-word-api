var express = require('express');
var cors = require('cors');
var wordApi = require('../api/wordApi');

var router = express.Router();

const corsOpts = {
    origin: '*',
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
};

router.use(cors(corsOpts));

router.use('/word', wordApi);

module.exports = router;