const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// FIX: Default route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// JD Decoder API
app.post("/decode", (req, res) => {
    const jd = req.body.jd.toLowerCase();

    let skills = [];
    let preparation = [];

    if (jd.includes("javascript")) skills.push("JavaScript");
    if (jd.includes("react")) skills.push("React");
    if (jd.includes("node")) skills.push("Node.js");

    preparation = skills.map(s => `Learn ${s}`);

    res.json({ skills, preparation });
});

// IMPORTANT for deployment
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});