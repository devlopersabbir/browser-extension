chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.storage.local
      .set({
        apiSuggestions: ["tabs", "storage", "scripting"],
      })
      .then(() => console.log("successfully set"))
      .catch((er) => console.log("Fail to set", er));
  }
});

// Fetch tip & save in storage
const updateTip = async () => {
  const response = await fetch("https://extension-tips.glitch.me/tips.json");
  const tips = await response.json();
  const randomIndex = Math.floor(Math.random() * tips.length);
  return chrome.storage.local.set({ tip: tips[randomIndex] });
};

const ALARM_NAME = "tip";

async function createAlarm() {
  const alarm = await chrome.alarms.get(ALARM_NAME);
  if (!alarm) {
    chrome.alarm.create({
      delayInMinutes: 1,
      periodInMinutes: 1440,
    });
    updateTip();
  }
}

createAlarm();

// Update tip once a day
chrome.alarms.onAlarm.addListener(updateTip);
