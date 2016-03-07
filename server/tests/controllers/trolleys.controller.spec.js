'use strict';

var Trolley = require('../../models/trolley.model.js'),
    mongoose = require('mongoose');

describe('trolleys controller', function() {
    before(function() {
        mongoose.connect('mongodb://localhost/trolley-tracker-test');
    });

    after(function() {
        mongoose.disconnect();
    });

    describe('Are trolleys wired up?', function() {
        it('should not error at GET: /api/trolleys', function(done) {
            request(app)
                .get('/api/trolleys')
                .expect(200)
                .end(done);
        });

        it('should get error at GET /api/trolleys/post', function(done) {
            request(app)
                .get('/api/trolleys/post')
                .expect(400)
                .end(done);
        });
    });

    describe('GET /api/trolleys', function() {
        seedtrolleys();

        it('should get all the trolleys', function(done) {
            request(app)
                .get('/api/trolleys')
                .expect(200)
                .end(function(err, response){
                    expect(response.body.data.features.length).to.equal(3);
                    done();
                });
        });

        it('should limit the response', function(done) {
            request(app)
                .get('/api/trolleys?limit=1')
                .expect(200)
                .end(function(err, response) {
                    expect(response.body.data.features.length).to.equal(1);
                    done();
                });
        });

        it('should sort the response by date', function(done) {
            request(app)
                .get('/api/trolleys')
                .expect(200)
                .end(function(err, response) {
                    var data = response.body.data;
                    expect(data.features[0].properties.bustime).to.equal((new Date('2016-03-04')).toISOString());
                    expect(data.features[1].properties.bustime).to.equal((new Date('2016-03-03')).toISOString());
                    expect(data.features[2].properties.bustime).to.equal((new Date('2016-03-02')).toISOString());
                    done();
                });
        });
    });

    describe('GET /api/trolleys validation errors', function() {
        seedtrolleys();

        it('should bitch if limit is NaN', function(done) {
            request(app)
                .get('/api/trolleys?limit=lifesabitch')
                .expect(400)
                .end(function(err, response) {
                    expect(response.body.message).to.equal('Limit must be a number');
                    done();
                });
        });

        it('should throw up if limit is greater than 100', function(done) {
            request(app)
                .get('/api/trolleys?limit=101')
                .expect(400)
                .end(function(err, response) {
                    expect(response.body.message).to.equal('Limit can\'t be more than 100');
                    done();
                });
        });
    });

    describe('GET /api/trolleys/post', function() {
        it('should save a trolley to the database', function(done) {
            request(app)
                .get('/api/trolleys/post?lat=26.203733&lng=-80.148749&speed=40&deviceId=4')
                .expect(200)
                .end(function(err, response) {
                    if (err) return done(err);
                    expect(response.body.status).to.equal('success');
                    expect(response.body.data.features[0].properties.speed).to.equal(40);
                    done();
                })
        });
    });

    describe('GET /api/trolleys/post validation errors', function() {
        it('should throw an error if speed is not included in the query', function(done) {
            request(app)
                .get('/api/trolleys/post?lat=26.203733&lng=-80.148749&deviceId=4')
                .expect(400)
                .end(function(err, response) {
                    expect(response.body.status).to.equal('error');
                    expect(response.body.message).to.equal('Speed needs to be set');
                    done();
                });
        });

        it('should throw an error if speed is NaN', function(done) {
            request(app)
                .get('/api/trolleys/post?lat=26.203733&lng=-80.148749&deviceId=4&speed=imnotanumber')
                .expect(400)
                .end(function(err, response) {
                    expect(response.body.status).to.equal('error');
                    expect(response.body.message).to.equal('Speed needs to be a number');
                    done();
                });
        });
    });

});

function seedtrolleys() {
    before(function(done) {
        Trolley.remove({}, function() {
            var trolleys = [
                {
                    bustime: new Date('2016-03-02'),
                    deviceId: 1,
                    speed: 30,
                    coordinates: [-80.148749, 26.203733]
                },
                {
                    bustime: new Date('2016-03-04'),
                    deviceId: 2,
                    speed: 10,
                    coordinates: [ -80.142674, 26.120249]
                },
                {
                    bustime: new Date('2016-03-03'),
                    deviceId: 1,
                    speed: 20,
                    coordinates: [-80.142909, 26.103367]
                }
            ];

            Trolley.create(trolleys, function(err, savedtrolley) {
                expect(typeof err).to.not.equal('undefined');
                done();
            });
        });
    });

    after(function(done) {
        Trolley.remove({}, function() { done() });
    });
}