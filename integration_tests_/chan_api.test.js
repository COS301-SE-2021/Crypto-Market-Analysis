const request = require('supertest');
const app = require("../app");

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