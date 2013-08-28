#!/usr/bin/env node
var app = require("./../app").app;
var fs = require("fs");

function getImageHtml(image) {
	return "<div><img src='/show?img=" + image + "' /></div>";
}

function getImageListHtml() {
	var files = fs.readdirSync(app.uploadPath);

	var result = "";
	for (var i = 0; i < files.length; i++) {
		console.log("Generating html for " + files[i]);
		result += getImageHtml(files[i]);
	}
	return result;
}

function start(request, response) {
    console.log("Request handler 'start' was called.");
    fs.readFile("start.html", function(err, buffer) {
    	var html = buffer.toString();
    	var imageListHtml = getImageListHtml();
    	html = html.replace("##IMAGE_HOLDER##", imageListHtml);
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(html);
        response.end();
    });
}

exports.start = start;