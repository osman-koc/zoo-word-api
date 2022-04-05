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

// ADD WORD
router.post('/add', function (req, res, next) {
    console.log("Adding word");
    var reqBody = req.body;
    console.log('Body: ', reqBody);

    var errorMessage = '';
    if (reqBody === null || reqBody === undefined) {
        errorMessage = "Body is null or missing";
    } else if(reqBody.name === null || reqBody.name === undefined) {
        errorMessage = "Body is missing name";
    } else if(reqBody.relations === null || reqBody.relations === undefined) {
        errorMessage = "Body is missing relations";
    } else if(reqBody.name.length < 3) {
        errorMessage = "Name is too short";
    } else if(reqBody.relations.length < 3) {
        errorMessage = "Relations are too short";
    } else if(reqBody.name.length > 20) {
        errorMessage = "Name is too long";
    } else if(reqBody.relations.length > 20) {
        errorMessage = "Relations are too long";
    }

    if(errorMessage !== '') {
        console.log(errorMessage);
        res.status(400).send(errorMessage);
        return;
    }

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (data === null || data === undefined) {
            console.log("No words found");
            res.send("");
            return;
        }

        var dbWords = JSON.parse(data);
        dbWords.push(reqBody);
        fs.writeFile(filePath, JSON.stringify(dbWords), function (err) {
            if (err) {
                console.log("Error writing to file");
                res.send("Error writing to file");
                return;
            }
            console.log("Successfully wrote to file");
            res.send("Successfully wrote to file");
        });
    });
});

module.exports = router;