'use strict';

var path = require('path'),
    config = '../config/config';

// Express drops through all the route middle ware to find a URL that matches a definition.
// If it gets to the bottom and doesn't find anything because this is a single page app
// AngularJS on the client should handle the 404 with the client side routing. Here we are saying
// didn't find a route? No problem just send the index page and don't worry about it on the server

module.exports = function(app) {
    app.all('/*', function(req, res) {
        res.sendFile(path.join(__dirname + '../../../' + config.dir + '/index.html'));
    });
};

