import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaCreditCard, FaLock, FaArrowLeft } from "react-icons/fa";
import confetti from "canvas-confetti";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, quantity, total, cart } = location.state || {};

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
    address: "",
    city: "",
    zip: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.cardNumber.match(/^\d{16}$/))
      tempErrors.cardNumber = "Card number must be 16 digits";
    if (!formData.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/))
      tempErrors.expiry = "Enter valid expiry (MM/YY)";
    if (!formData.cvv.match(/^\d{3}$/))
      tempErrors.cvv = "CVV must be 3 digits";
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.address) tempErrors.address = "Address is required";
    if (!formData.city) tempErrors.city = "City is required";
    if (!formData.zip.match(/^\d{5}$/))
      tempErrors.zip = "ZIP must be 5 digits";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setPaymentSuccess(true);
        // Store order in sessionStorage
        const order = {
          id: `ORD-${Date.now()}`,
          date: new Date().toLocaleString(),
          items: cart ? cart : [{ ...product, quantity }],
          total: cart ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0) : total,
          billing: { ...formData },
        };
        const existingOrders = JSON.parse(sessionStorage.getItem('orders') || '[]');
        sessionStorage.setItem('orders', JSON.stringify([...existingOrders, order]));
        // Clear cart on successful payment if coming from cart
        if (cart) {
          sessionStorage.removeItem('cart');
        }
        confetti({
          particleCount: 200,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00ff00', '#ff0000', '#0000ff']
        });
      }, 2000);
    }
  };

  const orderTotal = cart ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0) : total;

  if (!product && !cart) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p>No product or cart selected</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(cart ? '/cart' : `/product/${product._id}`)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" /> Back to {cart ? "Cart" : "Product"}
          </button>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:w-1/3"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              {cart ? (
                cart.map(item => (
                  <div key={item.productId} className="flex items-center gap-4 mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-gray-600">Qty: {quantity}</p>
                  </div>
                </div>
              )}
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:w-2/3"
          >
            <div className="bg-white p-8 rounded-lg shadow-lg relative">
              <div className="absolute top-0 right-0 p-4">
                <FaLock className="text-green-500" />
              </div>
              
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FaCreditCard className="mr-2" /> Payment Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <label className="block mb-1 font-medium">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 ${
                        errors.cardNumber ? "border-red-500" : "border-gray-300"
                      }`}
                      maxLength={16}
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                    )}
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }}>
                    <label className="block mb-1 font-medium">Name on Card</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Sanjay Tundiya"
                      className={`w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }}>
                    <label className="block mb-1 font-medium">Expiry Date</label>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      className={`w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 ${
                        errors.expiry ? "border-red-500" : "border-gray-300"
                      }`}
                      maxLength={5}
                    />
                    {errors.expiry && (
                      <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                    )}
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }}>
                    <label className="block mb-1 font-medium">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      className={`w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 ${
                        errors.cvv ? "border-red-500" : "border-gray-300"
                      }`}
                      maxLength={3}
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                    )}
                  </motion.div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <label className="block mb-1 font-medium">Billing Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main St"
                    className={`w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <label className="block mb-1 font-medium">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="New York"
                      className={`w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }}>
                    <label className="block mb-1 font-medium">ZIP Code</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder="10001"
                      className={`w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 ${
                        errors.zip ? "border-red-500" : "border-gray-300"
                      }`}
                      maxLength={5}
                    />
                    {errors.zip && (
                      <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
                    )}
                  </motion.div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  ) : null}
                  {isSubmitting ? "Processing..." : `Pay $${orderTotal.toFixed(2)}`}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Success Modal */}
        <AnimatePresence>
          {paymentSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            >
              <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                <motion.h2
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  className="text-3xl font-bold text-green-600 mb-4"
                >
                  Thank You for Your Purchase!
                </motion.h2>
                <p className="text-gray-600 mb-6">
                  Your payment of ${orderTotal.toFixed(2)} was successful.
                </p>
                <div className="flex justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/products')}
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
                  >
                    Continue Shopping
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/orders')}
                    className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
                  >
                    View Orders
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-20"
      />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-20 right-20 w-16 h-16 bg-green-100 rounded-full opacity-20"
      />

      <Footer />
    </div>
  );
};

export default PaymentPage;