// Reports.jsx
import React, { useEffect, useState } from 'react';

function Reports({ products }) {
  const [currency, setCurrency] = useState('AED');

  useEffect(() => {
    const saved = localStorage.getItem('app-settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      setCurrency(parsed.currency || 'AED');
    }
  }, []);

  const totalValue = products.reduce(
    (acc, p) => acc + Number(p.price) * Number(p.quantity),
    0
  );

  const outOfStock = products.filter((p) => Number(p.quantity) === 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🧾 Inventory Reports</h2>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg text-center">
          <p className="text-sm text-gray-500 dark:text-gray-300">Total Products</p>
          <h3 className="text-xl font-semibold">{products.length}</h3>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg text-center">
          <p className="text-sm text-gray-500 dark:text-gray-300">Total Inventory Value</p>
          <h3 className="text-xl font-semibold">
            {currency} {totalValue.toLocaleString()}
          </h3>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg text-center">
          <p className="text-sm text-gray-500 dark:text-gray-300">Out of Stock</p>
          <h3 className="text-xl font-semibold">{outOfStock.length}</h3>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2">🚫 Out of Stock Items</h3>
        {outOfStock.length === 0 ? (
          <p className="text-green-600">All products are in stock ✅</p>
        ) : (
          <ul className="list-disc pl-6 text-red-600">
            {outOfStock.map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Reports;
