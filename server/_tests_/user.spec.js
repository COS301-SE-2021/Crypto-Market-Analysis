const conv = require('../routes/user');
const natural = require('natural');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');
const aposToLexForm = require('apos-to-lex-form');
function convertion(post){
    const contractions = aposToLexForm(post);//convert word to contractions
    const cLcase = contractions.toLowerCase();//convert to lowercases
    const value = cLcase.replace(/[^a-zA-Z\s]+/g, '');//remove stop word
    return value //post converted ready to be read
}
describe("filtering the post", () => {
    test("it should remove stop words", () => {
         const expected = 'this is the test'
         expect(convertion("this, Is the, test.")).toEqual(expected);
    });
    test("it should convert to lower cases words", () => {
        const expected = 'message input in lower cases'
        expect(convertion("Message inPut in loWer Cases")).toEqual(expected);
    });
    test("it should produce error", () => {
        const expected = 'This is the new Message'
        expect(convertion("This is the new Message")).not.toEqual(expected);
    });
    test("testing stop words and numbers", () => {
        const expected = ''
        expect(convertion("#!#$@$%^&&3%@$!")).toEqual(expected);
    });
});