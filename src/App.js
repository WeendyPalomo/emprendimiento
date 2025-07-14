// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import NewChat from './components/NewChat';
import Explore from './components/Explore';
import { LanguageProvider, useLanguage } from './components/Traductor';
import { ChatLanguageProvider } from './components/TraductorChat';
import './App.css';

const AppContent = () => {
  const { toggleLanguage, translations } = useLanguage(); // Obtenemos toggle y textos traducidos

  return (
    <div className="app-container">
      <Sidebar />

      <div className="content-area">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/new-chat"
            element={
              <ChatLanguageProvider>
                <NewChat />
              </ChatLanguageProvider>
            }
          />
          <Route path="/explore" element={<Explore />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  const basename =
    process.env.NODE_ENV === 'production' ? '/emprendimiento/' : '/';

  return (
    // Aquí se provee el contexto de idioma a toda la app
    <LanguageProvider>
      <Router basename='/'>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;
