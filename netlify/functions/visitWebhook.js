const axios = require('axios');

exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body);
      await axios.post('https://discord.com/api/webhooks/1253467404093362330/OTY1gXsST6iBZJX1oMkkygCduPxzUnYOGMlTILa2tImhNMm1Z93Gn0DMBzkLpy3s0aG6', data);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Webhook message sent successfully' }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to send webhook message' }),
      };
    }
  }
  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  };
};
