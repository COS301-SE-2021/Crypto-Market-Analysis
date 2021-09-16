const request = require('supertest');
const app = require("../app");

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
        }
    });
});