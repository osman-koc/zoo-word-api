const express = require('express');
const routes = require('./config/routes');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

app.get("/health", (req, res) => {
    res.send("healthly");
});

const server = app.listen(process.env.PORT || 9000, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Express server listening at http://%s:%s', host, port);
});
