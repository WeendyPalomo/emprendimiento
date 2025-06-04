// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ContentArea.css'; // Usará estilos generales de contenido
import './HomePage.css'; // Nuevos estilos específicos para la Home

function HomePage() {
  return (
    <div className="content-section home-page-section">
      <h2>¡Bienvenido a tu Asistente Legal Rural!</h2>
      <p>
        Aquí encontrarás apoyo y orientación sobre temas legales relevantes para las comunidades rurales, especialmente en la zona de **Chugchilán, Cantón Sigchos, Provincia de Cotopaxi, Ecuador**.
      </p>
      <p>
        Nuestro objetivo es brindarte información accesible sobre derechos territoriales, uso del agua, conflictos vecinales, temas de familia, trabajo y más.
      </p>
      <div className="home-actions">
        <p>Puedes empezar:</p>
        <Link to="/new-chat" className="action-button primary">
          💬 Iniciar un Nuevo Chat
        </Link>
        <Link to="/explore" className="action-button secondary">
          ✨ Explorar Temas Legales
        </Link>
      </div>
      <p>
        Utiliza el menú lateral para navegar entre las diferentes secciones. ¡Estamos aquí para ayudarte!
      </p>
    </div>
  );
}

export default HomePage;