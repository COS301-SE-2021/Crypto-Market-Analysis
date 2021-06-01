const expect = require('chai').expect;
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose");
const MONGODB_URI = "mongodb+srv://codex:"+process.env.MongoPassword+"@codex.z7mgz.mongodb.net/Codex?retryWrites=true&w=majority";
try {
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true

    }).then(() => {});
}
catch(error) {
    console.error(`Failed to connect to Database: ${error}`);
}
const userFunctions = require('../routes/user_functions');

describe('deleteUser', () => {
    it('User is in the database', async () => {
        let error = await userFunctions("example@example.com");
        expect(error).to.equal(null)
    });
    it('User is not in the database', async () => {
        let error = await userFunctions("noUser@example.com");
        expect(error).to.equal(null)
    });
    it('No email parameter', async () => {
        let error = await userFunctions("");
        expect(error).to.equal(null)
    });
    it('Email parameter is null or undefined', async () => {
        let error = await userFunctions(undefined);
        expect(error).to.equal(null)
        error = await userFunctions(null);
        expect(error).to.equal(null)
    });
});