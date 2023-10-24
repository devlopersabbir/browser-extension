const extensions = "https://developer.chrome.com/docs/extensions";
const webstore = "https://developer.chrome.com/docs/webstore";

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
    const prevState = await chrome.action.setBadgeText({
      tabId: tab.id,
    });
    const nextState = prevState === "ON" ? "OFF" : "ON";
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    // check
    if (nextState === "ON") {
      await chrome.scripting.insertCSS({
        files: ["focus-mode.css"],
        target: {
          tabId: tab.id,
        },
      });
    } else if (nextState === "OFF") {
      await chrome.scripting.removeCSS({
        files: ["focus-mode.css"],
        target: {
          tabId: tab.id,
        },
      });
    }
  }
});
