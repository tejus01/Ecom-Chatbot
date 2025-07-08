// src/components/CartSidebar.jsx
import React from 'react';

function CartSidebar({ cartItems, onClose }) {
  return (
    <div className="fixed right-0 top-0 h-full w-72 bg-white shadow-lg p-4 z-50 transition-transform transform translate-x-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-lg">✖</button>
      </div>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="space-y-3">
          {cartItems.map((item, idx) => (
            <li key={idx} className="border-b pb-2">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">₹{item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartSidebar;
