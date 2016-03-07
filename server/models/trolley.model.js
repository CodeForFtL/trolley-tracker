'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var trolleySchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        index: true
    },
    deviceId: {
        type: String
    },
    speed: Number,
    location: {
        lng: Number,
        lat: Number
    },
    loc: {
        type: [Number],
        index: '2d'
    }
});

module.exports = mongoose.model('Trolley', trolleySchema);