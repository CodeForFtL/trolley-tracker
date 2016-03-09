'use strict';

var mongoose = require('mongoose'),
    Trolley = mongoose.model('Trolley'),
    _ = require('lodash'),
    config = require('../config/config');

exports.index = function(req, res, next) {
    var validationErrors = [];

    var limit = req.query.limit || 10;
    var deviceId = req.query.deviceid || '';
    //var lat = req.query.lat || ''; // At some point this can be used for radius queries
    //var lng = req.query.lng || '';

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
            query.where('deviceid', deviceId);
        }

        query.limit(limit);
        query.sort('-bustime');

        query
            .exec(function(err, trolleys) {
                if (err) return next(err);
                res.json({
                    "status": "success",
                    "data": featureFormatter(trolleys),
                    "message": null
                });
            });
    }

};

exports.create = function(req, res, next) {
    var validationErrors = [];

    var lat = req.query.lat || '';
    var lng = req.query.lng || '';
    var speed = req.query.speed || '';
    var deviceid = req.query.deviceid || '';

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

    if (_.isEmpty(deviceid)) {
        validationErrors.push('deviceid needs to be set');
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
            deviceid: deviceid,
            speed: speed,
            coordinates: [lng, lat]
        });

        trolley.save(function(err, savedTrolley) {
            if (err) return next(err);
            res.json({
                "status": "success",
                "data": featureFormatter([savedTrolley]),
                "message": null
            });
        });
    }
};

exports.delete = function (req, res, next) {
    var token = req.query.token;

    if (!(_.isEmpty(config.deleteToken)) && token == config.deleteToken) {
        Trolley.remove(function(err) {
            if (err) return next(err);
            res.json({
                "status": "success",
                "data": null,
                "message": "You wiped everything"
            });
        });
    } else {
        res.status(400);
        res.json({
            "status": "failure",
            "data": null,
            "message": "Nice try!"
        });
    }
};

function featureFormatter(trolleys) {
    var features = _.map(trolleys, function(trolley) {
        return {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [trolley.coordinates]
            },
            "properties": {
                "lat": trolley.coordinates[1],
                "lon": trolley.coordinates[0],
                "bustime": trolley.bustime,
                "speed": trolley.speed,
                "deviceid": trolley.deviceId
            }
        }
    });

    return {
        "type": "FeatureCollection",
        "features": features
    };
}