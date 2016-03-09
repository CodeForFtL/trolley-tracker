'use strict';

var Trolley = require('../../models/trolley.model.js'),
    mongoose = require('mongoose');

describe('trolley model unit tests:', function() {
    before(function() {
        mongoose.connect('mongodb://localhost/trolley-tracker-test');
    });

    after(function() {
        mongoose.disconnect();
    });

    beforeEach(function(done) {
        Trolley.remove(function() {done()});
    });

    afterEach(function(done) {
        Trolley.remove(function() {done()});
    });

    it('should create a new trolley and save to database', function(done) {
        var trolley = new Trolley({
            bustime: new Date('2016-03-05'),
            deviceid: 1,
            speed: 20,
            coordinates: [-80.148749, 26.203733]
        });

        trolley.save(function(err, savedtrolley) {
            expect(typeof err).to.not.equal('undefined');
            Trolley.findById(savedtrolley.id, function(err, newtrolley) {
                expect(typeof err).to.not.equal('undefined');
                expect(newtrolley.id).to.equal(trolley.id);
                done();
            });
        });
    });
});