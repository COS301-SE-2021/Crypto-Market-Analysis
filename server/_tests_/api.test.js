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
    jest.setTimeout(1000000000)
    it('Returns 200. Add a user to the database', done => {
        const email = "example@example.co.za"
        const username = "example"
        const password = "test"
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
        const password = "test"
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

describe('POST /user/followCrypto', () => {
    let crypto = "Dogecoin";
    let email = "example@example.co.za"
    it(`Adds a crypto the the user in the database`, done => {
        request(app)
            .post('/user/followCrypto')
            .send({"email":email, "crypto_name":crypto})
            .expect(200)
            .then(response => {
                expect(response.body.message).to.equal("Favourite Crypto added")
                done();
            })
            .catch(err => done(err))
    });
    it(`Tries to add an existing crypto to the user in the database`, done => {
        request(app)
            .post('/user/followCrypto')
            .send({"email":email, "crypto_name":crypto})
            .expect(400)
            .then(response => {
                expect(response.body.type).to.equal("already-followed");
                expect(response.body.message).to.equal("already following the cryptocurrency");
                done();
            })
            .catch(err => done(err))
    });
    it(`Tries to add a crypto for a non-existent user in the database`, done => {
        email = "someother@example.co.za"
        request(app)
            .post('/user/followCrypto')
            .send({"email":email, "crypto_name":crypto})
            .expect(403)
            .then(response => {
                expect(response.body.message).to.equal("Not authorized");
                done();
            })
            .catch(err => done(err))
    });
});

describe('POST /user/followSocialMedia', () => {
    let social_media_site = "Twitter";
    let email = "example@example.co.za";
    it(`Adds a social media site for the registered user in the database`, done => {
        request(app)
            .post('/user/followSocialMedia')
            .send({"email":email, "social_media":social_media_site})
            .expect(200)
            .then(response => {
                expect(response.body.message).to.equal("Successful")
                done();
            })
            .catch(err => done(err))
    });
    it(`Tries to add an existing social media site for the registered user in the database`, done => {
        request(app)
            .post('/user/followSocialMedia')
            .send({"email":email, "social_media":social_media_site})
            .expect(400)
            .then(response => {
                expect(response.body.message).to.equal("Already following the social media site");
                done();
            })
            .catch(err => done(err))
    });
    it(`Tries to add a social media site for a non-registered user`, done => {
        email = "someother@example.com"
        request(app)
            .post('/user/followSocialMedia')
            .send({"email":email, "social_media":social_media_site})
            .expect(403)
            .then(response => {
                expect(response.body.message).to.equal("Not authorized");
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
    it('Tries to delete a non-existent user from the database', done => {
        const email = "example@example.com";
        request(app)
            .delete(`/user/${email}`)
            .expect(200)
            .then((response) => {
                done();
            })
            .catch(err => done(err))
    });
    it('Tries to delete with no parameters', done => {
        const email = null;
        request(app)
            .delete(`/user/${email}`)
            .expect(200)
            .then((response) => {
                done();
            })
            .catch(err => done(err))
    });
});
