const conv = require('../routes/analysisFunction');


describe("Testing the conversion function", () => {
    test("it should remove stop words", () => {
         const expected = 'this is the test'
        conv.convertion('this is the test').then(data=>{
            expect(data).toEqual(expected);

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
describe("Testing the split function", () => {
    test("Testing with incorrect expected data", () => {
        const expected = "";
        conv.splits("i want to split these words").then(data=> {
            expect(data).not.toEqual(expected);
        })

    });

    test("Testing with correct expected data", () => {
        const expected = [ 'i', 'want', 'to', 'split', 'these', 'words' ];
        conv.splits("i want to split these words").then(data=> {
            expect(data).toEqual(expected);
        })

    });
})
describe("Testing the spellingc function", () => {
    test("incorrect data", () => {
        const expected = [""];
        conv.spellingc(['just words']).then(data=> {
            expect(data).not.toEqual(expected);
        })

    });

    test("Testing with correct expected data", () => {
        const expected = ['happiness'];
        conv.spellingc(['hapeness']).then(data=> {
            expect(data).toEqual(expected);
        })

    });
})
describe("Testing the analysewords function", () => {
    test("incorrect data", () => {
        const expected = [""];
        conv.analysewords(['90d282dd2d']).then(data=> {
            expect(data).not.toEqual(expected);
        })

    });

    test("Testing with correct expected data", () => {
        const expected = ['happiness'];
        conv.analysewords(['hapeness']).then(data=> {
            expect(data).toEqual(0);
        })

    });
})
describe("Testing Exceptions", () => {
    test("Testing conversion null value", () => {
        expect(conv.convertion(null)).rejects.toThrow('null value');
    });
    test("Testing splits null value", () => {
        expect(conv.splits(null)).rejects.toThrow('null value');
    });
    test("Testing spellingc null value", () => {
        expect(conv.spellingc(null)).rejects.toThrow('null value');
    });
    test("Testing analysewords null value", () => {
        expect(conv.analysewords(null)).rejects.toThrow('null value');
    });

})
