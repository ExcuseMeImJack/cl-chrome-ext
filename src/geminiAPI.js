import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getAIResponse(prompt) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("GEMINI_API_KEY", async (data) => {
      if (!data.GEMINI_API_KEY) {
        console.error("API Key not found.");
        return reject("API Key not found.");
      }

      // Log the API Key to make sure it's being retrieved correctly
      console.log("API Key retrieved:", data.GEMINI_API_KEY);

      const genAI = new GoogleGenerativeAI(data.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      try {
        // Make the request to generate content
        const result = await model.generateContent(prompt);
        // Log the result for debugging purposes
        console.log("Generated response:", result.response.text());
        resolve(result.response.text());
      } catch (error) {
        // Log the error if something goes wrong
        console.error("Error generating content:", error);
        reject(error);
      }
    });
  });
}
