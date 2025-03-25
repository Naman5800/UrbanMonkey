import React, { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import Footer from "./Footer";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

const TypewriterText = ({ text, className, delay = 0 }) => {
  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={letterVariants}>
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="block">
      <div className="relative bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 w-full h-auto text-center">
        {/* Wishlist & Cart Icons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 z-10">
          <div onClick={(e) => {
            e.preventDefault();
            // Add to wishlist functionality
          }}>
            <FaHeart className="text-gray-600 hover:text-red-500 cursor-pointer text-lg" />
          </div>
          <div onClick={(e) => {
            e.preventDefault();
            // Add to cart functionality
          }}>
            <FaShoppingCart className="text-gray-600 hover:text-blue-600 cursor-pointer text-lg" />
          </div>
        </div>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />

        {/* Product Details */}
        <div className="p-5">
          <h3 className="font-bold text-l">{product.name}</h3>
          <p className="text-gray-600">${product.price}</p>
        </div>
      </div>
    </Link>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products", {
          params: {
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            query: searchQuery,
          },
        });

        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Invalid API response: Expected an array");
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [searchQuery, priceRange]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-[90vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `url(https://www.urbanmonkey.com/cdn/shop/files/on-the-road-002-royal-enfield-x-urban-monkey-24sre06blu-221498.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 max-w-3xl group">
          {/* Hover Effect for Heading */}
          <div className="relative inline-block">
            <h1 className="text-6xl font-bold text-white overflow-hidden">
              <span className="inline-block transition-all duration-500 ease-in-out transform group-hover:translate-x-full">
                We know the business
              </span>
              <span className="absolute top-0 left-0 w-full text-6xl font-bold text-white opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform group-hover:translate-x-0">
                You know the fashion
              </span>
            </h1>
          </div>

          {/* Typewriter Effect for Subheading */}
          <TypewriterText
            text="Crafting spaces that harmonize modern aesthetics with timeless elegance."
            className="text-lg text-white mt-4"
            delay={1} // Delay the start of the subheading animation
          />
          <Link
            to="/products"
            className="inline-block mt-6 bg-white text-gray-900 px-6 py-3 font-semibold text-lg rounded-md hover:bg-gray-200 transition"
          >
            View More →
          </Link>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">All Yours For The Taking</h1>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded py-2 px-4 w-64"
          />
        </div>

        {/* Main Content */}
        <div className="flex">
          {/* Filter Sidebar */}
          <aside className="w-1/5 pr-6">
            <h2 className="text-xl font-semibold mb-4">Filter by Price</h2>
            <div className="bg-white p-4 shadow-md rounded">
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-gray-600 mt-2 text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="w-4/5 grid md:grid-cols-3 gap-6">
            {Array.isArray(products) && products.length ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-gray-600 col-span-3">No products found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
