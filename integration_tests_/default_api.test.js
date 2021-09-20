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