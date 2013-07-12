#!/usr/bin/env node
// This module should route requests to different handlers.

function route(handle, pathname, response) {
    console.log("Routing request " + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response);
    } else {
        console.log("* No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type":"text/plain"});
        response.write("Unfortunately, page is not found...");
        response.end();
    }
}

exports.route = route;
