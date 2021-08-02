const request = require('supertest');
const app = require("../app");

describe('POST /twitter/getCryptoTweets', () => {
    test('when parameters are missing or not valid', async () => {
        const body_data = [
            {crypto_name: "Bitcoin"},
            {email: "test@test.com"},
            {}
        ]

        for(const body of body_data){
            const response = await request(app).post(`/twitter/getCryptoTweets`).send({});
            expect(response.error.status).toBe(400);
            expect(response.error.text).toEqual(`{"error":{"message":"Malformed request. Please check your parameters"}}`);
        }
    });
});
