const request = require('supertest');
const app = require("../app");

describe(`POST /user/followCrypto`, () => {
    jest.setTimeout(100000);
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/user/followCrypto`).send({email: `codexteam4@gmail.com`, crypto_name: `Ethereum`, symbol: `eth`});
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    test(`when email is not valid`, async () => {
        const response = await request(app).post(`/user/followCrypto`).send({email: `fake@notvalid.com`, crypto_name: `Ethereum`, symbol: `eth`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"status":"Internal server error","error":"Invalid email entered"}`);
    });
    test(`when parameters are missing`, async () => {
        const body_data = [
            {email: "test@test.com", crypto_name: "Ethereum"},
            {email: "test@test.com", symbol: `eth`},
            {crypto_name: `Ethereum`, symbol: `eth`},
            {email: "test@test.com"},
            {crypto_name: `Ethereum`},
            {symbol: `eth`},
            {}
        ]

        for(const body of body_data){
            const response = await request(app).post(`/user/followCrypto`).send(body);
            expect(response.error.status).toBe(400);
            expect(response.error.text).toEqual(`{"status":"Bad Request","error":"Malformed request. Please check your parameters"}`);
        }
    });
});

describe(`POST /user/unfollowCrypto`, () => {
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/user/unfollowCrypto`).send({email: `codexteam4@gmail.com`, screen_name: `elonmusk`});
        console.log(response);
        expect(response.status).toBe(200);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe(`Screen name successfully removed`);
    });
    test(`when email is not valid`, async () => {
        const response = await request(app).post(`/twitter/unfollow`).send({email: `fake@notvalid.com`, screen_name: `elonmusk`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"Invalid email entered"}}`);
    });
    test(`when screen name is not valid`, async () => {
        const response = await request(app).post(`/twitter/unfollow`).send({email: `codexteam4@gmail.com`, screen_name: `test`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"User is not following the selected screen_name"}}`);
    });
    test(`when parameters are missing`, async () => {
        const body_data = [
            {screen_name: "elonmusk"},
            {email: "test@test.com"},
            {}
        ]

        for(const body of body_data){
            const response = await request(app).post(`/twitter/unfollow`).send(body);
            expect(response.error.status).toBe(400);
            expect(response.error.text).toEqual(`{"error":{"message":"Malformed request. Please check your parameters"}}`);
        }
    });
});

describe(`POST /user/getUserCrypto`, () => {
    jest.setTimeout(100000);
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/user/getUserCryptos`).send({email: `codexteam4@gmail.com`});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toEqual(expect.any(Array));
    });
    test(`when email is not valid`, async () => {
        const response = await request(app).post(`/user/getUserCryptos`).send({email: `fake@notvalid.com`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"Invalid email entered"}}`);
    });
    test(`when parameters are missing`, async () => {
        const body_data = [
            {}
        ]

        for(const body of body_data){
            const response = await request(app).post(`/user/getUserCryptos`).send(body);
            expect(response.error.status).toBe(400);
            expect(response.error.text).toEqual(`{"error":{"message":"Malformed request. Please check your parameters"}}`);
        }
    });
});