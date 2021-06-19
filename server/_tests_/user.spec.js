const conv = require('../routes/analysisFunction');
describe("filtering the post", () => {
    test("it should remove stop words", () => {
         const expected = 'this is the test'
        conv.convertion('this is the test').then(data=>{
            expect(data).toEqual(expected);
        }).catch(error=>{
            console.log('error during testing')
        })

    });
    test("it should convert to lower cases words", () => {
        const expected = 'this is the test'
        conv.convertion('This is The Test').then(data=> {
            expect(data).toEqual(expected);
        })
    });
    test("it should produce error", () => {
        const expected = 'This is the new Message'
        conv.convertion("This is the new Message").then(data=> {
            expect(data).not.toEqual(expected);
        })

    });
    test("testing stop words and numbers", () => {
        const expected = ''
        conv.convertion("#!#$@$%^&&3%@$!").then(data=> {
            expect(data).toEqual(expected);
        })

    });
});