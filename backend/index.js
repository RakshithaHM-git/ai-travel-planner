const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Recommendation API
app.post("/api/recommend", (req, res) => {
  const { type } = req.body;

  if (type === "beach") {
    return res.json([
      { name: "goa", description: "Famous beach destination", type: "beach" },
      { name: "gokarna", description: "Peaceful beach in Karnataka", type: "beach" },
      { name: "kerala", description: "Backwaters and beaches", type: "beach" }
    ]);
  }

  if (type === "temple") {
    return res.json([
      { name: "temple", description: "Famous temple place", type: "temple" },
      { name: "temple", description: "Spiritual destination", type: "temple" }
    ]);
  }

  if (type === "adventure") {
    return res.json([
      { name: "manali", description: "Snow & trekking", type: "adventure" },
      { name: "ooty", description: "Hill station", type: "adventure" }
    ]);
  }

  res.json([]);
});

// Chat API
app.post("/api/chat", (req, res) => {
  res.json({ reply: "This is AI response (working!)" });
});

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});