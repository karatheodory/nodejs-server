#!/usr/bin/env node
var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url, true, true).pathname;
        
        var result = route(handle, pathname);

        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write(result);
        response.end();
    }

    var port = 8888; 

    http.createServer(onRequest).listen(port);
    console.log("Server started on port " + port + ".");
}

exports.start = start;
