chrome.runtime.onInstalled.addListener((info) => {
  if (info.reason === "install") {
    chrome.tabs.create({
      url: "welcome.html",
    });
  }
});
