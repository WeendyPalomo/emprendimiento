// src/components/Explore.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './Traductor'; // ✅ Importar el contexto de traducción
import './ContentArea.css';
import './Explore.css';

function Explore() {
  const { translations } = useLanguage(); // ✅ Usar las traducciones del contexto
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    const loadedCategories = [
      { id: 'tierra', name: translations.tierra, icon: '🌳' },
      { id: 'familia', name: translations.familia, icon: '🏠' },
      { id: 'trabajo', name: translations.trabajo, icon: '🤝' },
      { id: 'violencia', name: translations.violencia, icon: '❌' },
      { id: 'chat', name: translations.chat, icon: '💬' },
    ];
    setCategories(loadedCategories);
  }, [translations]); // ✅ Se vuelve a ejecutar cuando cambia el idioma

  const handleCategoryClick = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="content-section explore-section">
      <h2>{translations.explorePageTitle}</h2>
      <p>{translations.explorePageDescription}</p>

      <div className="category-cards">
        {categories.map(category => (
          <div
            key={category.id}
            className={`category-card ${expandedCategory === category.id ? 'expanded' : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="card-header">
              <span className="card-icon">{category.icon}</span>
              <h3>{category.name}</h3>
              <span className="expand-icon">{expandedCategory === category.id ? '▲' : '▼'}</span>
            </div>

            {expandedCategory === category.id && (
              <div className="card-content">
                <p>{translations[`${category.id}Info`] || translations.noInfo}</p>

                {category.id === 'chat' && (
                  <div className="chat-button-container">
                    <Link to="/new-chat" className="go-to-chat-button">
                      {translations.exploreGoToChat}
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
