const { mockFirebase } = require('firestore-jest-mock');

// Create a fake Firestore with a `users` and `posts` collection
mockFirebase({
    database: {
        users: [
            { id: 'abc123', name: 'Homer Simpson' },
            { id: 'abc456', name: 'Lisa Simpson' },
        ],
        posts: [{ id: '123abc', title: 'Really cool title' }],
    },
});
const { mockCollection } = require('firestore-jest-mock/mocks/firestore');

test('testing stuff', () => {
    const firebase = require('firebase'); // or import firebase from 'firebase';
    const db = firebase.firestore();
    const getNotification =async (data)=>{
        return data
            .collection('users')
            .get()
    }
    getNotification(db).then(userDocs => {
        // Assert that a collection ID was referenced
        expect(mockCollection).toHaveBeenCalledWith('users');

        // Write other assertions here
    });

});