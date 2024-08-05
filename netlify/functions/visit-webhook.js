const axios = require("axios");

// Webhook URL for visit (set via environment variable)
const visitWebhook = process.env.VISIT_WEBHOOK_URL;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  try {
    const ipAddress = event.headers["x-forwarded-for"] || "Unknown"; // Get IP address from request headers
    const visitMessage = `## Visitor's IP Address: ${ipAddress} ## Visited URL: ${event.headers.origin}`;

    await axios.post(visitWebhook, {
      content: visitMessage,
      username: "Demon",
      avatar_url: "https://0ixe.site/WImages/DSquared.png",
    });

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
