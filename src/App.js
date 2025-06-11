// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import SearchChats from './components/SearchChats';
import NewChat from './components/NewChat'; // Make sure this path is correct
import Explore from './components/Explore';
import './App.css'; // Your main app styles

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content-area">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/new-chat" element={<NewChat />} /> {/* Ensure NewChat is imported */}
            <Route path="/search-chats" element={<SearchChats />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="*" element={<h2>Página no encontrada</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;