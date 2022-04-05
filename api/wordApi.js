const express = require('express');
const fs = require("fs");
const { body, validationResult } = require('express-validator');

const router = express.Router();
const filePath = "./db/words.json";

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
router.post('/add',
    body('name').isLength({ min: 2 }).withMessage('Name is too short'),
    body('name').isLength({ max: 20 }).withMessage('Name is too long'),
    body('relations').isLength({ min: 2 }).withMessage('Relations are too short'),
    body('relations').isLength({ max: 20 }).withMessage('Relations are too long'),
    function (req, res, next) {
        console.log("Adding word");
        console.log('Body: ', req.body);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        req.body.name = req.body.name.toLocaleUpperCase('tr-TR');
        req.body.relations.forEach(function (relation, index) {
            req.body.relations[index] = relation.toLocaleUpperCase('tr-TR');
        });

        fs.readFile(filePath, 'utf8', function (err, data) {
            if (data === null || data === undefined) {
                console.log("No words found");
                res.send("");
                return;
            }

            var dbWords = JSON.parse(data);
            dbWords.push(req.body);
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