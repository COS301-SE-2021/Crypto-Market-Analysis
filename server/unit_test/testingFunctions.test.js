const assert = require('assert');
require("dotenv").config();
const userfunctions =require('../routes/userFunctions');

describe('get Cryptos test', () => {
    jest.setTimeout(100000);
    it('should return cryptos', async () => {
        await userfunctions.getUserCrypto('bhekindhlovu7@gmail.com').then(array=>{
            assert.notEqual(array,[])
       })
    });


});
const object={
    status: 'Ok',
    posts_array: [
        {
            open: 2.742308796405792,
            coin: 'ada',
            high: 2.7474750509262087,
            close: 2.8173435111045837,
            low: 2.8080202362537383,
            average: 9.227269885659219
        }
    ]
}
it('testing coin prediction', async() => {
    await userfunctions.getCoinPredictions('bhekindhlovu7@gmail.com').then(predict=>{
       assert.notEqual(JSON.stringify(predict),JSON.stringify(object) )
    })
});
test('testing fetch user social media', async () => {
    await userfunctions.fetchUserSocialMedia('bhekindhlovu7@gmail.com').then(array=>{
        assert.notEqual(array,[]);
    })
});
describe('follow crypto function', () => {
    test('testing follow crypto', async () => {
        await userfunctions.followCrypto('bhekindhlovu7@gmail.com', 'Twitter', 'Bitcoin').then(error => {
            assert.equal(error, true);
        })
    });
    test('testing parameters', async () => {
        await expect(userfunctions.followCrypto()).rejects.toEqual("Parameters are undefined");
    });
    test('testing wrong email', async () => {
        await expect(userfunctions.followCrypto('jest@gmail.com', 'nosymbol', 'jat')).rejects.toEqual("Invalid email entered");
    });
})
describe('testing unfollow cryptocurrency method', () => {
    test('testing wrong symbol', async () => {
        await expect(userfunctions.unfollowCrypto('bhekindhlovu7@gmail.com', 'person')).rejects.toEqual("User is not following the selected crypto")
    });
    test('testing unfollow parameters', async () => {
        await expect(userfunctions.unfollowCrypto()).rejects.toEqual("Parameters are undefined");
    });
    test('testing wrong email entered', async () => {
        await expect(userfunctions.unfollowCrypto('jest@gmail.com', 'nosymbol')).rejects.toEqual("Invalid email entered");
    });
})

describe('testing  unfollow social media function', () => {
    test('testing wrong symbol', async () => {
        await expect(userfunctions.unfollowSocialMedia('bhekindhlovu7@gmail.com', 'unitTest')).rejects.toEqual("User is not following the selected social media platform")
    });
    test('testing unfollow parameters', async () => {
        await expect(userfunctions.unfollowSocialMedia()).rejects.toEqual("Parameters are undefined");
    });
    test('testing wrong email entered', async () => {
        await expect(userfunctions.unfollowSocialMedia('jest@gmail.com', 'nosymbol')).rejects.toEqual("Invalid email entered");
    });
})

