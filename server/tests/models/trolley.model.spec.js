'use strict';

var trolley = require('../../models/trolley.model.js'),
    mongoose = require('mongoose');

describe('trolley model unit tests:', function() {
    before(function() {
        mongoose.connect('mongodb://localhost/trolley-tracker-test');
    });

    after(function() {
        mongoose.disconnect();
    });

    beforeEach(function(done) {
        trolley.remove(function() {done()});
    });

    afterEach(function(done) {
        trolley.remove(function() {done()});
    });

    it('should create a new trolley and save to database', function(done) {
        var trolley = new trolley({
            date: new Date('2016-03-05'),
            deviceId: 1,
            speed: 20,
            location: {
                lat: 26.203733,
                lng: -80.148749
            },
            loc: [26.203733, -80.148749]
        });

        trolley.save(function(err, savedtrolley) {
            expect(typeof err).to.not.equal('undefined');
            trolley.findById(savedtrolley.id, function(err, newtrolley) {
                expect(typeof err).to.not.equal('undefined');
                expect(newtrolley.id).to.equal(trolley.id);
                done();
            });
        });
    });
});