import { useState } from "react";

function ChatbotJson() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [matchedKeyword, setMatchedKeyword] = useState("");

  const fetchAnswer = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/chatbot/?question=${encodeURIComponent(question)}`);
      if (!response.ok) throw new Error("⚠️ No matching keyword found!");

      const data = await response.json();
      setAnswer(data.answer);
      setMatchedKeyword(data.matched_keyword);
    } catch (error) {
      setAnswer("⚠️ No matching keyword found!");
      setMatchedKeyword("");
    }
  };

  return (
    <div>
      <h2>🤖 Pregnancy Chatbot</h2>
      <input 
        type="text" 
        placeholder="Ask a question..." 
        value={question} 
        onChange={(e) => setQuestion(e.target.value)} 
      />
      <button onClick={fetchAnswer}>Ask</button>

      {answer && (
        <div>
          <h3>💡 Matched Keyword: {matchedKeyword}</h3>
          <p>📝 Answer: {answer}</p>
        </div>
      )}
    </div>
  );
}

export default ChatbotJson;
