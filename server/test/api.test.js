const request = require('supertest');
const expect = require('chai').expect;
const app = require("../app");
const user = require("../routes/user")
const assert = require('assert');
describe('POST /', () => {
    it('responds with error message in json 404', done => {
        request(app)
            .post('/')
            .send({})
            .expect(404)
            .expect('Content-Type', /json/)
            .end((err,res) => {
                if(err) return done(err);
                expect(res.body.error.message).to.equal("Not found")
                return done();
            });
    });
});

describe('POST /user', () => {
    it('responds with error message in json 404', done => {
        request(app)
            .post('/user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(404)
            .end((err,res) => {
                if(err) return done(err);
                expect(res.body.error.message).to.equal("Not found")
                return done();
            });
    });
});

describe('POST /user', () => {
    jest.setTimeout(100000000);
    //Not authenticated
    it('responds with not authorised code 403', done => {
        request(app)
            .post('/user/signup')
            .send({})
            .expect(403)
            .then((response) => {
                expect(response.body.message).to.equal("Forbidden")
                done();
            })
            .catch(err => done(err))
    });
    //Send a bad request
    it('responds with not authorised code 400', done => {
        request(app)
            .post('/user/signup')
            .send({})
            .expect(401)
            .then((response) => {
                expect(response.body.message).to.equal("Bad Request")
                done();
            })
            .catch(err => done(err))
    });
    //Adds an entry into the database
    it('adds an entry into the database', done => {
        request(app)
            .post('/user/signup')
            .send({email: 'mojohnnylerato@gmail.com', password: 'password', username: 'John'})
            .then((response) => {
                console.log(response.body)
                done();
            })
            .catch(err => done(err))
    });
    //Used to delete an email from the database
});
describe('Unit testing the /user route', function() {
    jest.setTimeout(100000000);
    it('Return 200 if user is not registered', function() {
        return request(app)
            .post('/user/signup')
            .send({email: 'u18037951@tuks.co.za', password: 'password', username: 'John'})
            .then(function(response){
                assert.equal(response.status, 200)
            })
    });

});
describe('Unit testing the /delete route', function() {
    jest.setTimeout(100000000);
    it('Deletes email from the database', done => {
        request(app)
            .delete('/user/u18037951@tuks.co.za')
            .expect(200)
            .then((response) => {
                console.log(response)
                done();
            })
            .catch(err => done(err))
    });

});
