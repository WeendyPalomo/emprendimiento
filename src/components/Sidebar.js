// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import logo from '../assets/logoBorde.png';


function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Asistente Legal</h1>
        <p className="app-tagline">Chugchilán</p>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className="nav-icon">🏠</span> Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/new-chat" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className="nav-icon">💬</span> Nuevo Chat
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className="nav-icon">✨</span> Explorar Temas
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* Nueva imagen del logo */}
    
      <div className="sidebar-footer">
          <div className="sidebar-logo-container">
        <img src={logo} alt="Logo de la aplicación" className="sidebar-logo" />
      </div>
        <p>&copy; 2024 Legal AI</p>
      </div>
    </div>
  );
}

export default Sidebar;
