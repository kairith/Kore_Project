import React, { useState, useEffect, useRef, useContext } from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import { motion } from "framer-motion";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { SlLike } from "react-icons/sl";

const ChatBotUI = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Conversation History State: each conversation has an id, createdAt, and messages
    const [allConversations, setAllConversations] = useState(() => {
        const stored = localStorage.getItem("chatHistory");
        return stored ? JSON.parse(stored) : [];
    });
    const [activeConversationId, setActiveConversationId] = useState(null);

    // UI States
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [botTypingText, setBotTypingText] = useState("");
    const [showSidebar, setShowSidebar] = useState(false);

    const chatContainerRef = useRef(null);

    // Scroll to bottom when active conversation changes or when bot is typing
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [allConversations, activeConversationId, botTypingText]);

    // Redirect if not authenticated
    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    // On mount: load or create an active conversation
    useEffect(() => {
        if (allConversations.length > 0) {
            setActiveConversationId(allConversations[allConversations.length - 1].id);
        } else {
            createNewConversation();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Save conversations to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("chatHistory", JSON.stringify(allConversations));
    }, [allConversations]);

    // Create a new conversation
    const createNewConversation = () => {
        const newConv = {
            id: Date.now(), // or use a UUID if you prefer
            createdAt: new Date(),
            messages: []
        };
        setAllConversations((prev) => [...prev, newConv]);
        setActiveConversationId(newConv.id);
    };

    // Add a message (user or bot) to the active conversation
    const addMessageToActiveConv = (message) => {
        if (!activeConversationId) return;
        setAllConversations((prev) =>
            prev.map((conv) =>
                conv.id === activeConversationId
                    ? { ...conv, messages: [...conv.messages, message] }
                    : conv
            )
        );
    };

    // Delete a conversation by ID (with confirmation)
    const handleDeleteConversation = (convId) => {
        if (window.confirm("Are you sure you want to delete this conversation?")) {
            setAllConversations((prev) => {
                const updated = prev.filter((c) => c.id !== convId);
                if (activeConversationId === convId) {
                    if (updated.length > 0) {
                        setActiveConversationId(updated[updated.length - 1].id);
                    } else {
                        setActiveConversationId(null);
                    }
                }
                return updated;
            });
        }
    };

    // Helper: copy text to clipboard
    const copyText = (text) => {
        navigator.clipboard.writeText(text).then(
            () => {
                alert("Copied to clipboard!");
            },
            () => {
                alert("Failed to copy!");
            }
        );
    };


    // Handle sending a message
    const handleSendMessage = async () => {
      if (!inputValue.trim()) return;
      if (!user) return; // Additional protection

      // 1. Add user message to active conversation
      const userMessage = { sender: "user", text: inputValue, time: new Date() };
      addMessageToActiveConv(userMessage);

      // Optionally, clear the input right away:
      setInputValue("");

      setIsTyping(true);
      setBotTypingText("");

      try {
          // 2. Send question to backend
          const res = await axios.post("http://localhost:8000/ask/", {
              question: inputValue,
          });

          let botResponse = "⚠️ សុំទោស, មិនមានក្នុងទិន្នន័យ.";
          if (res.data && res.data.answer) {
              botResponse = res.data.answer;
          }

          // 3. Use a typewriter effect to show the bot's response
          let currentText = "";
          let index = 0;
          const typingInterval = setInterval(() => {
              if (index < botResponse.length) {
                  currentText += botResponse[index];
                  setBotTypingText(currentText);
                  index++;
              } else {
                  clearInterval(typingInterval);
                  // 4. Add the complete bot message to the active conversation
                  const botMessage = { sender: "bot", text: botResponse, time: new Date() };
                  addMessageToActiveConv(botMessage);
                  setIsTyping(false);
                  setBotTypingText("");
              }
          }, 50);
      } catch (error) {
          console.error(
              "API Error:",
              error.response ? error.response.data : error.message
          );
          const errorMessage = "⚠️ បច្ចុប្បន្ន AI មិនអាចប្រើបានទេ។ សូមព្យាយាមម្តងទៀតនៅពេលក្រោយ។";
          const botMessage = { sender: "bot", text: errorMessage, time: new Date() };
          addMessageToActiveConv(botMessage);
          setIsTyping(false);
      }
  };

  // 11) Active Conversation
  const activeConversation = allConversations.find(
      (conv) => conv.id === activeConversationId
  );

  // 12) Rendering
return (
  <div className="flex h-screen bg-white pt-16">
    {/* Sidebar */}
    <div
      className={`transition-transform duration-300 ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      } w-64 bg-blue-500 text-white p-5 flex flex-col h-[calc(100vh-4rem)] fixed ${
        window.innerWidth <= 768
          ? "top-0 left-0 h-full z-50 rounded-r-xl"
          : "top-18 left-0 shadow-lg"
      }`}
    >
      {/* Heading + New Conversation Button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">ការសន្ទនាទាំងអស់</h2>
        <button
          onClick={createNewConversation}
          className="transition duration-300 hover:bg-sky-400 text-white px-3 py-2 rounded-sm cursor-pointer"
        >
          <IoCreateOutline />
        </button>
      </div>


      <div className="flex-1 overflow-y-auto">
          <ul className="space-y-3 font-regular">
            {allConversations.map((conv) => (
              <li
                key={conv.id}
                className={`p-2 rounded-lg hover:bg-blue-400 flex items-center justify-between ${
                  conv.id === activeConversationId ? "bg-blue-400" : ""
                }`}
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => setActiveConversationId(conv.id)}
                >
                  {conv.messages[0]
                    ? conv.messages[0].text.slice(0, 20) + "..."
                    : "ការសន្ទនា​ថ្មី"}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteConversation(conv.id);
                  }}
                  className="ml-2 text-white hover:text-red-600"
                >
                  <BsThreeDots />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="flex items-center cursor-pointer p-2 rounded-lg duration-200 transition hover:bg-blue-400"
          onClick={() => setShowSidebar(false)}
        >
          <IoIosArrowRoundBack className="text-lg" />
          <span className="ml-2 text-md font-regular">បិទប្រវត្តិ</span>
        </div>
      </div>

      {!showSidebar && (
        <div
          className="fixed bottom-4 left-0 p-4 bg-blue-500 text-white rounded-r-lg cursor-pointer flex items-center space-x-2"
          onClick={() => setShowSidebar(true)}
        >
          <span className="font-regular">បើកប្រវត្តិ</span>
          <IoIosArrowRoundForward className="text-xl" />
        </div>
      )}

      {/* Main Chat Section */}
      <div
        className={`flex flex-col items-center justify-center flex-1 text-black transition-all duration-300 ${
          window.innerWidth > 768 ? "ml-64 p-6" : "p-6"
        }`}
      >
        <div
          ref={chatContainerRef}
          className="w-2/3 py-4 sm:p-4 text-black mb-6 min-h-[200px] flex flex-col space-y-2 overflow-y-auto max-h-[400px]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {activeConversation &&
            activeConversation.messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-end space-x-2 p-3 rounded-lg max-w-xs sm:max-w-sm md:max-w-md font-regular ${
                  msg.sender === "user"
                    ? "self-end flex-row-reverse"
                    : "self-start"
                }`}
              >
                <span className="text-2xl">
                  {msg.sender === "user" ? "👩" : "🤖"}
                </span>
                <div
                  className={`p-3 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                  {msg.sender === "bot" && (
                    <div className="flex space-x-2 mt-2">
                      <IoCopyOutline
                        className="w-5 h-5 cursor-pointer hover:text-gray-600"
                        onClick={() => copyText(msg.text)}
                      />
                      <HiOutlineSpeakerWave
                        className="w-5 h-5 cursor-pointer hover:text-gray-600"
                        onClick={() => {
                          const utterance = new SpeechSynthesisUtterance(msg.text);
                          window.speechSynthesis.speak(utterance);
                        }}
                      />
                      <SlLike
                        className="w-5 h-5 cursor-pointer hover:text-gray-600"

                        onClick={() => alert("You liked this response!")}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-end space-x-2 p-3 rounded-lg max-w-xs sm:max-w-sm md:max-w-md font-regular self-start"
            >
              <span className="text-2xl">🤖</span>
              <div className="p-3 rounded-lg bg-gray-200 text-black">
                {botTypingText}
              </div>
            </motion.div>
          )}
        </div>

        {!activeConversation?.messages?.length && !isTyping && (
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6">
            តើប្រធានបទអ្វីដែលម៉ាក់ៗចង់ស្វែងយល់?
          </h1>
        )}

        <div className="bg-zinc-100 py-3 sm:p-4 rounded-xl w-2/3 flex items-center justify-between">
          <input
            type="text"
            className="bg-transparent border-none outline-none text-black px-2 flex-grow font-regular"
            placeholder="សរសេរសំណួររបស់អ្នក..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="p-2 bg-sky-400 rounded-full"
            onClick={handleSendMessage}
          >
            <MdKeyboardArrowRight className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotUI;
