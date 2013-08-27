#!/usr/bin/env node

var fs = require('fs');
var app = {};

// Settings
app.uploadPath = "./images";

app.initialize = function () {
    console.log("Server is loading...");
    fs.stat(app.uploadPath, function (error, stats) {
        if (!error) {
            return;
        }
        console.log("Upload path is not found, creating...");
        fs.mkdir(app.uploadPath, 0755, function (error) {
            if (error) {
                console.log("Error while trying to create upload folder:");
                console.log(error);
            }
        })
    });
}

exports.app = app;