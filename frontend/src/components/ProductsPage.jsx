import React, { useEffect, useState, useRef } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUser } from '@clerk/clerk-react';
import Navbar from "./Navbar";
import axios from "axios";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";
import SignInModal from "./SignInModal";
import ProductCard from "./ProductCard";

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

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [notification, setNotification] = useState(null);

  // State to track visibility of each row
  const [visibleRows, setVisibleRows] = useState([]);
  const rowRefs = useRef([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products", {
          params: {
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            query: searchQuery,
            category: category || undefined,
            minRating: rating || undefined,
          },
        });

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
  }, [searchQuery, priceRange, category, rating]);

  // Intersection Observer to detect when rows enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.rowIndex);
            setVisibleRows((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the row is visible
    );

    rowRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      rowRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [products]);

  const handleProductClick = (show, url) => {
    setRedirectUrl(url);
    setShowSignInModal(show);
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  const categories = ["All", "Clothing", "Accessories", "Electronics", "Home"];

  // Split products into rows based on grid layout (1, 2, or 3 columns)
  const getRows = () => {
    const rows = [];
    const itemsPerRow = { lg: 3, sm: 2, xs: 1 }; // Match grid-cols-1 sm:grid-cols-2 lg:grid-cols-3

    // Determine items per row based on current screen size
    // This is a simplification; ideally, use a resize observer or media query
    const itemsInRow = window.innerWidth >= 1024 ? itemsPerRow.lg : window.innerWidth >= 640 ? itemsPerRow.sm : itemsPerRow.xs;

    for (let i = 0; i < products.length; i += itemsInRow) {
      rows.push(products.slice(i, i + itemsInRow));
    }

    return rows;
  };

  const rowVariants = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-[50vh] sm:h-[70vh] md:h-[90vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `url(https://www.urbanmonkey.com/cdn/shop/files/on-the-road-002-royal-enfield-x-urban-monkey-24sre06blu-221498.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 max-w-3xl group px-4">
          <div className="relative inline-block">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white overflow-hidden">
              <span className="inline-block transition-all duration-500 ease-in-out transform group-hover:translate-x-full">
                We know the business
              </span>
              <span className="absolute top-0 left-0 w-full text-3xl sm:text-4xl md:text-6xl font-bold text-white opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform group-hover:translate-x-0">
                You know the fashion
              </span>
            </h1>
          </div>
          <TypewriterText
            text="Crafting spaces that harmonize modern aesthetics with timeless elegance."
            className="text-sm sm:text-base md:text-lg text-white mt-4"
            delay={1}
          />
          <Link
            to="/products"
            className="inline-block mt-6 bg-white text-gray-900 px-4 py-2 sm:px-6 sm:py-3 font-semibold text-sm sm:text-lg rounded-md hover:bg-gray-200 transition"
          >
            View More →
          </Link>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">All Yours For The Taking</h1>
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded py-2 px-4 w-full sm:w-64"
            />
            <button
              className="sm:hidden bg-gray-800 text-white px-4 py-2 rounded"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row">
          {/* Filter Sidebar */}
          <aside
            className={`w-full md:w-1/5 pr-0 md:pr-6 mb-6 md:mb-0 ${
              showFilters ? "block" : "hidden sm:block"
            }`}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Filters</h2>
            <div className="bg-white p-4 shadow-md rounded mb-4">
              <h3 className="text-sm sm:text-base font-medium mb-2">Price Range</h3>
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-gray-600 mt-2 text-xs sm:text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="w-full md:w-4/5">
            {Array.isArray(products) && products.length ? (
              getRows().map((row, rowIndex) => (
                <motion.div
                  key={rowIndex}
                  ref={(el) => (rowRefs.current[rowIndex] = el)}
                  data-row-index={rowIndex}
                  variants={rowVariants}
                  initial="hidden"
                  animate={visibleRows.includes(rowIndex) ? "visible" : "hidden"}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6"
                >
                  {row.map((product) => (
                    <ProductCard 
                      key={product._id} 
                      product={product} 
                      onProductClick={handleProductClick}
                      onNotify={showNotification}
                    />
                  ))}
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center">No products found.</p>
            )}
          </div>
        </div>
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

      <SignInModal 
        isOpen={showSignInModal} 
        onClose={() => setShowSignInModal(false)} 
        redirectUrl={redirectUrl}
      />

      <Footer />
    </div>
  );
};

export default ProductsPage;