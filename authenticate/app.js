"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require('morgan');
var port = 8080;
var app = express();
app.use(morgan('tiny'));
app.get('/authorisation/:userId', function (req, res) {
    setTimeout(function () {
        console.log(req.params.userId);
        res.sendStatus(200);
    }, 2000);
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
