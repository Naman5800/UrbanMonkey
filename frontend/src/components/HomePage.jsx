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
          ))}
        </div>
      </section>

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
    </div>
  );
};

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

export default HomePage;