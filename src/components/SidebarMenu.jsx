// SidebarMenu.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Overview from '../pages/Overview';
import Inventory from '../pages/Inventory';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';

function SidebarMenu() {
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Load products from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('inventory-products');
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  // Save products to localStorage
  useEffect(() => {
    localStorage.setItem('inventory-products', JSON.stringify(products));
  }, [products]);

  // Load settings from localStorage
  useEffect(() => {
    const settings = localStorage.getItem('app-settings');
    if (settings) {
      const parsed = JSON.parse(settings);
      setUsername(parsed.username || '');
      setDarkMode(parsed.darkMode || false);
    }
  }, []);

  // Sync dark mode class with document body
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div className={`dashboard ${darkMode ? 'dark' : ''}`}>
        {/* Sidebar */}
        <div className="dashboard-left-side">
          <nav className="menu-main-container">
            <h2 className="nav-logo">Infinni Dashboard</h2>
            <ul className="menu-main">
              <li className="menu-item"><Link to="/">Overview</Link></li>
              <li className="menu-item"><Link to="/inventory">Inventory</Link></li>
              <li className="menu-item"><Link to="/reports">Reports</Link></li>
              <li className="menu-item"><Link to="/settings">Settings</Link></li>
            </ul>
          </nav>
        </div>

        {/* Content */}
        <div className="dashboard-right-side">
          {/* Top Bar */}
          <div className="p-4 border-b bg-white dark:bg-gray-800 flex justify-between text-sm text-gray-700 dark:text-gray-100">
            <span>Welcome, <strong>{username || 'Guest'}</strong> 👋</span>
            {/* <span className="text-xs">{darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>  */}
          </div>

          <Routes>
            <Route path="/" element={<Overview products={products} />} />
            <Route path="/inventory" element={<Inventory products={products} setProducts={setProducts} />} />
            <Route path="/reports" element={<Reports products={products} />} />
            <Route path="/settings" element={<Settings username={username} setUsername={setUsername} darkMode={darkMode} setDarkMode={setDarkMode} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default SidebarMenu;