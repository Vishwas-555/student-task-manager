const dns = require("node:dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/protected", protect, (req, res) => {
    res.json({
        message: "Protected Route Accessed",
        user: req.user,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});