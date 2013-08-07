#!/usr/bin/env node
// This module should route requests to different handlers.

var url = require("url");

function route(handle, request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Routing request " + pathname);

    if (typeof handle[pathname] === 'function') {
        handle[pathname](request, response);
    } else {
        console.log("* No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type":"text/plain"});
        response.write("Unfortunately, page is not found...");
        response.end();
    }
}

exports.route = route;
