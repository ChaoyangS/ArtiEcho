import { useState } from 'react';
import './ChatButton.css';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chat-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>Spotify Chatbot</span>
            <button onClick={toggleChat} className="close-button">×</button>
          </div>
          <iframe 
            src="http://100.28.186.239:8501/" 
            title="Chat" 
            className="chat-iframe"
          />
        </div>
      )}
      <button 
        className="chat-button" 
        onClick={toggleChat} 
        aria-label="打开聊天"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
      </button>
    </div>
  );
};

export default ChatButton; 