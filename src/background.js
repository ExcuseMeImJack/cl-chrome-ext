async function fetchAPIKey() {
  try {
    const response = await fetch("https://us-central1-cl-chrome-ext.cloudfunctions.net/getSecret");
    const data = await response.json();
    return data.apiKey;
  } catch (error) {
    console.error("Failed to fetch API key:", error);
  }
}

chrome.runtime.onInstalled.addListener(async () => {
  const GEMINI_API_KEY = await fetchAPIKey();
  if (GEMINI_API_KEY) {
    chrome.storage.sync.set({ GEMINI_API_KEY }, () => {
      console.log("API Key stored securely!");
    });
  } else {
    console.error("Failed to store API Key.");
  }
});
