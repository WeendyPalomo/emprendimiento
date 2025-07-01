import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { useLanguage } from './Traductor'; // 👈 Importa el hook
import logo from '../assets/logoBorde.png';

function Sidebar() {
  const { translations } = useLanguage(); // 👈 Accede a traducciones

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>{translations.sidebarTitle}</h1>
        <p className="app-tagline">{translations.sidebarTagline}</p>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className="nav-icon">🏠</span> {translations.sidebarHome}
            </NavLink>
          </li>
          <li>
            <NavLink to="/new-chat" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className="nav-icon">💬</span> {translations.sidebarNewChat}
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className="nav-icon">✨</span> {translations.sidebarExplore}
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="sidebar-logo-container">
        <img src={logo} alt="Logo de la aplicación" className="sidebar-logo" />

      </div>
      <div className="sidebar-footer">
        <p>{translations.sidebarFooter}</p>
      </div>
    </div>
  );
}

export default Sidebar;
