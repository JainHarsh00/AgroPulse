import React, { useState } from "react";
import Navbar from "../components/navbar"; // your navbar component
import { FiSend } from "react-icons/fi";
import "../style/ChatbotUI.css";

export default function ChatBotUI() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]); // store chat messages
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speechLang, setSpeechLang] = useState("en-US"); // default English
  const [speaking, setSpeaking] = useState(false);

  // Option 1: Use handleSuggestionClick
  const handleSuggestionClick = (text) => {
    setInputText(text);
  };

  // Check if inputText is not empty
  // const isInputEmpty = inputText.trim() === '';
  const isQueryVisible = inputText.trim() === "" && messages.length === 0;

  // Conditionally apply the CSS class
  // const queryBoxClass = isInputEmpty ||  isQueryVisible ? 'query-box' : 'query-box fade-out';
  // const suggestionsClass = isInputEmpty || isQueryVisible  ? 'suggestions' : 'suggestions fade-out';
  const queryBoxClass = isQueryVisible ? "query-box" : "query-box fade-out";
  const suggestionsClass = isQueryVisible
    ? "suggestions"
    : "suggestions fade-out";
  const glowCircleStyle = {
    opacity: isQueryVisible ? "1" : "0",
    transition: "opacity 0.5s ease",
  };
  // Send message to FastAPI
  const sendMessage = async () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    // Add user message
    setMessages((prev) => [...prev, { type: "user", text: trimmed }]);
    setInputText("");
    setLoading(true);

    try {
      const res = await fetch("/chat", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      // Add bot reply
      setMessages((prev) => [...prev, { type: "bot", text: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Send message on Enter key
  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter") sendMessage();
  // };

  // Speech to text thing
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = speechLang; // use selected language
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setInputText(speechResult);
    };

    recognition.onend = () => setListening(false);

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };
  };

  // Text to speech
  const speakText = (text, lang = speechLang) => {
    if (!window.speechSynthesis) {
      alert("Sorry, your browser does not support text-to-speech.");
      return;
    }

    // If already speaking, stop
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    // Otherwise start speaking
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => setSpeaking(false); // reset when finished
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="chatbot-container">
      {/* Navbar */}
      <div className="navbar-space">
        <Navbar />
      </div>

      {/* Center Content */}
      <div className="chat-center">
        <div className="glow-circle" style={glowCircleStyle}></div>
        <div className={queryBoxClass}>
          <span className="star">✦</span>
          <p>Ask your query</p>
        </div>

        {/* Chat messages */}
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.type === "user" ? "user" : "bot"}`}
            >
              <span>{msg.text}</span>

              {/* Only show listen button for bot replies */}
              {msg.type === "bot" && (
                <button
                  className="listen-btn"
                  onClick={() => speakText(msg.text)}
                >
                  {speaking ? "⏹ Stop" : "🔊 Listen"}
                </button>
              )}
            </div>
          ))}
          {loading && <div className="message bot">Typing...</div>}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="chat-bottom">
        <div className={suggestionsClass}>
          <button
            onClick={() => handleSuggestionClick("What can I ask you to do?")}
          >
            What can I ask you to do?
          </button>
          <button
            onClick={() =>
              handleSuggestionClick(
                "Which crop is performing the best in this season?"
              )
            }
          >
            Which crop is performing the best in this season?
          </button>
          <button
            onClick={() =>
              handleSuggestionClick(
                "What crops should I be concerned about right now?"
              )
            }
          >
            What crops should I be concerned about right now?
          </button>
        </div>

        <div className="chat-input-container">
          <div className="language-toggle">
            <label className="switch">
              <input
                type="checkbox"
                checked={speechLang === "hi-IN"}
                onChange={() =>
                  setSpeechLang(speechLang === "en-US" ? "hi-IN" : "en-US")
                }
              />
              <span className="slider round">
                {speechLang === "en-US" ? "English" : "Hindi"}
              </span>
            </label>
          </div>

          {listening && (
            <div className="listening-indicator">🎙 Listening...</div>
          )}

          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask me anything about your crops"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <button className="icon-btn" onClick={startListening}>
              🎤
            </button>
            <button className="icon-btn" onClick={sendMessage}>
              <FiSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
