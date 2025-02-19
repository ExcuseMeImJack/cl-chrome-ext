async function decryptData(encryptedData, iv) {
  const key = JSON.parse(sessionStorage.getItem("encryptionKey"));
  const ivArray = new Uint8Array(JSON.parse(sessionStorage.getItem("encryptionIV")));

  if (!key) throw new Error("Encryption key not found. Restart extension.");

  const cryptoKey = await crypto.subtle.importKey(
    "jwk",
    key,
    { name: "AES-GCM" },
    true,
    ["decrypt"]
  );

  const decryptedData = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivArray },
    cryptoKey,
    new Uint8Array(encryptedData)
  );

  return new TextDecoder().decode(decryptedData);
}

// Fetch API key securely
export async function getAPIKey() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("GEMINI_API_KEY", async (data) => {
      if (!data.GEMINI_API_KEY) return reject("API Key not found.");

      try {
        const apiKey = await decryptData(data.GEMINI_API_KEY.encrypted, data.GEMINI_API_KEY.iv);
        resolve(apiKey);
      } catch (error) {
        reject("Decryption failed: " + error.message);
      }
    });
  });
}


import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getAIResponse(prompt) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("GEMINI_API_KEY", async (data) => {
      if (!data.GEMINI_API_KEY) {
        return reject("API Key not found.");
      }

      const genAI = new GoogleGenerativeAI(data.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      try {
        const result = await model.generateContent(prompt);
        resolve(result.response.text());
      } catch (error) {
        reject(error);
      }
    });
  });
}
