'use strict';

var Trolly = require('../../models/trolly.model'),
    mongoose = require('mongoose');

describe('Trollies controller', function() {
    before(function() {
        mongoose.connect('mongodb://localhost/trolly-tracker-test');
    });

    after(function() {
        mongoose.disconnect();
    });

    describe('Are trollies wired up?', function() {
        it('should not error at GET: /api/trollies', function(done) {
            request(app)
                .get('/api/trollies')
                .expect(200)
                .end(done);
        });

        it('should get error at GET /api/trollies/post', function(done) {
            request(app)
                .get('/api/trollies/post')
                .expect(400)
                .end(done);
        });
    });

    describe('GET /api/trollies', function() {
        seedTrollies();

        it('should get all the trollies', function(done) {
            request(app)
                .get('/api/trollies')
                .expect(200)
                .end(function(err, response){
                    expect(response.body.data.length).to.equal(3);
                    done();
                });
        });

        it('should limit the response', function(done) {
            request(app)
                .get('/api/trollies?limit=1')
                .expect(200)
                .end(function(err, response) {
                    expect(response.body.data.length).to.equal(1);
                    done();
                });
        });

        it('should sort the response by date', function(done) {
            request(app)
                .get('/api/trollies')
                .expect(200)
                .end(function(err, response) {
                    var data = response.body.data;
                    expect(data[0].date).to.equal((new Date('2016-03-02')).toISOString());
                    expect(data[1].date).to.equal((new Date('2016-03-03')).toISOString());
                    expect(data[2].date).to.equal((new Date('2016-03-04')).toISOString());
                    done();
                });
        });
    });

    describe('GET /api/trollies validation errors', function() {
        seedTrollies();

        it('should bitch if limit is NaN', function(done) {
            request(app)
                .get('/api/trollies?limit=lifesabitch')
                .expect(400)
                .end(function(err, response) {
                    expect(response.body.message).to.equal('Limit must be a number');
                    done();
                });
        });

        it('should throw up if limit is greater than 100', function(done) {
            request(app)
                .get('/api/trollies?limit=101')
                .expect(400)
                .end(function(err, response) {
                    expect(response.body.message).to.equal('Limit can\'t be more than 100');
                    done();
                });
        });
    });

    describe('GET /api/trollies/post', function() {
        it('should save a trolly to the database', function(done) {
            request(app)
                .get('/api/trollies/post?lat=26.203733&lng=-80.148749&speed=40&deviceId=4')
                .expect(200)
                .end(function(err, response) {
                    expect(response.body.status).to.equal('success');
                    expect(response.body.data.speed).to.equal(40);
                    done();
                })
        });
    });

    describe('GET /api/trollies/post validation errors', function() {
        it('should throw an error if speed is not included in the query', function(done) {
            request(app)
                .get('/api/trollies/post?lat=26.203733&lng=-80.148749&deviceId=4')
                .expect(400)
                .end(function(err, response) {
                    expect(response.body.status).to.equal('error');
                    expect(response.body.message).to.equal('Speed needs to be set');
                    done();
                });
        });

        it('should throw an error if speed is NaN', function(done) {
            request(app)
                .get('/api/trollies/post?lat=26.203733&lng=-80.148749&deviceId=4&speed=imnotanumber')
                .expect(400)
                .end(function(err, response) {
                    expect(response.body.status).to.equal('error');
                    expect(response.body.message).to.equal('Speed needs to be a number');
                    done();
                });
        });
    });

});

function seedTrollies() {
    before(function(done) {
        Trolly.remove({}, function() {
            var trollies = [
                {
                    date: new Date('2016-03-02'),
                    deviceId: 1,
                    speed: 30,
                    location: {
                        lat: 26.203733,
                        lng: -80.148749
                    },
                    loc: [26.203733, -80.148749]
                },
                {
                    date: new Date('2016-03-04'),
                    deviceId: 2,
                    speed: 10,
                    location: {
                        lat: 26.120249,
                        lng: -80.142674
                    },
                    loc: [26.120249, -80.142674]
                },
                {
                    date: new Date('2016-03-03'),
                    deviceId: 1,
                    speed: 20,
                    location: {
                        lat: 26.103367,
                        lng: -80.142909
                    },
                    loc: [26.103367, -80.142909]
                }
            ];

            Trolly.create(trollies, function(err, savedTrolly) {
                expect(typeof err).to.not.equal('undefined');
                done();
            });
        });
    });

    after(function(done) {
        Trolly.remove({}, function() { done() });
    });
}