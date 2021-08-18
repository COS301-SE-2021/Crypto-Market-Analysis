const request = require('supertest');
const app = require("../app");

describe(`POST /reddit/getRedditPost`, () => {
    jest.setTimeout(100000);
    test(`when parameters are correct`, async () => {
        const response = await request(app).post(`/reddit/getRedditPost`).send({email: `codexteam4@gmail.com`});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toEqual(expect.any(Array));
    });
    test(`when email is not valid`, async () => {
        const response = await request(app).post(`/reddit/getRedditPost`).send({email: `fake@notvalid.com`});
        expect(response.error.status).toBe(500);
        expect(response.error.text).toEqual(`{"error":{"message":"Invalid email entered"}}`);
    });
    test(`when parameters are missing`, async () => {
        const body_data = [
            {}
        ]

        for(const body of body_data){
            const response = await request(app).post(`/reddit/getRedditPost`).send(body);
            expect(response.error.status).toBe(400);
            expect(response.error.text).toEqual(`{"error":{"message":"Malformed request. Please check your parameters"}}`);
        }
    });
});

