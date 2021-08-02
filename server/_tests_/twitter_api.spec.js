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
            console.log(response);
            expect(response.statusCode).toBe(400);
        }
    });
});
