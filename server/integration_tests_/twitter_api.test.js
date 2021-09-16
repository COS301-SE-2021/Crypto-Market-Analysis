const request = require('supertest');
const app = require("../app");

describe(`POST /twitter/getCryptoTweets`, () => {
    jest.setTimeout(100000);
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/twitter/getCryptoTweets`).send({email: `codexteam4@gmail.com`, crypto_name: `Bitcoin`});
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
    });
    test(`when email is not valid`, async () => {
        const response = await request(app).post(`/twitter/getCryptoTweets`).send({email: `fake@notvalid.com`, crypto_name: `Bitcoin`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"Email is invalid"}}`);
    });
    test(`when crypto name is not valid`, async () => {
        const response = await request(app).post(`/twitter/getCryptoTweets`).send({email: `codexteam4@gmail.com`, crypto_name: `fake crypto`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"Email is not following the selected cryptocurrency"}}`);
    });
    test(`when parameters are missing`, async () => {
        const body_data = [
            {crypto_name: "Bitcoin"},
            {email: "test@test.com"},
            {}
        ]

        for(const body of body_data){
            const response = await request(app).post(`/twitter/getCryptoTweets`).send(body);
            expect(response.error.status).toBe(400);
            expect(response.error.text).toEqual(`{"error":{"message":"Malformed request. Please check your parameters"}}`);
        }
    });
});

describe(`POST /twitter/validateScreenName`, () => {
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/twitter/validateScreenName`).send({email: `codexteam4@gmail.com`, screen_name: `BillGates`});
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
        expect(response.body.data).toBeTruthy();
    });
    test(`when email is not valid`, async () => {
        const response = await request(app).post(`/twitter/validateScreenName`).send({email: `fake@notvalid.com`, screen_name: `elonmusk`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"Invalid email entered"}}`);
    });
    test(`when screen name is not valid`, async () => {
        const response = await request(app).post(`/twitter/validateScreenName`).send({email: `codexteam4@gmail.com`, screen_name: `./././././`});
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
        expect(response.body.data).toBeFalsy();
    });
    test(`when parameters are missing`, async () => {
        const body_data = [
            {screen_name: "elonmusk"},
            {email: "test@test.com"},
            {}
        ]

        for(const body of body_data){
            const response = await request(app).post(`/twitter/validateScreenName`).send(body);
            expect(response.error.status).toBe(400);
            expect(response.error.text).toEqual(`{"error":{"message":"Malformed request. Please check your parameters"}}`);
        }
    });
});

describe(`POST /twitter/follow`, () => {
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/twitter/follow`).send({email: `codexteam4@gmail.com`, screen_name: `elonmusk`});
        expect(response.status).toBe(200);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe(`Screen name successfully added`);
    });
    test(`when email is not valid`, async () => {
        const response = await request(app).post(`/twitter/follow`).send({email: `fake@notvalid.com`, screen_name: `elonmusk`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"Invalid email entered"}}`);
    });
    test(`when parameters are missing`, async () => {
        const body_data = [
            {screen_name: "elonmusk"},
            {email: "test@test.com"},
            {}
        ]

        for(const body of body_data){
            const response = await request(app).post(`/twitter/follow`).send(body);
            expect(response.error.status).toBe(400);
            expect(response.error.text).toEqual(`{"error":{"message":"Malformed request. Please check your parameters"}}`);
        }
    });
});

describe(`POST /twitter/unfollow`, () => {
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/twitter/unfollow`).send({email: `codexteam4@gmail.com`, screen_name: `elonmusk`});
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

describe(`POST /twitter/getTweetIDs`, () => {
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/twitter/getTweetIDs`).send({email: `codexteam4@gmail.com`, crypto_name: `Bitcoin`});
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
    });
    test(`when parameters are missing`, async () => {
        const body_data = [
            {crypto_name: "Bitcoin"},
            {email: "test@test.com"},
            {}
        ]

        for(const body of body_data){
            const response = await request(app).post(`/twitter/getTweetIDs`).send(body);
            expect(response.error.status).toBe(400);
            expect(response.error.text).toEqual(`{"error":{"message":"Malformed request. Please check your parameters"}}`);
        }
    });
});