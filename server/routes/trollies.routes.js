'use strict';

var trollies = require('../controllers/trollies.controller.js');

module.exports = function(app) {
    app.get('/api/trollies', trollies.index);
    app.get('/api/trollies/post', trollies.create);
}