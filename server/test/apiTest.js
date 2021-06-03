const request = require('supertest');
const expect = require('chai').expect;
const app = require("../app");
const user = require("../routes/user")
const assert = require('assert');
const mongoose = require("mongoose");
const MONGODB_URI = "mongodb+srv://codex:"+process.env.MongoPassword+"@codex.z7mgz.mongodb.net/Codex?retryWrites=true&w=majority";
try {
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true

    }).then(() => {});
}
catch(error) {
    console.error(`Failed to connect to Database: ${error}`);
}

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

describe('POST /user/signup', () => {
    jest.setTimeout(10000)
    it('Returns 200. Add a user to the database', done => {
        const email = "example@example.co.za"
        const username = "example"
        const password = "password"
        request(app)
            .post('/user/signup')
            .send({"email":email, "username":username, "password":password})
            .expect(200)
            .then((response) => {
                done();
            })
            .catch(err => done(err))
    });
    it('Returns 400. Tries to add an existing user to the database', done => {
        const email = "example@example.co.za"
        const username = "example"
        const password = "password"
        request(app)
            .post('/user/signup')
            .send({"email":email, "username":username, "password":password})
            .expect(400)
            .then((response) => {
                expect(response.body.message).to.equal("User already registered");
                done();
            })
            .catch(err => done(err))
    });
    it('Returns 500. Tries to add a user without specifying parameters', done => {
        const email = null
        const username = null
        const password = null
        request(app)
            .post('/user/signup')
            .send({"email":email, "username":username, "password":password})
            .expect(500)
            .then((response) => {
                done();
            })
            .catch(err => done(err))
    });
});

describe('DELETE /:Email', () => {
    it('Returns 200, email deleted from database', done => {
        const email = "example@example.co.za";
        request(app)
            .delete(`/user/${email}`)
            .expect(200)
            .then((response) => {
                expect(response.body.message).to.equal("User Deleted");
                done();
            })
            .catch(err => done(err))
    });
});
