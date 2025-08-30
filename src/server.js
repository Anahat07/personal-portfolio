import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
const PORT = 4000;

// Path to file where scores are saved
const filePath = path.join(process.cwd(), "leaderboard.json");

// Middleware
app.use(cors());
app.use(express.json());

// Load existing scores or start empty
function loadScores() {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

// Save scores
function saveScores(scores) {
    fs.writeFileSync(filePath, JSON.stringify(scores, null, 2));
}

// GET leaderboard
app.get("/api/leaderboard", (req, res) => {
    res.json(loadScores());
});

// POST new score
app.post("/api/submitScore", (req, res) => {
    console.log("Incoming score:", req.body); // 👈 add this

    const { name, score, message } = req.body;
    if (!name || typeof score !== "number") {
        console.log("❌ Invalid data:", req.body);
        return res.status(400).json({ error: "Invalid data" });
    }

    const scores = loadScores();
    scores.push({ name, score, message, date: new Date().toISOString() });

    scores.sort((a, b) => b.score - a.score);

    saveScores(scores);
    res.json({ success: true, leaderboard: scores });
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});