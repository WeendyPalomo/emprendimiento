// file: src/components/NewChat.js
import React, { useState, useEffect, useRef } from "react";
import "./ContentArea.css";
import "./NewChat.css";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { useLanguage } from "./Traductor";
import { useChatLanguage } from "./TraductorChat";

function NewChat() {
  const { language } = useLanguage();
  const { translations } = useChatLanguage();

  const [messages, setMessages] = useState([
    { sender: "bot", type: "initialBotMessage" },
  ]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotTyping]);

  // 🔒 Llama a tu backend de Firebase (functions) para obtener la respuesta
const fetchOpenAIResponse = async (userMessage) => {
  try {
    const response = await fetch(
        "https://chat-wbmnayb6oa-uc.a.run.app",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      }
    );

    if (!response.ok) {
      throw new Error("Error al contactar al asistente");
    }

    const data = await response.json();
    return data.answer;
  } catch (error) {
    console.error("❌ Error al consultar función Firebase:", error);
    return translations.noAnswer;
  }
};


  const registrarPreguntaPopular = async (pregunta) => {
    try {
      const preguntasRef = collection(db, "preguntasPopulares");
      const preguntaId = pregunta.toLowerCase().trim();
      const docRef = doc(preguntasRef, preguntaId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          frecuencia: docSnap.data().frecuencia + 1,
          ultimaFecha: new Date(),
        });
      } else {
        await setDoc(docRef, {
          texto: pregunta,
          frecuencia: 1,
          ultimaFecha: new Date(),
        });
      }
    } catch (error) {
      console.error("❌ Error guardando pregunta en Firestore:", error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setIsBotTyping(true);

    try {
      await registrarPreguntaPopular(userMessage);

      const botResponse = await fetchOpenAIResponse(userMessage);
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: translations.noAnswer },
      ]);
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <div className="content-section chat-section full-height">
      <h2>{language === "es" ? "Asistente Legal" : "Kamachiy Yanapak"}</h2>
      <div className="chat-window">
        <div className="messages-display">
          {messages.map((msg, idx) => {
            if (msg.type === "initialBotMessage") {
              return (
                <div key={idx} className="message bot">
                  <p>{translations.initialBotMessage}</p>
                </div>
              );
            }
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
