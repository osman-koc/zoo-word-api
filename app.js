const express = require('express');
const app = express();
const routes = require('./config/routes');

app.use("/", routes);

app.get("/health", (req, res) => {
    res.send("healthly");
});

const server = app.listen(process.env.PORT || 9000, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Express server listening at http://%s:%s', host, port);
});
