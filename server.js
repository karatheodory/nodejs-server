#!/usr/bin/env node
var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url, true, true).pathname;
        var postData = "";

        console.log("Received request for " + pathname);

        request.setEncoding("utf-8");
        request.addListener("data", function(chunk) {
                    postData += chunk;
                    console.log("Received POST data chunk: " + chunk);
                });
        
        request.addListener("end", function() {
                console.log("Receiving completed.");
                route(handle, pathname, response, postData);
            });
    }

    var port = 8888; 

    http.createServer(onRequest).listen(port);
    console.log("Server started on port " + port + ".");
}

exports.start = start;
