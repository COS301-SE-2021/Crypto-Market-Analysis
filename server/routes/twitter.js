const express = require("express");
const router = express.Router();
const database = require("./FirestoreDB");
const db = database.db;

router.post('/getAllTweets', (req, res, next) => {

});

module.exports = router