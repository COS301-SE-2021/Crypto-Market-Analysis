require("dotenv").config();
const { mockFirebase } = require('firestore-jest-mock');
const Database = require('../database/Database');

// Create a fake Firestore with a `users` and `posts` collection
mockFirebase({
    database: {
        users: [
            { id: 'mojohnnylerato@gmail.com', crypto: ['eth','ada','usdt'] },
        ],
        Twitter: [{ id: 'Bitcoin', Analysis_score: [0,3,4,5,6,1,2,3] }],
        Users: [
            {
                id: 'testdb@gmail.com',
                Twitter: {
                    Bitcoin: [
                        { Average: 12, Min: 0, Max: 4, AnalysisArr:[1,2,3,4,5] },
                        { post: 'this is a tweet about bitcoin' },
                    ],
                },
            },
        ],
    },
});
const { mockCollection, mockDoc } = require('firestore-jest-mock/mocks/firestore');
const firebase = require('firebase');
const db = firebase.firestore();
const firestore_db = new Database(db,true).getInstance(db);
test('testing fetchNotification', () => {

    firestore_db.fetchNotification('mojohnnylerato@gmail.com').then(userDocs => {
        expect(mockCollection).toHaveBeenCalledWith('Users');
        expect(mockDoc).toHaveBeenCalledWith('mojohnnylerato@gmail.com');

    });

});
test('testing fetchAnalysisScore', () => {
    firestore_db.fetchAnalysisScore('Twitter').then(userDocs => {
        expect(mockCollection).toHaveBeenCalledWith('Twitter');
    });
});
test('testing fetchPushNotification', () => {
    firestore_db.fetchPushNotification('testing@gmail.com').then(userDocs => {
        expect(mockCollection).toHaveBeenCalledWith('Subscribers');
        expect(mockDoc).toHaveBeenCalledWith('testing@gmail.com');

    });
});
test('testing storeNotification', () => {
    firestore_db.storeNotification('testing@gmail.com',{}).then(userDocs => {
        expect(mockCollection).toHaveBeenCalledWith('Users');
        expect(mockDoc).toHaveBeenCalledWith('testing@gmail.com');

    });
});
test('testing setPushNotification', () => {
    firestore_db.setPushNotification('testing@gmail.com',{}).then(userDocs => {
        expect(mockCollection).toHaveBeenCalledWith('Users');
        expect(mockDoc).toHaveBeenCalledWith('testing@gmail.com');

    });
});
test('testing fetch', () => {
    firestore_db.fetch('4chan_info','biz').then(userDocs => {
        expect(mockCollection).toHaveBeenCalledWith('4chan_info');
        expect(mockDoc).toHaveBeenCalledWith('biz');

    });
});
test('testing delete', () => {
    firestore_db.delete('Users','codexemail@gmail.com','name',{}) .then(userDocs => {
        expect(mockCollection).toHaveBeenCalledWith('Users');
        expect(mockDoc).toHaveBeenCalledWith('codexemail@gmail.com');

    });
});
test('testing save', () => {
        firestore_db.save('Users','codexemail@gmail.com','Crypto_Name',{},false);
        expect(mockCollection).toHaveBeenCalledWith('Users');
        expect(mockDoc).toHaveBeenCalledWith('codexemail@gmail.com');

});


