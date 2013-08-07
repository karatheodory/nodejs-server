#!/usr/bin/node

var fs = require("fs");
var querystring = require("querystring");
var formidable = require("formidable");


function parseRequest(request, callback) {
    console.log("Parsing request.");
    var form = new formidable.IncomingForm();
    form.parse(request, callback);
}

function start(request, response) {
    console.log("Request handler 'start' was called.");
    fs.readFile("start.html", function(err, buffer) {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(buffer.toString());
        response.end();
    });
}

function upload(request, response) {
    console.log("Request handler 'upload' was called.");

    parseRequest(request, function (error, fields, files) {
        console.log("Parsing done.");
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error);
            response.end();
            return;
        }
        var targetFile = "/tmp/test.jpg";
        fs.unlink(targetFile, function(err) {
            fs.rename(files.upload.path, targetFile, function(err) {
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write("<html><body><p>Received image:</p><img src=\"/show\" /></body></html>");
                response.end();
            });
        });
    });
}

function show(request, response) {
    console.log("Request handler 'show' was called.");
    var fileName = "/tmp/test.jpg";

    fs.readFile(fileName, "binary", function(error, file) {
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

exports.start = start;
exports.upload = upload;
exports.show = show;
