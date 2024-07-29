const axios = require('axios');

exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body);
      await axios.post('https://discord.com/api/webhooks/1253467538898157620/7itL4pvUKc0VE-UBiumT9VRcO40ZZFkcAq6rS1kWsYDcDZEDUDF1sIkggsz9ExQvXiSN', data);
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
