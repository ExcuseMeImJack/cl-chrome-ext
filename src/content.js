import { getAIResponse } from "./geminiAPI";

document.addEventListener("mouseup", async () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    const response = await getAIResponse(`Explain: ${selectedText}`);
    alert(`AI Response: ${response}`);
  }
});
