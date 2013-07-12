#!/usr/bin/node

var exec = require("child_process").exec
var fs = require("fs");

function start(response, postData) {
    console.log("Request handler 'start' was called.");
    fs.readFile("start.html", function(err, buffer) {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(buffer.toString());
        response.end();
    });
}

function upload(response, postData) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You have sent:");
    response.write(postData);
    response.end();
}

exports.start = start;
exports.upload = upload;
