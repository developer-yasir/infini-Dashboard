# Innfini Dashboard

A lightweight and customizable React-based inventory dashboard app — ideal for small businesses and internal product management. Users can add/edit/delete products, view analytics, generate reports, and manage preferences like username, currency, and dark mode.

---

## 🔗 Live Demo

_Coming soon..._

---

## ⚙️ Features

### ✅ Core Functionalities
- Product CRUD: Add, edit, delete products with name, price, quantity.
- Local Storage Sync: Products and settings persist across page reloads.
- Dashboard Overview:
  - Total Products
  - Total Quantity
  - Inventory Value
  - Average Price per Unit
  - Out-of-Stock Warnings

### 📊 Reports
- Summary of inventory value
- Out-of-stock item listing

### 🛠 Settings
- Change username (shown in top right greeting)
- Select preferred currency (AED, USD, PKR)
- Toggle global dark mode

### 📈 Charts
- Inventory value chart over last:
  - 1 day, 3 days, 7 days, 30 days, 1 year
- Recent and top expensive product summaries

---

## 🖥️ Tech Stack

| Technology      | Purpose               |
|-----------------|-----------------------|
| React.js        | Frontend UI           |
| React Router    | Client-side routing   |
| Chart.js        | Inventory chart       |
| Plain CSS       | App styling (no Tailwind) |
| LocalStorage    | Persistent user data  |

---

## 📁 Folder Structure

src/
│
├── components/
│ └── SidebarMenu.jsx
│
├── pages/
│ ├── Overview.jsx
│ ├── Inventory.jsx
│ ├── Reports.jsx
│ └── Settings.jsx
│
├── index.css
├── App.js
└── index.js




🔮 Upcoming Improvements
 Export to CSV/Excel

 Product category tags

 Search & filtering

 Firebase or MongoDB backend

 Barcode scanner support

 Multi-user login system



👨‍💻 Developer Yasir
MERN Stack Developer


---

## 🚀 Getting Started

### 🛠 Installation

```bash
git clone https://github.com/your-username/inventory-dashboard.git
cd inventory-dashboard
npm install
npm run dev
