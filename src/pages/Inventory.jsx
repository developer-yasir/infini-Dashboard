// Inventory.jsx
import React, { useState } from 'react';

function Inventory({ products, setProducts }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editId, setEditId] = useState(null);

  // ✅ Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !quantity) return alert('Please fill all fields');

    if (editId) {
      const updated = products.map((p) =>
        p.id === editId ? { ...p, name, price, quantity } : p
      );
      setProducts(updated);
      setEditId(null);
    } else {
      const newProduct = {
        id: Date.now(),
        name,
        price: Number(price),
        quantity: Number(quantity),
        createdAt: Date.now(), // for filtering and reports
      };
      setProducts([...products, newProduct]);
    }

    setName('');
    setPrice('');
    setQuantity('');
  };

  // ✅ Handle Delete
  const handleDelete = (id) => {
    const confirm = window.confirm('Delete this product?');
    if (confirm) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // ✅ Handle Edit
  const handleEdit = (product) => {
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price);
    setQuantity(product.quantity);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">📦 Inventory Manager</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded dark:bg-gray-800 dark:text-white"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded dark:bg-gray-800 dark:text-white"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 rounded dark:bg-gray-800 dark:text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editId ? 'Update' : 'Add'}
        </button>
      </form>

      {/* Product List */}
      <div className="overflow-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 rounded shadow">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-left text-sm">
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No products yet
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr
                  key={p.id}
                  className="border-t text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">AED {p.price}</td>
                  <td className="p-2">{p.quantity}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
