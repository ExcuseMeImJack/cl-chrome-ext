async function encryptData(data) {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(data);

  const key = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encryptedData = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encodedData
  );

  // Store the key and IV in session storage (not persistent)
  sessionStorage.setItem("encryptionKey", JSON.stringify(await crypto.subtle.exportKey("jwk", key)));
  sessionStorage.setItem("encryptionIV", JSON.stringify(Array.from(iv)));

  return { encrypted: Array.from(new Uint8Array(encryptedData)), iv: Array.from(iv) };
}

// Store the encrypted API key
chrome.runtime.onInstalled.addListener(async () => {
  const apiKey = import.meta.env.GEMINI_API_KEY;
  const encrypted = await encryptData(apiKey);
  chrome.storage.sync.set({ GEMINI_API_KEY: encrypted });
});
