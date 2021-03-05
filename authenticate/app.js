"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = 8080;
app.get('/authorisation/:userId', function (req, res) {
    setTimeout(function () {
        console.log(req.params.userId);
        res.send(200);
    }, 2000);
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
