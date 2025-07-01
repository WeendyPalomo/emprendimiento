// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './Traductor'; // ✅ Importar el contexto de idioma
import './ContentArea.css';
import './HomePage.css';

function HomePage() {
  const { translations } = useLanguage(); // ✅ Obtener traducciones del contexto

  return (
    <div className="content-section home-page-section">
      <h2>{translations.homeTitle}</h2>
      <p>{translations.homeParagraph1}</p>
      <p>{translations.homeParagraph2}</p>

      <div className="home-actions">
        <p>{translations.homeStart}</p>
        <Link to="/new-chat" className="action-button primary">
          {translations.newChatButton}
        </Link>
        <Link to="/explore" className="action-button secondary">
          {translations.exploreButton}
        </Link>
      </div>

      <p>{translations.homeFooter}</p>
    </div>
  );
}

export default HomePage;
