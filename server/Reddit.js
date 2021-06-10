const snoowrap = require('snoowrap');
const Sentiment = require('sentiment');
const vader = require('vader-sentiment');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase.json');
const userAgent = 'codex';
const clientId = '9hYB1ExwwjFAPw';
const clientSecret = 'jvq3MgpkmN0WUXqnjAct2DXTU-h-ow';
const username = 'JuGGz87';
const password = 'Ndhlovu4Lyf';
const r = new snoowrap({
    userAgent: userAgent,
    clientId: clientId,
    clientSecret: clientSecret,
    username: username,
    password: password
});
class Reddit {

}