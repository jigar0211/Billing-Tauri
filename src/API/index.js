import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb://127.0.0.1:27017/billing"; // Connect to local MongoDB

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        setTimeout(connectDB, 5000);
    }
};

connectDB();

// Define Mongoose Schema & Model
const settingsSchema = new mongoose.Schema({}, { strict: false });
const Settings = mongoose.model("Settings", settingsSchema, "settings");

// Check Database Connection
app.get("/api/connection", (req, res) => {
    const isConnected = mongoose.connection.readyState === 1;
    res.json({
        success: isConnected,
        message: isConnected ? "✅ Database Connected" : "❌ Database Not Connected",
    });
});

// GET All Settings
app.get("/api/settings", async (req, res) => {
    try {
        const settings = await Settings.findOne();
        if (!settings) {
            return res.json({ success: false, message: "No settings found" });
        }
        res.json({ success: true, settings });
    } catch (error) {
        console.error("❌ Error fetching settings:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// PUT (Insert/Update) Settings
app.put("/api/settings", async (req, res) => {
    try {
        const { settings } = req.body;

        if (!settings || typeof settings !== "object") {
            return res.status(400).json({ success: false, message: "Invalid data format" });
        }

        const updatedSettings = await Settings.findOneAndUpdate({}, settings, {
            upsert: true,
            new: true,
        });

        res.json({ success: true, message: "Settings updated successfully", updatedSettings });
    } catch (error) {
        console.error("❌ Error updating settings:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000; // Use port 5000 instead of 27017
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
