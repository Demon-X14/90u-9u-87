const visitWebhook =
  "https://discord.com/api/webhooks/1253467404093362330/OTY1gXsST6iBZJX1oMkkygCduPxzUnYOGMlTILa2tImhNMm1Z93Gn0DMBzkLpy3s0aG6";
const buttonWebhook =
  "https://discord.com/api/webhooks/1253467538898157620/7itL4pvUKc0VE-UBiumT9VRcO40ZZFkcAq6rS1kWsYDcDZEDUDF1sIkggsz9ExQvXiSN";

// Function to send visit webhook message
function visitWebhookMessage(ipAddress) {
  const visitMessage = `Visitor's IP Address: ${ipAddress}`;

  const content = {
    content: visitMessage,
    username: "V",
    avatar_url: "https://0ixe.netlify.app/WImages/V-Circle-1.png", // Optional: You can customize the avatar
  };

  fetch(visitWebhook, {
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
  const buttonMessage = `Visitor Clicked on \`${buttonName}\` Button, IP Address: ${ipAddress}`;

  const content = {
    content: buttonMessage,
    username: "0ixe",
    avatar_url: "https://0ixe.netlify.app/WImages/V-Circle-1.png",
  };

  fetch(buttonWebhook, {
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

window.onload = async () => {
  const ipAddress = await getVisitorIPAddress();
  visitWebhookMessage(ipAddress);
};

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

document.querySelectorAll("a.linkbutton").forEach((button) => {
  button.addEventListener("click", async () => {
    const buttonName = button.textContent.trim();
    const ipAddress = await getVisitorIPAddress();
    buttonWebhookMessage(buttonName, ipAddress);
  });
});