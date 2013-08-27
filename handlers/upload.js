#!/usr/bin/env node

var formidable = require("formidable");
var fs = require("fs");
var crypto = require('crypto');
var path = require('path');

var app = require('./../app.js').app;

function processFormRequest(request, processCallback) {
    console.log("Parsing request.");
    var form = new formidable.IncomingForm();
    form.parse(request, processCallback);
}

function writeError(response, error) {
    console.log("Error... " + error);
    response.writeHead(500, {"Content-Type": "text/plain"});
    response.write(error);
    response.end();
}

function getPathForNewFile(originalName) {
    var fileName = undefined;
    var filePath = undefined;
    try {
    do {
        var ext = path.extname(originalName);
        fileName = crypto.randomBytes(4).readUInt32LE(0) + ext;
        filePath = path.join(app.uploadPath, fileName);
    } while (fs.statSync(filePath));
    } catch (e) {
        // Empty, yeah.
    }

    return filePath;
}

function moveFile(from, to, callback) {
    var is = fs.createReadStream(from);
    var os = fs.createWriteStream(to);

    is.pipe(os);
    is.on('end',function() {
        fs.unlinkSync(from);
        callback();
    });
}

function upload(request, response) {
    console.log("Request handler 'upload' was called.");

    processFormRequest(request, function (error, fields, files) {
        console.log("Parsing done.");
        if (error) {
            writeError(response, error);
            return;
        }

        var uploadedPath = files.upload.path;
        var targetFile = getPathForNewFile(uploadedPath);
        console.log("Uploaded file: " + uploadedPath + ", moving to " + targetFile);
        moveFile(uploadedPath, targetFile, function() {
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write("<html><body><p>Received image:</p><img src=\"/show?img=" + path.basename(targetFile) + "\" /></body></html>");
                response.end();
        });
    });
}

exports.upload = upload;