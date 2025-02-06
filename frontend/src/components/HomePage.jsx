<<<<<<< HEAD
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

const HomePage = () => {
  const targets = [500, 20, 1500, 1];

  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true, // Trigger only once
    margin: "0px 0px -50% 0px", // Start animation when halfway into the viewport
  });

  return (
    <div className="bg-white text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-[90vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `url(https://www.urbanmonkey.com/cdn/shop/files/on-the-road-002-royal-enfield-x-urban-monkey-24sre06blu-221498.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 max-w-3xl">
          {/* Typewriter Effect for Heading */}
          <TypewriterText
            text="Urban Monkey"
            className="text-6xl font-bold text-white"
          />
          {/* Typewriter Effect for Subheading */}
          <TypewriterText
            text="Crafting Timeless caps that you know how to style."
            className="text-lg text-white mt-4"
            delay={1}
          />
          <Link
            to="/products"
            className="inline-block mt-6 bg-white text-gray-900 px-6 py-3 font-semibold text-lg rounded-md hover:bg-gray-200 transition"
          >
            View More →
          </Link>
        </div>
      </section>

      {/* Modern Minimalist Section */}
      <section ref={ref} className="py-16 px-6 text-center w-full bg-gray-100">
        <h2 className="text-4xl font-bold">Modern Minimalist</h2>
        <p className="text-gray-600 mt-3">
          Elevate your space with timeless elegance.
        </p>
        <div className="flex justify-evenly mt-8">
          {targets.map((target, index) => (
            <NumberAnimation key={index} target={target} isInView={isInView} />
=======
import React, { useState } from 'react';
import Navbar from './Navbar';

const categories = [
  { 
    name: 'Snapback', 
    image: '/api/placeholder/300/300', 
    description: 'Classic Street Style' 
  },
  { 
    name: 'Fitted', 
    image: '/api/placeholder/300/300', 
    description: 'Perfect Fit' 
  },
  { 
    name: 'Trucker', 
    image: '/api/placeholder/300/300', 
    description: 'Outdoor Adventure' 
  },
  { 
    name: 'Bucket Hat', 
    image: '/api/placeholder/300/300', 
    description: 'Summer Cool' 
  }
];

const trendingCaps = [
  { 
    id: 1, 
    name: 'Urban Classic', 
    price: 29.99, 
    image: 'https://www.urbanmonkey.com/cdn/shop/files/grind-mtv-x-urban-monkey-24bckmtv8blu-819986.jpg?v=1737061512&width=400' 
  },
  { 
    id: 2, 
    name: 'Street Vibe', 
    price: 34.99, 
    image: 'https://www.urbanmonkey.com/cdn/shop/files/Dragon_Green_Corduroy_Baseball_Cap_02-258732.jpg?v=1734935128&width=400' 
  },
  { 
    id: 3, 
    name: 'Cool Breeze', 
    price: 39.99, 
    image: 'https://www.urbanmonkey.com/cdn/shop/files/scratch-mtv-x-urban-monkey-24bckmtv160nv-468323.jpg?v=1737061757&width=400' 
  }
];

const carouselImages = [
  'https://www.urbanmonkey.com/cdn/shop/files/scratch-mtv-x-urban-monkey-24bckmtv160nv-468323.jpg?v=1737061757&width=400',
  'https://www.urbanmonkey.com/cdn/shop/files/Dragon_Green_Corduroy_Baseball_Cap_02-258732.jpg?v=1734935128&width=400',
  'https://www.urbanmonkey.com/cdn/shop/files/grind-mtv-x-urban-monkey-24bckmtv8blu-819986.jpg?v=1737061512&width=400'
];

const HomePage = () => {
  const [currentCarousel, setCurrentCarousel] = useState(0);

  const nextSlide = () => {
    setCurrentCarousel((prev) => 
      (prev + 1) % carouselImages.length
    );
  };

  const prevSlide = () => {
    setCurrentCarousel((prev) => 
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Carousel */}
      <div className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={carouselImages[currentCarousel]} 
            alt="Urban Monkey Banner" 
            className="w-full h-full object-cover"
          />
        </div>
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        >
          ←
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        >
          →
        </button>
      </div>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Our Cap Categories
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105"
            >
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-bold">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
                <a 
                  href={`/products?category=${category.name.toLowerCase()}`}
                  className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Shop Now
                </a>
              </div>
            </div>
>>>>>>> c45e71a8de92bbb1ddf4273d3fdbac0975263c63
          ))}
        </div>
      </section>

<<<<<<< HEAD
      {/* Featured Collection Section */}
      <section className="py-16 px-6">
        <h2 className="text-4xl font-bold text-center">
          Explore Our Proud Collection
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          <div className="relative group">
            <img
              src="https://www.urbanmonkey.com/cdn/shop/files/trucker-monkey-002-umbt0002-tl-104887.jpg"
              alt="Trucker Caps"
              className="w-full h-full object-cover"
            />
            <Link
              to="/collection/trucker-caps"
              className="absolute inset-0 flex items-end bg-black bg-opacity-20 text-white p-4 rounded-lg opacity-100 group-hover:bg-opacity-40 transition"
            >
              Trucker Caps →
            </Link>
          </div>
          <div className="relative group">
            <img
              src="https://www.urbanmonkey.com/cdn/shop/files/3m-thinsulate-insulation-beanie-camo-24b180663-ol-867970.jpg"
              alt="Beanies"
              className="w-full h-full object-cover"
            />
            <Link
              to="/categories/Beanies"
              className="absolute inset-0 flex items-end bg-black bg-opacity-20 text-white p-4 rounded-lg opacity-100 group-hover:bg-opacity-40 transition"
            >
              Beanies →
            </Link>
          </div>
          <div className="relative group">
            <img
              src="https://www.urbanmonkey.com/cdn/shop/files/limited-edition-001-2-775481.jpg"
              alt="Snapback Caps"
              className="w-full h-full object-cover"
            />
            <Link
              to="/categories/Snapback-caps"
              className="absolute inset-0 flex items-end bg-black bg-opacity-20 text-white p-4 rounded-lg opacity-100 group-hover:bg-opacity-40 transition"
            >
              Snapback Caps →
            </Link>
          </div>
          <div className="relative group">
            <img className="w-full h-full object-cover"
              src="https://www.urbanmonkey.com/cdn/shop/files/bucket-hat-futura-um24bh187-blk55-600026.jpg"
              alt="Hats"
            />
            <Link
              to="/categories/Hats"
              className="absolute inset-0 flex items-end bg-black bg-opacity-20 text-white p-4 rounded-lg opacity-100 group-hover:bg-opacity-40 transition"
            >
              Hats →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
=======
      {/* Trending Caps */}
      <section className="container mx-auto px-4 py-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">
          Trending Caps
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {trendingCaps.map(cap => (
            <div
              key={cap.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105"
            >
              <img 
                src={cap.image} 
                alt={cap.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-xl">{cap.name}</h3>
                <p className="text-gray-600">${cap.price}</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <img 
              src="/api/placeholder/100/50" 
              alt="Urban Monkey Logo" 
              className="mb-4"
            />
            <p>Urban Monkey: Your Style, Your Cap</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="/products" className="block hover:text-blue-400">Products</a>
              <a href="/about" className="block hover:text-blue-400">About Us</a>
              <a href="/contact" className="block hover:text-blue-400">Contact</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="/privacy" className="block hover:text-blue-400">Privacy Policy</a>
              <a href="/terms" className="block hover:text-blue-400">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 border-t border-gray-700 pt-4">
          © 2024 Urban Monkey. All Rights Reserved.
        </div>
      </footer>
>>>>>>> c45e71a8de92bbb1ddf4273d3fdbac0975263c63
    </div>
  );
};

<<<<<<< HEAD
const NumberAnimation = ({ target, isInView }) => {
  const spring = useSpring(0, { stiffness: 100, damping: 20 }); // Spring animation configuration
  const number = useTransform(spring, (value) => Math.floor(value)); // Transform to integer

  React.useEffect(() => {
    if (isInView) {
      spring.set(target); // Animate to the target value when in view
    }
  }, [isInView, target, spring]);

  return (
    <div className="text-center mx-4">
      <motion.p className="text-5xl font-bold">{number}</motion.p>
      <p className="text-gray-500 text-lg">
        {target === 500
          ? "Products"
          : target === 20
          ? "Projects"
          : target === 1500
          ? "Satisfied Customers"
          : "Top in Kitchener"}
      </p>
    </div>
  );
};

// Component for Typewriter Effect
const TypewriterText = ({ text, className, delay = 0 }) => {
  const letters = Array.from(text); // Split text into individual letters

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay }, // Stagger the letters
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

=======
>>>>>>> c45e71a8de92bbb1ddf4273d3fdbac0975263c63
export default HomePage;