import React from 'react';

function ProductModal({ product, onClose, onAddToCart }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-xl text-gray-600 hover:text-black">×</button>
        <img src={product.image_url} alt={product.name} className="w-full h-40 object-contain mb-4 rounded" />
        <h2 className="text-xl font-bold mb-2 text-blue-700">{product.name}</h2>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <p className="text-blue-600 font-bold text-lg mb-4">₹{product.price}</p>
        <button
          onClick={() => { onAddToCart(product); onClose(); }}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductModal;
