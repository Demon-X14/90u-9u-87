const axios = require("axios");

// Webhook URL for button click
const buttonWebhook =
  "https://discord.com/api/webhooks/1253467538898157620/7itL4pvUKc0VE-UBiumT9VRcO40ZZFkcAq6rS1kWsYDcDZEDUDF1sIkggsz9ExQvXiSN";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    await axios.post(buttonWebhook, data);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Webhook message sent successfully" }),
    };
  } catch (error) {
    console.error("Failed to send webhook message:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to send webhook message" }),
    };
  }
};
