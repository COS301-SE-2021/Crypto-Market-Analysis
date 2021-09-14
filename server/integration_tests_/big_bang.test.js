const request = require('supertest');
const app = require("../app");

describe('POST /', () => {
    test('invalid default route. returns 404 not found error', async () => {
        const response = await request(app).post(`/`).send({});
        expect(response.statusCode).toBe(404);
    });
});

describe('POST /chan', () => {
    test('invalid default chan route. return 404 not found error', async () => {
        const response = await request(app).post(`/chan`).send({});
        expect(response.statusCode).toBe(404);
    });
});

describe('POST /reddit', () => {
    test('invalid default reddit route. return 404 not found error', async () => {
        const response = await request(app).post(`/reddit`).send({});
        expect(response.statusCode).toBe(404);
    });
});

describe('POST /twitter', () => {
    test('invalid default twitter route. return 404 not found error', async () => {
        const response = await request(app).post(`/twitter`).send({});
        expect(response.statusCode).toBe(404);
    });
});

describe('POST /user', () => {
    test('invalid default user route. return 404 not found error', async () => {
        const response = await request(app).post(`/user`).send({});
        expect(response.statusCode).toBe(404);
    });
});

describe(`POST /user/register`, () => {
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/user/register`).send({email: `test@gmail.com`});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toBeTruthy();
    });
    test(`when email already exists`, async () => {
        const response = await request(app).post(`/user/register`).send({email: `codexteam4@gmail.com`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"User already exists"}}`);
    });
    test(`when parameters are missing`, async () => {
        const body_data = [
            {}
        ]

        for(const body of body_data){
            const response = await request(app).post(`/user/register`).send(body);
            expect(response.error.status).toBe(400);
            expect(response.error.text).toEqual(`{"error":{"message":"Malformed request. Please check your parameters"}}`);
        }
    });
});

describe(`POST /user/followCrypto`, () => {
    jest.setTimeout(100000);
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/user/followCrypto`).send({email: `codexteam4@gmail.com`, crypto_name: `Bitcoin`, symbol: `btc`, coin_id: `btc`});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toBeTruthy();
    });
    test(`when email is not valid`, async () => {
        const response = await request(app).post(`/user/followCrypto`).send({email: `fake@notvalid.com`, crypto_name: `Ethereum`, symbol: `eth`, coin_id: `eth`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"Invalid email entered"}}`);
    });
    test(`when crypto already exists`, async () => {
        const response = await request(app).post(`/user/followCrypto`).send({email: `codexteam4@gmail.com`, crypto_name: `Bitcoin`, symbol: `btc`, coin_id: `btc`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"You are already following this crypto"}}`);
    });
    test(`when parameters are missing`, async () => {
        const body_data = [
            {email: "test@test.com", crypto_name: "Ethereum", coin_id: `eth`},
            {email: "test@test.com", symbol: `eth`, coin_id: `eth`},
            {crypto_name: `Ethereum`, symbol: `eth`, coin_id: `eth`},
            {email: "test@test.com", crypto_name: "Ethereum", symbol: `eth`},
            {email: "test@test.com", coin_id: `eth`},
            {crypto_name: `Ethereum`, coin_id: `eth`},
            {symbol: `eth`, coin_id: `eth`},
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
        const response = await request(app).post(`/user/unfollowCrypto`).send({email: `codexteam4@gmail.com`, symbol: `btc`, coin_id: `btc`});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toBeTruthy();
    });
    test(`when email is not valid`, async () => {
        const response = await request(app).post(`/user/unfollowCrypto`).send({email: `fake@notvalid.com`, symbol: `eth`, coin_id: `btc`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"Invalid email entered"}}`);
    });
    test(`when symbol is not valid`, async () => {
        const response = await request(app).post(`/user/unfollowCrypto`).send({email: `codexteam4@gmail.com`, symbol: `adst`, coin_id: `adst`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"User is not following the selected crypto"}}`);
    });
    test(`when parameters are missing`, async () => {
        const body_data = [
            {symbol: `eth`, coin_id: `eth`},
            {email: `test@test.com`, symbol: `eth`},
            {email: `test@test.com`, coin_id: `eth`},
            {email: `test@test.com`},
            {symbol: `eth`},
            {coin_id: `eth`},
            {}
        ]

        for(const body of body_data){
            const response = await request(app).post(`/twitter/unfollow`).send(body);
            expect(response.error.status).toBe(400);
            expect(response.error.text).toEqual(`{"error":{"message":"Malformed request. Please check your parameters"}}`);
        }
    });
});

describe(`POST /user/getCoinIDs`, () => {
    jest.setTimeout(100000);
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/user/getCoinIDs`).send({email: `codexteam4@gmail.com`});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toEqual(expect.any(Array));
    });
    test(`when email is not valid`, async () => {
        const response = await request(app).post(`/user/getCoinIDs`).send({email: `fake@notvalid.com`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"User does not exist"}}`);
    });
    test(`when parameters are missing`, async () => {
        const body_data = [
            {}
        ]

        for(const body of body_data){
            const response = await request(app).post(`/user/getCoinIDs`).send(body);
            expect(response.error.status).toBe(400);
            expect(response.error.text).toEqual(`{"error":{"message":"Malformed request. Please check your parameters"}}`);
        }
    });
});

describe(`POST /user/getUserCryptos`, () => {
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
        const response = await request(app).post(`/user/followSocialMedia`).send({email: `codexteam4@gmail.com`, social_media_sites: `Reddit`});
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
        const response = await request(app).post(`/user/unfollowSocialMedia`).send({email: `codexteam4@gmail.com`, social_media_sites: `Reddit`});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toBeTruthy();
    });
    test(`when email is not valid`, async () => {
        const response = await request(app).post(`/user/unfollowSocialMedia`).send({email: `fake@notvalid.com`, social_media_sites: `Reddit`});
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

describe(`POST /user/getCoinPredictions`, () => {
    jest.setTimeout(100000);
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/user/getCoinPredictions`).send({email: `codexteam4@gmail.com`});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.posts_array).toEqual(expect.any(Array));
    });
    test(`when email is not valid`, async () => {
        const response = await request(app).post(`/user/getCoinPredictions`).send({email: `fake@notvalid.com`});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.posts_array).toEqual(expect.any(Array));
    });
    test(`when parameters are missing`, async () => {
        const body_data = [
            {}
        ]

        for(const body of body_data){
            const response = await request(app).post(`/user/getCoinPredictions`).send(body);
            expect(response.error.status).toBe(400);
            expect(response.error.text).toEqual(`{"error":{"message":"Malformed request. Please check your parameters"}}`);
        }
    });
});

describe(`POST /user/getNotificationObject`, () => {
    jest.setTimeout(100000);
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/user/getNotificationObject`).send({email: `codexteam4@gmail.com`});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
    test(`when email is not valid`, async () => {
        const response = await request(app).post(`/user/getNotificationObject`).send({email: `fake@notvalid.com`});
        expect(response.error.status).toBe(400);
        expect(response.error.text).toEqual(`{"error":{"message":"no notification"}}`);
    });
    test(`when parameters are missing`, async () => {
        const body_data = [
            {}
        ]

        for(const body of body_data){
            const response = await request(app).post(`/user/getNotificationObject`).send(body);
            expect(response.error.status).toBe(400);
            expect(response.error.text).toEqual(`{"error":{"message":"Malformed request. Please check your parameters"}}`);
        }
    });
});

describe(`POST /user/sendMail`, () => {
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/user/sendMail`).send({email: `codexteam4@gmail.com`});
        expect(response.status).toBe(200);
    });
    test(`when email is incorrect`, async () => {
        const response = await request(app).post(`/user/sendMail`).send({email: `fake@not.com`});
        expect(response.status).toBe(200);
    });
    test(`when parameters are missing`, async () => {
        const body_data = [
            {}
        ]

        for(const body of body_data){
            const response = await request(app).post(`/user/sendMail`).send(body);
            expect(response.error.status).toBe(400);
            expect(response.error.text).toEqual(`{"error":{"message":"Malformed request. Please check your parameters"}}`);
        }
    });
});

describe(`POST /chan/get4chanPost`, () => {
    jest.setTimeout(100000);
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/chan/get4chanPost`).send({email: `codexteam4@gmail.com`});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.posts_array).toEqual(expect.any(Array));
    });
    test(`when email is not valid`, async () => {
        const response = await request(app).post(`/chan/get4chanPost`).send({email: `fake@notvalid.com`});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.posts_array).toEqual(expect.any(Array));
    });
    test(`when parameters are missing`, async () => {
        const body_data = [
            {}
        ]

        for(const body of body_data){
            const response = await request(app).post(`/chan/get4chanPost`).send(body);
            expect(response.error.status).toBe(400);
            expect(response.error.text).toEqual(`{"error":{"message":"Malformed request. Please check your parameters"}}`);
        }
    });
});

describe(`POST /sentiment/getAverages`, () => {
    jest.setTimeout(100000);
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/sentiment/getAverages`).send({email: `codexteam4@gmail.com`, crypto_name: `Bitcoin`});
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
    });
    test(`when email is not valid`, async () => {
        const response = await request(app).post(`/sentiment/getAverages`).send({email: `fake@notvalid.com`, crypto_name: `Bitcoin`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"Invalid email entered"}}`);
    });
    test(`when crypto name is not valid`, async () => {
        const response = await request(app).post(`/sentiment/getAverages`).send({email: `codexteam4@gmail.com`, crypto_name: `fake crypto`});
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
            const response = await request(app).post(`/sentiment/getAverages`).send(body);
            expect(response.error.status).toBe(400);
            expect(response.error.text).toEqual(`{"error":{"message":"Malformed request. Please check your parameters"}}`);
        }
    });
});