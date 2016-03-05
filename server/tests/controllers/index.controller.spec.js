'use strict';

describe('Index controller', function() {
    it('Should load the text at /', function(done) {
        request(app)
            .get('/')
            .expect(200)
            .expect(function(response) {
                expect(response.text).to.contain('');
            })
            .end(done);
    })
})