const webhook = 'https://discord.com/api/webhooks/1253550568220266496/';

function sendWebhookMessage(buttonName) {
  const message = `Visitor Clicked on \`${buttonName}\``;
  const content = {
    content: message,
    username: '0ixe',
    avatar_url: 'https://i.ibb.co/rdjGy2H/ZZysfqr-ZZRed.png'
  };

  fetch(webhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  })
    .then(response => {
      if (!response.ok) {
        console.error('Failed to send webhook message:', response.status, response.statusText);
      } else {
        console.log('Webhook message sent successfully');
      }
    })
    .catch(error => {
      console.error('Error sending webhook message:', error);
    });
}

document.querySelectorAll('a.linkbutton').forEach(button => {
  button.addEventListener('click', async () => {
    const buttonName = button.textContent.trim();
    sendWebhookMessage(buttonName);
  });
});
    
