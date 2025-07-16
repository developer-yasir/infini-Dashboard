// Settings.jsx
import React, { useState, useEffect } from 'react';

function Settings({ username, setUsername, darkMode, setDarkMode }) {
  const [currency, setCurrency] = useState('AED');

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('app-settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      setCurrency(parsed.currency || 'AED');
    }
  }, []);

  // Save all settings to localStorage on change
  useEffect(() => {
    localStorage.setItem(
      'app-settings',
      JSON.stringify({ username, darkMode, currency })
    );
  }, [username, darkMode, currency]);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">⚙️ App Settings</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full rounded dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
        />
        <label className="text-sm">Enable Dark Mode</label>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Preferred Currency</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="border p-2 w-full rounded dark:bg-gray-800 dark:text-white"
        >
          <option value="AED">AED</option>
          <option value="USD">USD</option>
          <option value="PKR">PKR</option>
        </select>
      </div>
    </div>
  );
}

export default Settings;
