const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

// Use environment variable for port or default to 4000
const PORT = process.env.PORT || 4000;

// Enable CORS for all origins in production, localhost in development
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ["https://anahat-chhatwal.vercel.app"] // Replace with your actual Vercel URL
    : ["http://localhost:3000"],
  credentials: true
}));

app.use(express.json());

// Path to the leaderboard file
const filePath = path.join(__dirname, "leaderboard.json");

// Load existing scores or start empty
function loadScores() {
    try {
        if (!fs.existsSync(filePath)) {
            // Create empty file if it doesn't exist
            fs.writeFileSync(filePath, JSON.stringify([]));
            console.log("Created new leaderboard.json file");
            return [];
        }
        const data = fs.readFileSync(filePath, "utf8");
        const scores = JSON.parse(data);
        console.log(`Loaded ${scores.length} scores from leaderboard`);
        return scores;
    } catch (error) {
        console.error("Error loading scores:", error);
        return [];
    }
}

// Save scores
function saveScores(scores) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(scores, null, 2));
        console.log(`Saved ${scores.length} scores to leaderboard`);
    } catch (error) {
        console.error("Error saving scores:", error);
    }
}

// GET leaderboard
app.get("/api/leaderboard", (req, res) => {
    try {
        console.log("Leaderboard request received");
        const scores = loadScores();
        console.log("Sending leaderboard:", scores);
        res.json(scores);
    } catch (error) {
        console.error("Error loading leaderboard:", error);
        res.status(500).json({ error: "Failed to load leaderboard" });
    }
});

// POST new score
app.post("/api/submitScore", (req, res) => {
    try {
        console.log("Score submission received:", req.body);

        const { name, score, message } = req.body;
        if (!name || typeof score !== "number") {
            console.log("❌ Invalid data received:", req.body);
            return res.status(400).json({ error: "Invalid data" });
        }

        const scores = loadScores();
        const newEntry = { 
            name, 
            score, 
            message: message || "No message", 
            date: new Date().toISOString() 
        };
        
        scores.push(newEntry);

        // Sort by score descending
        scores.sort((a, b) => b.score - a.score);

        saveScores(scores);
        console.log("Score submitted successfully:", newEntry);
        res.json({ success: true, leaderboard: scores });
    } catch (error) {
        console.error("Error submitting score:", error);
        res.status(500).json({ error: "Failed to submit score" });
    }
});

// Test endpoint to check if server is working
app.get("/api/test", (req, res) => {
    console.log("Test endpoint hit");
    res.json({ message: "Server is working!", timestamp: new Date().toISOString() });
});

// Root endpoint
app.get("/", (req, res) => {
    res.json({ message: "Basketball Game API is running!" });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📊 Leaderboard API: /api/leaderboard`);
    console.log(`🎯 Submit score: /api/submitScore`);
    console.log(`🧪 Test endpoint: /api/test`);
});