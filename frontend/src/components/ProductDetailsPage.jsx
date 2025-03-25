import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

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

  // Mock data for thumbnail images - in a real app, this would come from your API
  const thumbnails = [
    product.image,
    // You would have multiple images here in a real app
    // For now we'll just repeat the same image
    product.image,
    product.image,
    product.image
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <FaArrowLeft className="mr-2" /> Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Images Section */}
            <div className="md:w-1/2 p-6">
              <div className="relative">
                {/* Featured Badge if applicable */}
                {product.featured && (
                  <div className="absolute top-4 left-4 bg-gray-800 text-white text-xs uppercase font-bold rounded-full px-3 py-1 z-10">
                    Featured
                  </div>
                )}

                {/* Main Image */}
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

                {/* Thumbnail Images */}
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

            {/* Product Info Section */}
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
                  ${product.price}
                  <span className="text-gray-500 text-sm ml-2">value</span>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Description</h2>
                  <p className="text-gray-600">
                    {product.description || "Behold the essence of digital artistry with this generic 3D character render crafted in Cinema 4D. The render presents a neutral character model posed in a standard T-pose, showcasing the basic form and anatomical structure. The model is finely detailed, exhibiting a balanced blend of realism and stylization, providing a blank canvas for further customization and animation."}
                  </p>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">File Compatibility</h2>
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded mr-2">
                      {product.compatibility?.[0] || "Maya"}
                    </span>
                    {product.compatibility?.slice(1).map((compat, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 py-1 px-2 rounded mr-2"
                      >
                        {compat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
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
                      onChange={(e) => setQuantity(Number(e.target.value))}
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

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-black text-white py-3 px-6 rounded font-semibold hover:bg-gray-800 transition"
                  >
                    Buy Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded hover:bg-gray-50"
                  >
                    <FaHeart className="text-gray-500 hover:text-red-500" />
                  </motion.button>
                  <motion.button
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

        {/* Related Products Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">People also like...</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* This would be populated with actual related products in a real app */}
            {Array(3)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105"
                >
                  <div className="relative">
                    {index === 2 && (
                      <div className="absolute top-4 left-4 bg-gray-800 text-white text-xs uppercase font-bold rounded-full px-3 py-1 z-10">
                        Featured
                      </div>
                    )}
                    <img
                      src={`https://via.placeholder.com/400x300?text=Related+Product+${
                        index + 1
                      }`}
                      alt={`Related Product ${index + 1}`}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold">Related Product {index + 1}</h3>
                      <button className="text-gray-500 hover:text-red-500">
                        <FaHeart />
                      </button>
                    </div>
                    <p className="text-gray-600 mt-1">${(50 + index * 10).toFixed(2)} value</p>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;