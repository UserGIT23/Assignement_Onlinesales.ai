import React, { useState } from 'react';
import './App.css';

// ChatBox component
const ChatBox = ({ id, messages, sendMessage, closeChatBox }) => {
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = () => {
    if (messageText.trim() !== '') {
      sendMessage(id, messageText);
      setMessageText('');
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.self ? 'self' : 'other'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <textarea
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <button className="close-button" onClick={() => closeChatBox(id)}>
        Close
      </button>
    </div>
  );
};

// ChatApp component
const ChatApp = () => {
  const [chatBoxes, setChatBoxes] = useState([]);

  const addChatBox = () => {
    const newChatBox = {
      id: Date.now(),
      messages: [],
    };
    setChatBoxes((prevChatBoxes) => [...prevChatBoxes, newChatBox]);
  };

  const sendMessage = (chatId, messageText) => {
    const updatedChatBoxes = chatBoxes.map((chatBox) => {
      if (chatBox.id === chatId) {
        return {
          ...chatBox,
          messages: [
            ...chatBox.messages,
            { text: messageText, self: true },
          ],
        };
      }
      return chatBox;
    });
    setChatBoxes(updatedChatBoxes);
  };

  const closeChatBox = (chatId) => {
    const updatedChatBoxes = chatBoxes.filter(
      (chatBox) => chatBox.id !== chatId
    );
    setChatBoxes(updatedChatBoxes);
  };

  return (
    <div className="chat-app">
      <button className="add-button" onClick={addChatBox}>
        Add Chat Box
      </button>
      <div className="chat-boxes">
        {chatBoxes.map((chatBox) => (
          <ChatBox
            key={chatBox.id}
            id={chatBox.id}
            messages={chatBox.messages}
            sendMessage={sendMessage}
            closeChatBox={closeChatBox}
          />
        ))}
      </div>
    </div>
  );
};

// App component
const App = () => {
  return (
    <div className="app">
      <ChatApp />
    </div>
  );
};

export default App;   