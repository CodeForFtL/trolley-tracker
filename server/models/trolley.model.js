'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var trolleySchema = new Schema({
    bustime: {
        type: Date,
        default: Date.now,
        index: true
    },
    deviceId: {
        type: String
    },
    speed: Number,
    coordinates: {
        type: [Number],
        index: '2d'
    }
});

module.exports = mongoose.model('Trolley', trolleySchema);