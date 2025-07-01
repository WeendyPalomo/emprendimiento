// src/components/NewChat.js
import React, { useState, useEffect, useRef } from 'react';
import './ContentArea.css';
import './NewChat.css';

import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useLanguage } from './Traductor';
import { useChatLanguage } from './TraductorChat';

function NewChat() {
  const { language } = useLanguage();
  const { translations } = useChatLanguage();

  const [messages, setMessages] = useState([
    { sender: 'bot', type: 'initialBotMessage' } // guardamos tipo, no texto literal
  ]);
  const [input, setInput] = useState('');
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Cargar base de conocimiento una vez
  useEffect(() => {
    const fetchKnowledgeBase = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'preguntasFrecuentes'));
        const data = querySnapshot.docs.map(doc => doc.data());
        setKnowledgeBase(data);
      } catch (error) {
        console.error('Error fetching knowledge base:', error);
      }
    };
    fetchKnowledgeBase();
  }, []);

  // Scroll al final siempre que cambien mensajes o bot escribiendo
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

  const findBotResponse = (userQuery) => {
    const lowerCaseQuery = userQuery.toLowerCase();
    let bestMatch = translations.noAnswer;

    for (const item of knowledgeBase) {
      if (item.keywords && Array.isArray(item.keywords)) {
        const keywords = item.keywords.map(kw => kw.toLowerCase());
        if (keywords.some(keyword => lowerCaseQuery.includes(keyword))) {
          if (typeof item.respuesta === 'object') {
            bestMatch = item.respuesta[language] || translations.noAnswer;
          } else {
            bestMatch = item.respuesta;
          }
          break;
        }
      }
    }
    return bestMatch;
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsBotTyping(true);

    setTimeout(() => {
      const botResponse = findBotResponse(userMessage);
      setIsBotTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    }, 1500);
  };

  return (
    <div className="content-section chat-section full-height">
      <h2>{language === 'es' ? 'Asistente Legal' : 'Kamachiy Yanapak'}</h2>
      <div className="chat-window">
        <div className="messages-display">
          {messages.map((msg, idx) => {
            // Si es mensaje especial sin texto literal, mostramos traducción actual
            if (msg.type === 'initialBotMessage') {
              return (
                <div key={idx} className="message bot">
                  <p>{translations.initialBotMessage}</p>
                </div>
              );
            }
            // Mensajes normales con texto literal
            return (
              <div key={idx} className={`message ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            );
          })}
          {isBotTyping && (
            <div className="message bot typing-indicator">
              <p>{translations.typingIndicator}</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage} className="message-input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={translations.inputPlaceholder}
            autoComplete="off"
          />
          <button type="submit">{translations.sendButton}</button>
        </form>
      </div>
    </div>
  );
}

export default NewChat;
