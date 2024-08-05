const avatarURL = "https://0ixe.site/WImages/DSquared.png";

function getWebhookURL(endpoint) {
  const baseURL = "/.netlify/functions";
  return `${baseURL}/${endpoint}`;
}

async function getVisitorIPAddress() {
  try {
    const response = await fetch("https://api64.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Failed to fetch visitor IP address:", error);
    return "Unknown";
  }
}

async function buttonWebhookMessage(buttonName) {
  const ipAddress = await getVisitorIPAddress();
  const pageURL = window.location.href;

  const content = {
    buttonName,
    ipAddress,
    pageURL,
  };

  fetch(getWebhookURL("button-webhook"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  })
    .then((response) => {
      if (!response.ok) {
        console.error(
          "Failed to send webhook message:",
          response.status,
          response.statusText
        );
      } else {
        console.log("Webhook message sent successfully");
      }
    })
    .catch((error) => {
      console.error("Error sending webhook message:", error);
    });
}

document.querySelectorAll("a.linkbutton").forEach((button) => {
  button.addEventListener("click", async () => {
    const buttonName = button.textContent.trim();
    await buttonWebhookMessage(buttonName);
  });
});
