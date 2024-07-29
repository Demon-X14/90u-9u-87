const axios = require("axios");

exports.handler = async (event) => {
  const visitWebhook =
    "https://discord.com/api/webhooks/1253467404093362330/OTY1gXsST6iBZJX1oMkkygCduPxzUnYOGMlTILa2tImhNMm1Z93Gn0DMBzkLpy3s0aG6";

  try {
    await axios.post(visitWebhook, JSON.parse(event.body));
    return {
      statusCode: 200,
      body: "Webhook message sent successfully",
    };
  } catch (error) {
    console.error("Failed to send webhook message:", error);
    return {
      statusCode: 500,
      body: "Failed to send webhook message",
    };
  }
};
