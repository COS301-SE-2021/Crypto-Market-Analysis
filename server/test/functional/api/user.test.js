const request = require('supertest');
const assert = require('assert')
const app = require("../app");
const user = require("../routes/user")

/*describe('POST /signup', () => {
    it('Test /signup path', (done) => {
       request(app)
            .post('/signup')
            .set('Accept', 'application/json')
            .email('some@gmail.com')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                console.warn(response);
            })
            .catch(error => console.error(error))
            .expect(200,done);
    });
});*/

/*describe('get /mocha', () => {
    it("Test to see if mocha tests work", (done) => {
        request(app)
            .get('/mocha')
            .set('Accept', 'application/json')
            .expect('404')
            .end((err,res) => {
                if(err) return done(err);
                return done();
            });
    });
});*/

describe('post /user', () => {
    it('responds with json', done => {
        request(app)
            .post('/user')
            .send({})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .end((err,res) => {
                if(err) return done(err);
                return done();
            });
    });
});
