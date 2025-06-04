// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Menú Legal</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/"> {/* Enlace a la HomePage */}
            <span>🏠 Inicio</span>
          </Link>
        </li>
        <li>
          <Link to="/new-chat">
            <span>💬 Nuevo Chat</span>
          </Link>
        </li>
        <li>
          <Link to="/search-chats">
            <span>🔍 Buscar Chats</span>
          </Link>
        </li>
        <li>
          <Link to="/explore">
            <span>✨ Explorar</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;