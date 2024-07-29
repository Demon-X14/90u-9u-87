const path = require("path");
const express = require("express");
const axios = require("axios");
const app = express();

// Middleware to serve static files from 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse JSON bodies
app.use(express.json());

// Webhook URLs (kept secret on the server side)
const visitWebhook =
  "https://discord.com/api/webhooks/1253467404093362330/OTY1gXsST6iBZJX1oMkkygCduPxzUnYOGMlTILa2tImhNMm1Z93Gn0DMBzkLpy3s0aG6";
const buttonWebhook =
  "https://discord.com/api/webhooks/1253467538898157620/7itL4pvUKc0VE-UBiumT9VRcO40ZZFkcAq6rS1kWsYDcDZEDUDF1sIkggsz9ExQvXiSN";

// Endpoint to handle visit webhook
app.post("/visit-webhook", async (req, res) => {
  try {
    await axios.post(visitWebhook, req.body);
    res.status(200).send("Webhook message sent successfully");
  } catch (error) {
    console.error("Failed to send webhook message:", error);
    res.status(500).send("Failed to send webhook message");
  }
});

// Endpoint to handle button webhook
app.post("/button-webhook", async (req, res) => {
  try {
    await axios.post(buttonWebhook, req.body);
    res.status(200).send("Webhook message sent successfully");
  } catch (error) {
    console.error("Failed to send webhook message:", error);
    res.status(500).send("Failed to send webhook message");
  }
});

module.exports = app;
