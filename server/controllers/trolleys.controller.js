'use strict';

var mongoose = require('mongoose'),
    Trolley = mongoose.model('Trolley'),
    _ = require('lodash');

exports.index = function(req, res, next) {
    var validationErrors = [];

    var limit = req.query.limit || 10;
    var deviceId = req.query.deviceId || '';
    var lat = req.query.lat || '';
    var lng = req.query.lng || '';

    if (isNaN(limit)) {
        validationErrors.push('Limit must be a number');
    }

    if (limit > 100) {
        validationErrors.push('Limit can\'t be more than 100');
    }

    //if (_.isEmpty(deviceId)) {
    //    validationErrors.push('Device ID is required');
    //};

    if (!(_.isEmpty(validationErrors))) {
        var messages = validationErrors.join('\n');
        res.status(400);
        res.json({
            "status": "error",
            "data": null,
            "message": messages
        });
    } else {
        var query = Trolley.find();

        if (deviceId) {
            query.where('deviceId', deviceId);
        }

        query.limit(limit);
        query.sort('-date');

        query
            .exec(function(err, trolleys) {
                if (err) return next(err);
                res.json({
                    "status": "success",
                    "data": trolleys,
                    "message": null
                });
            });
    };

}

exports.create = function(req, res, next) {
    var validationErrors = [];

    var lat = req.query.lat || '';
    var lng = req.query.lng || '';
    var speed = req.query.speed || '';
    var deviceId = req.query.deviceId || '';

    if (_.isEmpty(lat)) {
        validationErrors.push('Lat needs to be set');
    }

    if (isNaN(lat)) {
        validationErrors.push('Lat needs to be a number');
    }

    if (_.isEmpty(lng)) {
        validationErrors.push('Lng needs to be set');
    }

    if (isNaN(lng)) {
        validationErrors.push('Lng needs to be a number');
    }

    if (_.isEmpty(speed)) {
        validationErrors.push('Speed needs to be set');
    }
    if (isNaN(speed)) {
        validationErrors.push('Speed needs to be a number');
    }

    if (_.isEmpty(deviceId)) {
        validationErrors.push('deviceId needs to be set');
    }
    if (!(_.isEmpty(validationErrors))) {
        var messages = validationErrors.join('\n');
        res.status(400);
        res.json({
            "status": "error",
            "data": null,
            "message": messages
        });
    } else {
        var trolley = new Trolley({
            deviceId: deviceId,
            speed: speed,
            location: {
                lng: lng,
                lat: lat
            },
            loc: [lng, lat]
        });

        trolley.save(function(err, savedtrolley) {
            if (err) return next(err);
            res.json({
                "status": "success",
                "data": savedtrolley,
                "message": null
            });
        });
    };
}

exports.delete = function (req, res, next) {
    var token = req.query.token;

    if (token == 'dont-fucking-do-it') {
        Trolley.remove(function(err) {
            if (err) return next(err);
            res.json({
                "status": "success",
                "data": null,
                "message": "You swiped everything"
            });
        });
    } else {
        res.json({
            "status": "failure",
            "data": null,
            "message": "Nice try!"
        });
    }
}