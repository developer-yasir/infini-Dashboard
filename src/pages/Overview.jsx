// Overview.jsx
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const filterByDays = (products, days) => {
  const now = Date.now();
  const msInDay = 24 * 60 * 60 * 1000;
  return products.filter((p) => now - p.createdAt <= days * msInDay);
};

function Overview({ products }) {
  const [range, setRange] = useState(7);
  const [currency, setCurrency] = useState("AED");

  useEffect(() => {
    const saved = localStorage.getItem("app-settings");
    if (saved) {
      const parsed = JSON.parse(saved);
      setCurrency(parsed.currency || "AED");
    }
  }, []);

  const filtered = filterByDays(products, range);

  const totalProducts = filtered.length;
  const totalQuantity = filtered.reduce((acc, p) => acc + Number(p.quantity), 0);
  const totalValue = filtered.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const avgPrice = totalQuantity ? (totalValue / totalQuantity).toFixed(2) : 0;
  const outOfStock = filtered.filter((p) => p.quantity === 0);

  const recentProducts = [...filtered]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  const topExpensive = [...filtered]
    .sort((a, b) => b.price - a.price)
    .slice(0, 3);

  const dailyData = {};
  filtered.forEach((p) => {
    const date = new Date(p.createdAt).toLocaleDateString();
    dailyData[date] = (dailyData[date] || 0) + p.price * p.quantity;
  });

  const chartData = {
    labels: Object.keys(dailyData),
    datasets: [
      {
        label: `Inventory Value (${currency})`,
        data: Object.values(dailyData),
        borderColor: "#2563eb",
        backgroundColor: "#93c5fd",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">📊 Inventory Overview</h2>

      {/* Time Filter */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap border-b pb-4">
        {[1, 3, 7, 30, 365].map((d) => (
          <button
            key={d}
            onClick={() => setRange(d)}
            className={`px-4 py-2 rounded-full ${
              range === d
                ? "bg-black text-white"
                : "bg-blue-100 text-gray-800 hover:bg-blue-200"
            }`}
          >
            {d === 365 ? "1 Year" : `${d} Day${d > 1 ? "s" : ""}`}
          </button>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid md:grid-cols-4 gap-4 mb-8 text-center">
        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-300">Total Products</p>
          <h3 className="text-xl font-semibold">{totalProducts}</h3>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-300">Total Quantity</p>
          <h3 className="text-xl font-semibold">{totalQuantity}</h3>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-300">Inventory Value</p>
          <h3 className="text-xl font-semibold">
            {currency} {totalValue.toLocaleString()}
          </h3>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-300">Avg Price / Unit</p>
          <h3 className="text-xl font-semibold">
            {currency} {avgPrice}
          </h3>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg mb-8">
        <h3 className="text-lg font-semibold mb-2">📈 Inventory Value Over Time</h3>
        <Line data={chartData} />
      </div>

      {/* Alerts */}
      {outOfStock.length > 0 && (
        <p className="text-red-600 font-semibold mb-6 text-center">
          ⚠️ {outOfStock.length} products are out of stock!
        </p>
      )}

      {/* Lists */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold mb-2">🆕 Recently Added Products</h4>
          <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
            {recentProducts.map((p) => (
              <li key={p.id}>
                {p.name} – {currency} {p.price} × {p.quantity}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-2">💰 Top 3 Expensive Products</h4>
          <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
            {topExpensive.map((p) => (
              <li key={p.id}>
                {p.name} – {currency} {p.price} × {p.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Overview;
