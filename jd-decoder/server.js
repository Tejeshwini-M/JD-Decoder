const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/decode", (req, res) => {
    const jd = req.body.jd.toLowerCase();

    let skills = [];
    let preparation = [];

    if (jd.includes("javascript")) {
        skills.push("JavaScript");
        preparation.push("Learn JS basics and ES6");
    }
    if (jd.includes("react")) {
        skills.push("React");
        preparation.push("Build React projects");
    }
    if (jd.includes("node")) {
        skills.push("Node.js");
        preparation.push("Learn Express and APIs");
    }
    if (jd.includes("sql")) {
        skills.push("SQL");
        preparation.push("Practice queries");
    }
    if (jd.includes("communication")) {
        skills.push("Communication");
        preparation.push("Improve speaking and teamwork");
    }

    if (skills.length === 0) {
        skills.push("General Skills");
        preparation.push("Learn programming basics");
    }

    let level = "Beginner";
    if (skills.length >= 3) level = "Intermediate";
    if (skills.length >= 5) level = "Advanced";

    res.json({ skills, preparation, level });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));