const Twitter = require('../social_media_sites/Twitter');
const twitter = new Twitter();
const { FakeFirestore } = require('firestore-jest-mock');
const { mockCollection, mockDoc } = require('firestore-jest-mock/mocks/firestore');

describe('Database', () => {
    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

    const db = (simulateDB = false) =>
        new FakeFirestore(
            {
                characters: [
                    {
                        id: 'mojohnnylerato@gmail.com',
                          Twitter: {
                            Bitcoin: [
                                { Average: 12, Min: 0, Max: 4, AnalysisArr:[1,2,3,4,5] },
                                { post: 'this is a tweet about bitcoin' },
                            ],
                        },
                    },
                ],
            },
            { simulateDB },
        );
    test('querying the database test positive case', async () => {
        expect.assertions(4);
        const data = await db()
            .collection('Twitter')
            .doc('Bitcoin')
            .get();
        expect(mockCollection).toHaveBeenCalledWith('Twitter');
        expect(mockDoc).toHaveBeenCalledWith('Bitcoin');
        expect(data.id).toBe('Bitcoin');
        expect(data.exists).toBe(false);
    });
    test('querying the database test negative case', async () => {
        expect.assertions(4);
        const data = await db()
            .collection('Twitter')
            .doc('Bitcoin')
            .get();
        expect(mockCollection).not.toHaveBeenCalledWith('Reddit');
        expect(mockDoc).not.toHaveBeenCalledWith('Ethereum');
        expect(data.id).not.toBe('Ethereum');
        expect(data.exists).not.toBe(true);
    });
    test('saving to the database test positive case', async () => {
        const mock= db();
        await mock
            .collection('Twitter')
            .doc('Bitcoin')
            .set({
                post: 'this is the data from twitter',
            });
        expect(mockCollection).toHaveBeenCalledWith('Twitter');
        expect(mockDoc).toHaveBeenCalledWith('Bitcoin');
        const doc = await mock.doc('Twitter/Bitcoin').get();
        expect(doc.id).toBe('Bitcoin');
    });
    test('saving to the database test negative case', async () => {
        const mock= db();
        await mock
            .collection('Reddit')
            .doc('Ethereum')
            .set({
                post: 'this is the data from twitter',
            });
        expect(mockCollection).not.toHaveBeenCalledWith('Twitter');
        expect(mockDoc).not.toHaveBeenCalledWith('Bitcoin');

    });
    test('Testing retrieve after saving positive case', async () => {
        const mock = db();
        await mock
            .collection('Reddit')
            .doc('Ethereum')
            .set({
                post: 'this is the data from twitter',
            });
        const doc = await mock.doc('Reddit/Ethereum').get();
        expect(doc.id).toBe('Ethereum');
    });
    test('Testing retrieve after saving negative case', async () => {
        const mock = db();
        await mock
            .collection('Reddit')
            .doc('Ethereum')
            .set({
                post: 'this is the data from twitter',
            });
        const doc = await mock.doc('Reddit/Ethereum').get();
        expect(doc.id).not.toBe('Bitcoin');
    });

})
describe('Testing Twitter functions', () => {
    test('Testing getUsersID exception',  () => {
        expect(twitter.getUsersID(null)).rejects.toThrow('null value');
    });
    test('Testing filterData exception',  () => {
        expect(twitter.filterData(null)).rejects.toThrow('null value');
    });
    test('Testing getUserTimeline exception',  () => {
        expect(twitter.getUserTimeline(null)).rejects.toThrow('null value');
    });
})

