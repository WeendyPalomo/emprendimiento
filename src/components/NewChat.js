// src/components/NewChat.js
import React, { useState, useEffect, useRef } from 'react';
import './ContentArea.css';
import './NewChat.css'; // Create this new CSS file for chat-specific styles

import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function NewChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false); // New state for typing indicator
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchKnowledgeBase = async () => {
      const querySnapshot = await getDocs(collection(db, 'preguntasFrecuentes'));
      const data = querySnapshot.docs.map(doc => doc.data());
      setKnowledgeBase(data);
      setMessages([{ sender: 'bot', text: '¡Hola! Soy tu asistente legal rural. Pregúntame sobre derechos territoriales, agua, o conflictos vecinales.' }]);
    };
    fetchKnowledgeBase();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]); // Add isBotTyping to dependencies

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = input.trim();
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: userMessage }]);
    setInput('');

    setIsBotTyping(true); // Show typing indicator

    setTimeout(() => {
      const botResponse = findBotResponse(userMessage);
      setIsBotTyping(false); // Hide typing indicator
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botResponse }]);
    }, 1500); // Simulate typing delay (e.g., 1.5 seconds)
  };

  const findBotResponse = (userQuery) => {
    const lowerCaseQuery = userQuery.toLowerCase();
    let bestMatch = 'Lo siento, no pude encontrar una respuesta a eso. Por favor, reformula tu pregunta o intenta con otras palabras clave.';

    for (const item of knowledgeBase) {
      if (item.keywords && Array.isArray(item.keywords)) {
          const keywords = item.keywords.map(kw => kw.toLowerCase());
          if (keywords.some(keyword => lowerCaseQuery.includes(keyword))) {
              bestMatch = item.respuesta;
              break;
          }
      }
    }
    return bestMatch;
  };

  return (
    <div className="content-section chat-section full-height"> {/* Added full-height */}
      <h2>Asistente Legal</h2>
      <div className="chat-window">
        <div className="messages-display">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))}
          {isBotTyping && ( // Display typing indicator if bot is typing
            <div className="message bot typing-indicator">
              <p>...</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage} className="message-input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta legal..."
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default NewChat;