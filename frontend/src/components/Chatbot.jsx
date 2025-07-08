import React, { useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import CartSidebar from './CartSidebar';
import ProductModal from './ProductModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const sendMessage = async (msg = input) => {
    if (!msg.trim()) return;

    setMessages(prev => [...prev, { sender: "user", text: msg }]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/api/products", { message: msg });

      if (Array.isArray(res.data.response)) {
        setMessages(prev => [...prev, { sender: "bot", products: res.data.response }]);
      } else {
        setMessages(prev => [...prev, { sender: "bot", text: res.data.response }]);
      }
    } catch {
      setMessages(prev => [...prev, { sender: "bot", text: "Something went wrong!" }]);
    }
  };

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
    toast.success(`${product.name} added to cart!`);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    // Dummy suggestions
    const all = ['Shoes', 'Shirt', 'Laptop', 'Headphones', 'Gloves', 'Bag', 'Watch'];
    if (value.length > 1) {
      const filtered = all.filter(item => item.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 min-h-screen relative">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">E-commerce Chatbot</h1>

      {/* Floating Cart Button */}
      <button
        onClick={() => setShowCart(true)}
        className="fixed top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded shadow z-40"
      >
        🛒 Cart ({cart.length})
      </button>

      {/* Cart Sidebar */}
      {showCart && <CartSidebar cartItems={cart} onClose={() => setShowCart(false)} />}

      {/* Chat Window */}
      <div className="bg-white rounded-lg shadow-lg p-4 h-[32rem] overflow-y-auto space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx}>
            {msg.sender === "user" ? (
              <div className="text-right">
                <div className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg shadow text-sm">
                  {msg.text}
                </div>
              </div>
            ) : msg.products ? (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {msg.products.map((p, i) => (
                  <ProductCard
                    key={i}
                    name={p.name}
                    description={p.description}
                    price={p.price}
                    image={p.image_url}
                    onAddToCart={() => handleAddToCart(p)}
                    onClick={() => setSelectedProduct(p)} // For modal
                  />
                ))}
              </div>
            ) : (
              <div className="text-left">
                <div className="inline-block bg-gray-200 text-black px-4 py-2 rounded-lg shadow text-sm">
                  {msg.text}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Search + Autocomplete */}
      <div className="mt-4 relative">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about products..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => sendMessage()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>

        {suggestions.length > 0 && (
          <div className="absolute bg-white border rounded shadow-md mt-1 w-full z-10">
            {suggestions.map((s, i) => (
              <div
                key={i}
                onClick={() => {
                  setInput(s);
                  setSuggestions([]);
                  sendMessage(s);
                }}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Toasts */}
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}

export default Chatbot;
