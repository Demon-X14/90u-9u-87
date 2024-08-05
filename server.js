const path = require("path");
const express = require("express");
const axios = require("axios");
const rateLimit = require("express-rate-limit"); // Optional: Rate limiting
const app = express();

// Middleware to serve static files from 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse JSON bodies
app.use(express.json());

// Rate limiter for webhooks (optional but recommended)
const webhookLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use("/visit-webhook", webhookLimiter);
app.use("/button-webhook", webhookLimiter);

// Environment variables for webhook URLs
const visitWebhook = process.env.VISIT_WEBHOOK_URL; // Ensure to use uppercase
const buttonWebhook = process.env.BUTTON_WEBHOOK_URL; // Ensure to use uppercase

// Endpoint to handle visit webhook
app.post("/visit-webhook", async (req, res) => {
  const { content } = req.body; // Ensure this is sanitized
  if (!content) {
    return res.status(400).send("Bad Request: Missing content");
  }

  try {
    await axios.post(visitWebhook, req.body);
    res.status(200).send("Webhook message sent successfully");
  } catch (error) {
    console.error("Failed to send webhook message:", error.message);
    res.status(500).send("Failed to send webhook message");
  }
});

// Endpoint to handle button webhook
app.post("/button-webhook", async (req, res) => {
  const { content } = req.body; // Ensure this is sanitized
  if (!content) {
    return res.status(400).send("Bad Request: Missing content");
  }

  try {
    await axios.post(buttonWebhook, req.body);
    res.status(200).send("Webhook message sent successfully");
  } catch (error) {
    console.error("Failed to send webhook message:", error.message);
    res.status(500).send("Failed to send webhook message");
  }
});

module.exports = app;
