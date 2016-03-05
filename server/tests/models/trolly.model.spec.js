'use strict';

var Trolly = require('../../models/trolly.model'),
    mongoose = require('mongoose');

describe('Trolly model unit tests:', function() {
    before(function() {
        mongoose.connect('mongodb://localhost/trolly-tracker-test');
    });

    after(function() {
        mongoose.disconnect();
    });

    beforeEach(function(done) {
        Trolly.remove(function() {done()});
    });

    afterEach(function(done) {
        Trolly.remove(function() {done()});
    });

    it('should create a new trolly and save to database', function(done) {
        var trolly = new Trolly({
            date: new Date('2016-03-05'),
            deviceId: 1,
            speed: 20,
            location: {
                lat: 26.203733,
                lng: -80.148749
            },
            loc: [26.203733, -80.148749]
        });

        trolly.save(function(err, savedTrolly) {
            expect(typeof err).to.not.equal('undefined');
            Trolly.findById(savedTrolly.id, function(err, newTrolly) {
                expect(typeof err).to.not.equal('undefined');
                expect(newTrolly.id).to.equal(trolly.id);
                done();
            });
        });
    });
});