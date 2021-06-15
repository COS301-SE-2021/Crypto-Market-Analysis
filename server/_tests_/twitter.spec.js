const Twitter = require('../social_media_sites/Twitter');
const twitter = new Twitter();
describe('getUserTimeline', () => {
    test("testing negative inputs", () => {
        let input = [];
        let output = -2;

        //Give wrong data type
        expect(twitter.getUserTimeline("String")).toEqual(output);

        //Give an array of integers
        expect(twitter.getUserTimeline([1,2,3,4])).toEqual(output);

        //Give a user that doesn't exist
        input.push("abcdefghifjklmno");
        twitter.getUserTimeline(input);
        expect(console.error(`An error occurred while connecting to the twitter API:`)).toHaveBeenCalledTimes(1);

        //give users that don't exist
        /*input.push('f');
        expect(twitter.getUserTimeline(input)).toEqual(output);*/
    });

    test("testing boundaries", () => {
        let input = [];
        const output = -1;

        //Empty array passed in
        expect(twitter.getUserTimeline(input)).toEqual(output);
    });
});