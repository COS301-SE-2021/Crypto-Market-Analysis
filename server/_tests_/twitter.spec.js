const Twitter = require('../social_media_sites/Twitter');
const twitter = new Twitter();

describe('getUserTimeline', () => {
    test("testing negative inputs", () => {
        let input = [];
        let output = -2;
        expect(twitter.getUserTimeline("String")).toEqual(output);
        expect(twitter.getUserTimeline([1,2,3,4])).toEqual(output);
        input.push("abcdefghifjklmno");
        twitter.getUserTimeline(input);
    });

    test("testing boundaries", () => {
        let input = [];
        const output = -1;
        expect(twitter.getUserTimeline(input)).toEqual(output);
    });
});