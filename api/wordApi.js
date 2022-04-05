const express = require('express');
const fs = require("fs");
const router = express.Router();
const filePath = "./data/words.json";

//GET RANDOM WORD
router.get('/random', function (req, res, next) {
    console.log("Getting random word");
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (data === null || data === undefined) {
            console.log("No words found");
            res.send("");
            return;
        }

        var dbWords = JSON.parse(data);
        var randomWord = dbWords[Math.floor(Math.random() * dbWords.length)];
        console.log(randomWord);
        res.send(randomWord);
    });
});

module.exports = router;