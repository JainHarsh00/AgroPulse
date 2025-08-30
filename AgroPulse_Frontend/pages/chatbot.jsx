import React, { useState } from 'react';
import Navbar from "../components/navbar"// your navbar component
import { FiSend } from "react-icons/fi";
import { FaMicrophone } from "react-icons/fa";
import "../style/ChatbotUI.css"

export default function ChatBotUI() {
  const [inputText, setInputText] = useState('');

  const handleSuggestionClick = (text) => {
    setInputText(text);
  };

  // Check if inputText is not empty
  const isInputEmpty = inputText.trim() === '';

  // Conditionally apply the CSS class
  const queryBoxClass = isInputEmpty ? 'query-box' : 'query-box fade-out';
  const suggestionsClass = isInputEmpty ? 'suggestions' : 'suggestions fade-out';
  return (
    <div className="chatbot-container">
      {/* Navbar */}
      <div className="navbar-space">
        <Navbar />
      </div>

      {/* Center Content */}
      <div className="chat-center">
        <div className="glow-circle" style={{opacity: isInputEmpty ? '1' : '0', transition: 'opacity 0.5s ease'}}></div>
        <div className={queryBoxClass}>
          <span className="star">✦</span>
          <p>Ask your query</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="chat-bottom">
        <div className={suggestionsClass}>
          <button onClick={() => handleSuggestionClick("What can I ask you to do?")}>
            What can I ask you to do?
          </button>
          <button onClick={() => handleSuggestionClick("Which crop is performing the best in this season?")}>
            Which crop is performing the best in this season?
          </button>
          <button onClick={() => handleSuggestionClick("What crops should I be concerned about right now?")}>
            What crops should I be concerned about right now?
          </button>
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Ask me anything about your crops"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="icon-btn">🎤</button>
          <button className="icon-btn">➤</button>
        </div>
      </div>
    </div>
  );
}
