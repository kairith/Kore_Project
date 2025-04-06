import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mic, Send, ThumbsUp, Copy, Volume2 } from "lucide-react";

const AiChatbot = () => {
  const [conversation, setConversation] = useState([]);
  const [question, setQuestion] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [botTypingText, setBotTypingText] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [conversation, botTypingText]);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userMessage = { type: "user", text: question };
    setConversation((prev) => [...prev, userMessage]);
    setQuestion("");
    setIsTyping(true);
    setBotTypingText(""); // Reset the bot's displayed message

    try {
      const res = await axios.post("http://localhost:8000/ask/", {
        question: question,
      });

      let botResponse = "⚠️ Sorry, I couldn't understand.";
      if (res.data && res.data.answer) {
        botResponse = res.data.answer;
      }

      // Simulate typing effect
      let currentText = "";
      let index = 0;

      const typingInterval = setInterval(() => {
        if (index < botResponse.length) {
          currentText += botResponse[index];
          setBotTypingText(currentText);
          index++;
        } else {
          clearInterval(typingInterval);
          setConversation((prev) => [
            ...prev,
            { type: "bot", text: botResponse },
          ]);
          setIsTyping(false);
        }
      }, 50); // Adjust typing speed here

    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error.message);
      setConversation((prev) => [
        ...prev,
        { type: "bot", text: "⚠️ AI is currently unavailable. Please try again later." },
      ]);
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 text-gray-900 p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-6 border border-pink-300">
        <h2 className="text-2xl font-semibold text-center text-pink-600 mb-4">🤰 MommyBot</h2>

        {/* Chat messages */}
        <div
          ref={chatRef}
          className="h-[500px] overflow-y-auto border border-pink-300 p-4 mb-4 rounded-lg bg-pink-50 space-y-3"
        >
          {conversation.length === 0 ? (
            <p className="text-gray-500 text-center">Start a conversation...</p>
          ) : (
            conversation.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start space-x-3 ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.type === "bot" && <span className="text-pink-400">🤖</span>}
                <div
                  className={`p-3 rounded-xl max-w-md shadow ${
                    msg.type === "user"
                      ? "bg-pink-300 text-white ml-auto"
                      : "bg-purple-200 text-gray-900 mr-auto"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.type === "user" && <span className="text-gray-600">🧑</span>}
                {msg.type === "bot" && (
                  <div className="flex space-x-2 text-gray-500 text-sm">
                    <ThumbsUp className="w-4 h-4 cursor-pointer hover:text-gray-700" />
                    <Copy className="w-4 h-4 cursor-pointer hover:text-gray-700" />
                    <Volume2 className="w-4 h-4 cursor-pointer hover:text-gray-700" />
                  </div>
                )}
              </motion.div>
            ))
          )}

          {/* Typing Effect */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mr-auto bg-purple-200 text-gray-900 p-3 rounded-lg max-w-xs flex items-center gap-2"
            >
              <span className="text-pink-400">🤖</span>
              <span>{botTypingText || "..."}</span>
            </motion.div>
          )}
        </div>

        {/* Chat input */}
        <div className="flex items-center gap-2 bg-pink-100 p-3 rounded-lg border border-pink-300">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask MommyBot anything..."
            className="flex-1 bg-transparent text-gray-700 focus:outline-none placeholder-gray-500"
            onKeyDown={(e) => e.key === "Enter" && handleAsk()} // Send on Enter
          />
          <Mic className="w-5 h-5 text-pink-400 cursor-pointer hover:text-pink-600" />
          <button
            onClick={handleAsk}
            className="bg-pink-500 text-white px-3 py-2 rounded-full hover:bg-pink-600 transition shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChatbot;
