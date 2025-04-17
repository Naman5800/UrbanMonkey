import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Notification disappears after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-20 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      {message}
    </motion.div>
  );
};

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products', {
          params: { featured: true, limit: 3 }
        });
        setFeaturedProducts(response.data.filter(p => p._id !== id));
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchFeaturedProducts();
  }, [id]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  const handleAddToCart = () => {
    const existingCart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(item => item.productId === product._id);
    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
    sessionStorage.setItem('cart', JSON.stringify(existingCart));
    showNotification("Product added to cart!");
    console.log("Updated cart:", existingCart);
  };

  const handleBuyNow = () => {
    navigate('/payment', { 
      state: { 
        product: product, 
        quantity: quantity,
        total: product.price * quantity 
      }
    });
  };

  const handleAddToWishlist = () => {
    const existingWishlist = JSON.parse(sessionStorage.getItem('wishlist') || '[]');
    if (!existingWishlist.some(item => item.productId === product._id)) {
      existingWishlist.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image
      });
      sessionStorage.setItem('wishlist', JSON.stringify(existingWishlist));
      showNotification("Added to wishlist!");
    } else {
      showNotification("Product already in wishlist!", "error");
    }
    console.log("Updated wishlist:", existingWishlist);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
          <Link
            to="/products"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const thumbnails = [
    product.image,
    ...(product.images || [])
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <Link
          to="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <FaArrowLeft className="mr-2" /> Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-100 rounded-lg overflow-hidden"
                >
                  <img
                    src={thumbnails[activeImage]}
                    alt={product.name}
                    className="w-full h-96 object-contain"
                  />
                </motion.div>

                <div className="mt-4 flex space-x-2">
                  {thumbnails.map((thumb, index) => (
                    <div
                      key={index}
                      className={`border-2 rounded-md overflow-hidden cursor-pointer ${
                        activeImage === index
                          ? "border-blue-500"
                          : "border-gray-200"
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img
                        src={thumb}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-20 h-20 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:w-1/2 p-6 md:border-l border-gray-200">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="text-2xl text-blue-600 font-semibold mb-4">
                  ${product.price.toFixed(2)}
                  <span className="text-gray-500 text-sm ml-2">value</span>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Description</h2>
                  <p className="text-gray-600">
                    {product.description || "No description available."}
                  </p>
                </div>

                {product.compatibility?.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">File Compatibility</h2>
                    <div className="flex items-center">
                      {product.compatibility.map((compat, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 py-1 px-2 rounded mr-2"
                        >
                          {compat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Quantity</h2>
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-l"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                      className="w-16 text-center border-t border-b border-gray-200 py-1"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBuyNow}
                    className="flex-1 bg-black text-white py-3 px-6 rounded font-semibold hover:bg-gray-800 transition"
                  >
                    Buy Now
                  </motion.button>
                  <motion.button
                    onClick={handleAddToWishlist}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded hover:bg-gray-50"
                  >
                    <FaHeart className="text-gray-500 hover:text-red-500" />
                  </motion.button>
                  <motion.button
                    onClick={handleAddToCart}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded hover:bg-gray-50"
                  >
                    <FaShoppingCart className="text-gray-500 hover:text-blue-500" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          {featuredProducts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {featuredProducts.slice(0, 3).map((featuredProduct) => (
                <Link
                  to={`/product/${featuredProduct._id}`}
                  key={featuredProduct._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105"
                >
                  <img
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold">{featuredProduct.name}</h3>
                      <button className="text-gray-500 hover:text-red-500">
                        <FaHeart />
                      </button>
                    </div>
                    <p className="text-gray-600 mt-1">
                      ${featuredProduct.price.toFixed(2)} value
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No featured products available.</p>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;