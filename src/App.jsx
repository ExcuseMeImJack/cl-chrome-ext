import { useState } from "react";
import { getAIResponse } from "./geminiAPI";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleGenerate = async () => {
    const result = await getAIResponse(input);
    setResponse(result);
  };

  return (
    <div className="p-4 w-80">
      <h1 className="text-lg font-bold">Gemini AI Assistant</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
        className="border p-2 w-full mt-2"
      />
      <button onClick={handleGenerate} className="bg-blue-500 text-white px-4 py-2 mt-2">
        Generate
      </button>
      {response && <p className="mt-4">{response}</p>}
    </div>
  );
}

export default App;
