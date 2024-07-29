// Function to construct the webhook URL

const avatarURL = "https://0ixe.site/WImages/DSquared.png";
function getWebhookURL(endpoint) {
  // You can adjust this base URL as needed or use environment variables
  const baseURL = "http://localhost:3000";
  return `${baseURL}/${endpoint}`;
}

// Function to send visit webhook message
function visitWebhookMessage(ipAddress) {
  const visitMessage = `## Visitor's IP Address: ${ipAddress}
  ## Visited URL: ${getWebhookURL("visit-webhook")}`;

  const content = {
    content: visitMessage,
    username: "V",
    avatar_url: avatarURL,
  };

  fetch(getWebhookURL("visit-webhook"), {
    // Use dynamic URL
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

// Function to send button click webhook message
function buttonWebhookMessage(buttonName, ipAddress) {
  const buttonMessage = `## Visitor Clicked on \`${buttonName}\` Button, IP Address: ${ipAddress}`;

  const content = {
    content: buttonMessage,
    username: "0ixe",
    avatar_url: avatarURL,
  };

  fetch(getWebhookURL("button-webhook"), {
    // Use dynamic URL
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

// Function to retrieve visitor's IP address
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

// Load event to trigger visit webhook message
window.addEventListener("load", async () => {
  const ipAddress = await getVisitorIPAddress();
  visitWebhookMessage(ipAddress);
});

// Event listeners for preventing default actions
document.onkeydown = function (e) {
  if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
    e.preventDefault();
    showAlert();
  }
};

window.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

window.addEventListener("keydown", function (e) {
  if (
    (e.ctrlKey && e.shiftKey && e.key === "I") ||
    (e.ctrlKey && e.shiftKey && e.key === "i")
  ) {
    e.preventDefault();
  }
});

window.addEventListener("keydown", function (e) {
  if (
    (e.ctrlKey && e.shiftKey && e.key === "c") ||
    (e.ctrlKey && e.shiftKey && e.key === "C")
  ) {
    e.preventDefault();
  }
});

window.addEventListener("keydown", function (e) {
  if ((e.ctrlKey && e.key === "S") || (e.ctrlKey && e.key === "s")) {
    e.preventDefault();
  }
});

// Event listener for button clicks
document.querySelectorAll("a.linkbutton").forEach((button) => {
  button.addEventListener("click", async () => {
    const buttonName = button.textContent.trim();
    const ipAddress = await getVisitorIPAddress();
    buttonWebhookMessage(buttonName, ipAddress);
  });
});
