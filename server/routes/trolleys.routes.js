'use strict';

var trollies = require('../controllers/trolleys.controller.js');

module.exports = function(app) {
    app.get('/api/trollies', trollies.index);
    app.get('/api/trollies/post', trollies.create);
    app.get('/api/trollies/delete', trollies.delete);
}