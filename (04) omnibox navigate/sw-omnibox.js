const URL_CHROME_EXTENSIONS_DOC =
  "https://developer.chrome.com/docs/extensions/reference/";
const NUMBER_OF_PREVIOUS_SEARCHES = 4;

// Display the suggestions after user starts typing
chrome.omnibox.onInputChanged.addListener(async (input, suggest) => {
  console.log("input: ", input);
  await chrome.omnibox.setDefaultSuggetion({
    description: "Enter a Chrome API or choose from past searches",
  });
  const { apiSuggestions } = await chrome.storage.local.get("apiSuggestions");
  const suggestions = apiSuggestions.map((api) => {
    return {
      context: api,
      description: `Open chrome.${api} API`,
    };
  });
  suggest(suggestions);
});

// Open the reference page of the chosen API
chrome.omnibox.onInputEntered.addListener((input) => {
  chrome.tabs.create({
    url: URL_CHROME_EXTENSIONS_DOC + input,
  });
  // Save the latest keyword
  updateHistory(input);
});

// update history
async function updateHistory(input) {
  const { apiSuggestions } = await chrome.storage.local.get("apiSuggestions");
  apiSuggestions.unshift(input);
  apiSuggestions.splice(NUMBER_OF_PREVIOUS_SEARCHES);
  return chrome.storage.local.set({ apiSuggestions });
}
