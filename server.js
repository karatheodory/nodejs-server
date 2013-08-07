#!/usr/bin/env node
var http = require("http");

function start(route, handle) {
    function onRequest(request, response) {
        console.log("Server request");
        route(handle, request, response);
    }

    var port = 8888; 

    http.createServer(onRequest).listen(port);
    console.log("Server started on port " + port + ".");
}

exports.start = start;
