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
