// src/components/Explore.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa Link para el botón de navegación
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './ContentArea.css';
import './Explore.css';

function Explore() {
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Define la información de Chugchilán para los consejos
  const chugchilanInfo = {
    tierra: "En Chugchilán, los derechos sobre la tierra a menudo se entrelazan con las costumbres ancestrales y la propiedad comunitaria. Es vital conocer la Ley de Tierras Rurales y Territorios Ancestrales para la regularización y protección de la propiedad. En caso de conflictos, la mediación comunitaria es una primera instancia clave.",
    familia: "Las dinámicas familiares en Chugchilán pueden tener particularidades culturales. Los temas de matrimonio, uniones de hecho, herencias y custodia de menores se rigen por el Código Civil y de la Niñez y Adolescencia. Se recomienda buscar el diálogo y, si es necesario, acudir a las Tenencias Políticas o Juntas Parroquiales.",
    trabajo: "Las condiciones laborales en zonas rurales como Chugchilán varían. Es importante conocer los derechos del trabajador establecidos en el Código del Trabajo de Ecuador, incluso para labores agrícolas o artesanales. La seguridad social y los contratos justos son aspectos a considerar. La Oficina de Trabajo puede brindar asesoría.",
    violencia: "La violencia de cualquier tipo es inaceptable. En Chugchilán, como en todo el Ecuador, existen leyes para proteger a las víctimas de violencia intrafamiliar y de género. No dudes en denunciar. Puedes acudir a la Policía Nacional, Juntas Cantonales de Protección de Derechos, o la Fiscalía. Hay organizaciones que brindan apoyo psicológico y legal.",
    chat: "Este es el módulo de chat principal donde puedes hacer tus preguntas directamente al asistente legal. Utiliza palabras clave para obtener respuestas rápidas sobre cualquier tema legal relevante para Chugchilán."
  };

  useEffect(() => {
    const loadedCategories = [
      { id: 'tierra', name: 'Tierra', icon: '🌳' },
      { id: 'familia', name: 'Familia', icon: '🏠' },
      { id: 'trabajo', name: 'Trabajo', icon: '🤝' },
      { id: 'violencia', name: 'Violencia', icon: '❌' },
      { id: 'chat', name: 'Chat', icon: '💬' }, // La categoría 'chat'
    ];
    setCategories(loadedCategories);
  }, []);

  const handleCategoryClick = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="content-section explore-section">
      <h2>Explorar Temas Legales en Chugchilán</h2>
      <p>Aquí encontrarás información y consejos básicos sobre temas legales relevantes para la comunidad rural de Chugchilán, Sigchos, Cotopaxi, Ecuador.</p>
      <div className="category-cards">
        {categories.map(category => (
          <div
            key={category.id}
            className={`category-card ${expandedCategory === category.id ? 'expanded' : ''}`} // Añade clase 'expanded'
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="card-header">
              <span className="card-icon">{category.icon}</span>
              <h3>{category.name}</h3>
              <span className="expand-icon">{expandedCategory === category.id ? '▲' : '▼'}</span>
            </div>
            {expandedCategory === category.id && (
              <div className="card-content">
                <p>{chugchilanInfo[category.id] || "No hay información disponible para esta categoría aún."}</p>
                {/* AÑADIR EL BOTÓN 'IR AL CHAT' SÓLO EN LA TARJETA DE CHAT */}
                {category.id === 'chat' && (
                  <div className="chat-button-container">
                    <Link to="/new-chat" className="go-to-chat-button">
                      Ir al Chat
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