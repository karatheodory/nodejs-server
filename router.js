#!/usr/bin/env node
// This module should route requests to different handlers.

function route(handle, pathname) {
    console.log("Routing request " + pathname);
    if (typeof handle[pathname] === 'function') {
        return handle[pathname]();
    } else {
        console.log("* No request handler found for " + pathname);
        return "404?";
    }
}

exports.route = route;
