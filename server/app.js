const dotenv = require(`dotenv`).config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const userRoutes = require('./routes/user');
const twitterRoute = require('./routes/twitter');
const redditRoute = require('./routes/reddit');
const chanRoute = require('./routes/chan');
const chatRoute = require('./routes/chat/chat');
const sentimentRoute = require('./routes/sentiment');
const helmet = require('helmet');
const cors = require ('cors');
const session = require('express-session');

const {
    NODE_ENV = 'development',
} = process.env

const IN_PROD = NODE_ENV === 'production'

app.use(helmet());
app.use(cors({
    origin: "*",
}));
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({

    cookie:{
        sameSite: true,
        secure: IN_PROD
    },
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false
}));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
})

// Routes which should handle requests
app.use("/user", userRoutes);
app.use("/twitter", twitterRoute);
app.use("/reddit", redditRoute);
app.use("/chan", chanRoute);
app.use("/chat", chatRoute);
app.use("/sentiment", sentimentRoute);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
