const request = require('supertest');
const app = require("../app");

describe(`POST /user/followCrypto`, () => {
    jest.setTimeout(100000);
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/user/followCrypto`).send({email: `codexteam4@gmail.com`, crypto_name: `Dogecoin`, symbol: `doge`});
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    test(`when email is not valid`, async () => {
        const response = await request(app).post(`/user/followCrypto`).send({email: `fake@notvalid.com`, crypto_name: `Ethereum`, symbol: `eth`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"Invalid email entered"}}`);
    });
    test(`when crypto already exists`, async () => {
        const response = await request(app).post(`/user/followCrypto`).send({email: `codexteam4@gmail.com`, crypto_name: `Bitcoin`, symbol: `btc`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"You are already following this crypto"}}`);
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
            expect(response.error.text).toEqual(`{"error":{"message":"Malformed request. Please check your parameters"}}`);
        }
    });
});

describe(`POST /user/unfollowCrypto`, () => {
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/user/unfollowCrypto`).send({email: `codexteam4@gmail.com`, symbol: `eth`});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toBeTruthy();
    });
    test(`when email is not valid`, async () => {
        const response = await request(app).post(`/user/unfollowCrypto`).send({email: `fake@notvalid.com`, symbol: `eth`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"Invalid email entered"}}`);
    });
    test(`when symbol is not valid`, async () => {
        const response = await request(app).post(`/user/unfollowCrypto`).send({email: `codexteam4@gmail.com`, symbol: `adst`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"User is not following the selected crypto"}}`);
    });
    test(`when parameters are missing`, async () => {
        const body_data = [
            {symbol: "eth"},
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

describe(`POST /user/followSocialMedia`, () => {
    jest.setTimeout(100000);
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/user/followSocialMedia`).send({email: `codexteam4@gmail.com`, social_media_sites: `Reddit`});
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    test(`when email is not valid`, async () => {
        const response = await request(app).post(`/user/followSocialMedia`).send({email: `fake@notvalid.com`, social_media_sites: `Reddit`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"Invalid email entered"}}`);
    });
    test(`when social media site is not valid`, async () => {
        const response = await request(app).post(`/user/followSocialMedia`).send({email: `codexteam4@gmail.com`, social_media_sites: `reddit`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"Invalid site entered"}}`);
    });
    test(`when social media site already exists`, async () => {
        const response = await request(app).post(`/user/followSocialMedia`).send({email: `codexteam4@gmail.com`, social_media_sites: `Twitter`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"You are already following this site"}}`);
    });
    test(`when parameters are missing`, async () => {
        const body_data = [
            {email: "test@test.com"},
            {social_media_sites: "Reddit"},
            {}
        ]

        for(const body of body_data){
            const response = await request(app).post(`/user/followSocialMedia`).send(body);
            expect(response.error.status).toBe(400);
            expect(response.error.text).toEqual(`{"error":{"message":"Malformed request. Please check your parameters"}}`);
        }
    });
});

describe(`POST /user/unfollowSocialMedia`, () => {
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/user/unfollowSocialMedia`).send({email: `codexteam4@gmail.com`, social_media_sites: `Twitter`});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toBeTruthy();
    });
    test(`when email is not valid`, async () => {
        const response = await request(app).post(`/user/unfollowSocialMedia`).send({email: `fake@notvalid.com`, social_media_sites: `Twitter`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"Invalid email entered"}}`);
    });
    test(`when site is not valid`, async () => {
        const response = await request(app).post(`/user/unfollowSocialMedia`).send({email: `codexteam4@gmail.com`, social_media_sites: `4chan`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"User is not following the selected social media platform"}}`);
    });
    test(`when parameters are missing`, async () => {
        const body_data = [
            {social_media_sites: `Twitter`},
            {email: "test@test.com"},
            {}
        ]

        for(const body of body_data){
            const response = await request(app).post(`/user/unfollowSocialMedia`).send(body);
            expect(response.error.status).toBe(400);
            expect(response.error.text).toEqual(`{"error":{"message":"Malformed request. Please check your parameters"}}`);
        }
    });
});

describe(`POST /user/fetchUserSocialMedia`, () => {
    jest.setTimeout(100000);
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/user/fetchUserSocialMedia`).send({email: `codexteam4@gmail.com`});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toEqual(expect.any(Array));
    });
    test(`when email is not valid`, async () => {
        const response = await request(app).post(`/user/fetchUserSocialMedia`).send({email: `fake@notvalid.com`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"Invalid email entered"}}`);
    });
    test(`when parameters are missing`, async () => {
        const body_data = [
            {}
        ]

        for(const body of body_data){
            const response = await request(app).post(`/user/fetchUserSocialMedia`).send(body);
            expect(response.error.status).toBe(400);
            expect(response.error.text).toEqual(`{"error":{"message":"Malformed request. Please check your parameters"}}`);
        }
    });
});