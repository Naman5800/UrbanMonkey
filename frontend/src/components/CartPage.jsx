import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load cart from sessionStorage
    const storedCart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    setCart(storedCart);
    setLoading(false);
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map(item =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter(item => item.productId !== productId);
    setCart(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex justify-center items-center">
          <div className="text-xl">Loading your cart...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
            {error}
          </div>
        )}
        
        {cart.length === 0 ? (
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <p className="text-lg mb-4">Your cart is empty.</p>
            <Link 
              to="/products" 
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left">Product</th>
                        <th className="px-6 py-3 text-right">Price</th>
                        <th className="px-6 py-3 text-center">Quantity</th>
                        <th className="px-6 py-3 text-right">Total</th>
                        <th className="px-6 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {cart.map((item) => (
                        <tr key={item.productId}>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-16 h-16 object-cover mr-4"
                              />
                              <span className="font-medium">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center">
                              <button 
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                              >
                                <FaMinus className="text-gray-600" />
                              </button>
                              <span className="mx-3 w-8 text-center">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                              >
                                <FaPlus className="text-gray-600" />
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button 
                              onClick={() => removeItem(item.productId)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t pt-3 font-bold flex justify-between">
                    <span>Total</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                </div>
                <Link 
                  to="/payment" 
                  state={{ cart: cart, total: calculateSubtotal() }}
                  className="w-full block text-center bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;