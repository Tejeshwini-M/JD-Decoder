const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Simple JD Decoder logic
app.post("/decode", (req, res) => {
    const jd = req.body.jd.toLowerCase();

    let skills = [];
    let preparation = [];

    if (jd.includes("javascript")) {
        skills.push("JavaScript");
        preparation.push("Learn basics of JS, ES6 concepts, and practice coding");
    }

    if (jd.includes("react")) {
        skills.push("React");
        preparation.push("Build projects using React and understand hooks");
    }

    if (jd.includes("node")) {
        skills.push("Node.js");
        preparation.push("Learn Express.js and backend APIs");
    }

    if (jd.includes("sql")) {
        skills.push("SQL");
        preparation.push("Practice queries and database design");
    }

    if (jd.includes("communication")) {
        skills.push("Communication Skills");
        preparation.push("Improve speaking and teamwork skills");
    }

    if (skills.length === 0) {
        skills.push("General Skills");
        preparation.push("Understand basics of programming and problem solving");
    }

    res.json({
        skills,
        preparation
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});