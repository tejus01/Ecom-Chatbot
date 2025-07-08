import React from 'react';

function ProductCard({ name, description, price, image, onAddToCart }) {
  const fallbackImage = "https://via.placeholder.com/150?text=No+Image";

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 flex flex-col h-80">
      <img
        src={image || fallbackImage}
        alt={name}
        className="w-full h-28 object-contain mb-2 rounded"
      />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-sm font-semibold text-blue-700 line-clamp-2">{name}</h2>
          <p className="text-gray-600 text-xs my-1 line-clamp-2">{description}</p>
          <p className="text-blue-600 font-bold text-sm mt-2">₹{price}</p>
        </div>
        <button
          onClick={onAddToCart}
          className="w-full bg-blue-500 text-white text-sm py-2 mt-3 rounded hover:bg-blue-600 active:scale-95 transition duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
