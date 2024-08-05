const axios = require("axios");

const buttonWebhook = process.env.BUTTON_WEBHOOK_URL;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  try {
    const { buttonName, ipAddress, pageURL } = JSON.parse(event.body);

    const message = `## Visitor Clicked on \`${buttonName}\` Button
## Visitor's IP Address: ${ipAddress}
## Visited URL: ${pageURL}`;

    await axios.post(buttonWebhook, {
      content: message,
      username: "0ixe",
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
