// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import NewChat from './components/NewChat';
import Explore from './components/Explore';
import './App.css'; // Your main app styles

function App() {
  // Define el basename dinámicamente:
  // Cuando la aplicación se compila para producción (npm run build),
  // el basename será el nombre de tu repositorio.
  // En desarrollo (npm start), el basename será la raíz '/'.
  const basename = process.env.NODE_ENV === 'production'
    ? '/emprendimiento/' // ¡ACTUALIZADO: Este debe ser el nombre EXACTO de tu repositorio!
    : '/';

  return (
    // Pasa la propiedad 'basename' al componente Router
    <Router basename={basename}>
      <div className="app-container">
        <Sidebar />
        <div className="content-area">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/new-chat" element={<NewChat />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
