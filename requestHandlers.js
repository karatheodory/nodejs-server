#!/usr/bin/node

var fs = require("fs");
var querystring = require("querystring");

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
    var text = querystring.parse(postData).text;
    response.write("You have sent: ");
    response.write(text);
    response.end();
}

exports.start = start;
exports.upload = upload;
