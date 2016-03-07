'use strict';

var trolleys = require('../controllers/trolleys.controller.js');

module.exports = function(app) {
    app.get('/api/trolleys', trolleys.index);
    app.get('/api/trolleys/post', trolleys.create);
    app.get('/api/trolleys/delete', trolleys.delete);
}