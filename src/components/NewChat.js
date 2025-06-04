// src/components/NewChat.js (Copiar y adaptar el contenido de tu App.js actual aquí)
import React, { useState, useEffect, useRef } from 'react';
import './ContentArea.css'; // Usaremos un CSS general para el contenido

// Asegúrate de que esta ruta sea correcta dependiendo de dónde está firebase.js
// Si firebase.js está en src/, y NewChat.js está en src/components/, entonces la ruta es '../firebase'
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function NewChat() { // <-- Cambiado de 'App' a 'NewChat'
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [knowledgeBase, setKnowledgeBase] = useState([]);
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
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = input.trim();
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: userMessage }]);
    setInput('');

    const botResponse = findBotResponse(userMessage);
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botResponse }]);
    }, 500);
  };

  const findBotResponse = (userQuery) => {
    const lowerCaseQuery = userQuery.toLowerCase();
    let bestMatch = 'Lo siento, no pude encontrar una respuesta a eso. Por favor, reformula tu pregunta o intenta con otras palabras clave.';

    for (const item of knowledgeBase) {
      // Asegúrate de que item.keywords exista y sea un array
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
    <div className="content-section chat-section"> {/* Añadimos clase 'chat-section' para estilos específicos */}
      <h2>Asistente Legal</h2> {/* Cambiado de <h1> a <h2> para consistencia con otras secciones */}
      <div className="chat-window">
        <div className="messages-display">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))}
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

export default NewChat; // <-- Cambiado de 'App' a 'NewChat'