const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var alternate = {
    origin: "http://localhost:8090"
};

app.use(cors(alternate));

//response with json
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Response to the user" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});