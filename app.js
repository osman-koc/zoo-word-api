const express = require('express');
const app = express();
var fs = require("fs");

app.get("/", (req, res) => {
    res.send("healthly");
});

app.get('/word', function (req, res) {
    fs.readFile(__dirname + "/data/words.json", 'utf8', function (err, data) {
        if(data === null || data === undefined) res.send("");

        var dbWords = JSON.parse(data);
        var randomWord = dbWords[Math.floor(Math.random() * dbWords.length)];
        console.log(randomWord);
        res.send(randomWord);
    });
});

//Server
const server = app.listen(process.env.PORT || 9000, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Express server listening at http://%s:%s', host, port);
});
