#!/usr/bin/env node

var fs = require("fs");
var app = require("./app.js").app;
var url = require("url");
var path = require("path");

function getFileNameFromRequest(request) {
    var imgParam = url.parse(request.url, true).query.img;
    console.log("Showing " + imgParam);
    return imgParam;
}

function show(request, response) {
    console.log("Request handler 'show' was called.");

    var fileName = getFileNameFromRequest(request);
    var filePath = path.join(app.uploadPath, fileName);

    fs.readFile(filePath, "binary", function(error, file) {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write(error);
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": "image/jpeg" });
            response.write(file, "binary");
            response.end();
        }
    });
}

var uploadHandler = require('./handlers/upload');
var startHandler = require('./handlers/start');

exports.start = startHandler.start;
exports.upload = uploadHandler.upload;
exports.show = show;


