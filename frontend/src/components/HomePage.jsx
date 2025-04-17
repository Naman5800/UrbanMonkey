import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

const HomePage = () => {
  const targets = [500, 20, 1500, 1];

  // Refs and InView hooks for each section
  const heroRef = React.useRef(null);
  const statsRef = React.useRef(null);
  const collectionRef = React.useRef(null);
  const craftRef = React.useRef(null);
  const dropsRef = React.useRef(null);
  const communityRef = React.useRef(null);
  const styleRef = React.useRef(null);
  const ctaRef = React.useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: "0px 0px -20% 0px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "0px 0px -50% 0px" });
  const isCollectionInView = useInView(collectionRef, { once: true, margin: "0px 0px -20% 0px" });
  const isCraftInView = useInView(craftRef, { once: true, margin: "0px 0px -20% 0px" });
  const isDropsInView = useInView(dropsRef, { once: true, margin: "0px 0px -20% 0px" });
  const isCommunityInView = useInView(communityRef, { once: true, margin: "0px 0px -20% 0px" });
  const isStyleInView = useInView(styleRef, { once: true, margin: "0px 0px -20% 0px" });
  const isCtaInView = useInView(ctaRef, { once: true, margin: "0px 0px -20% 0px" });

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const slideVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const bounceVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: "spring", bounce: 0.3 } },
  };

  return (
    <div className="bg-white text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[90vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `url(https://www.urbanmonkey.com/cdn/shop/files/on-the-road-002-royal-enfield-x-urban-monkey-24sre06blu-221498.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 max-w-3xl">
          <TypewriterText
            text="Urban Monkey"
            className="text-6xl font-bold text-white"
          />
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
      <section ref={statsRef} className="py-16 px-6 text-center w-full bg-gray-100">
        <h2 className="text-4xl font-bold">Modern Minimalist</h2>
        <p className="text-gray-600 mt-3">
          Elevate your space with timeless elegance.
        </p>
        <div className="flex justify-evenly mt-8">
          {targets.map((target, index) => (
            <NumberAnimation key={index} target={target} isInView={isStatsInView} />
          ))}
        </div>
      </section>

      {/* Featured Collection Section */}
      <section ref={collectionRef} className="py-16 px-6">
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
              to="/products"
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
              to="/products"
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
              to="/products"
              className="absolute inset-0 flex items-end bg-black bg-opacity-20 text-white p-4 rounded-lg opacity-100 group-hover:bg-opacity-40 transition"
            >
              Snapback Caps →
            </Link>
          </div>
          <div className="relative group">
            <img
              className="w-full h-full object-cover"
              src="https://www.urbanmonkey.com/cdn/shop/files/bucket-hat-futura-um24bh187-blk55-600026.jpg"
              alt="Hats"
            />
            <Link
              to="/products"
              className="absolute inset-0 flex items-end bg-black bg-opacity-20 text-white p-4 rounded-lg opacity-100 group-hover:bg-opacity-40 transition"
            >
              Hats →
            </Link>
          </div>
        </div>
      </section>

      {/* Our Craftsmanship Section */}
      <motion.section
        ref={craftRef}
        className="py-16 px-6 bg-white"
        variants={sectionVariants}
        initial="hidden"
        animate={isCraftInView ? "visible" : "hidden"}
      >
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10">
          <motion.div
            className="lg:w-1/2"
            variants={slideVariants}
            initial="hidden"
            animate={isCraftInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold">Our Craftsmanship</h2>
            <p className="text-gray-600 mt-4 max-w-lg">
              Every Urban Monkey cap is crafted with precision, using premium materials like organic cotton and recycled polyester. Our designs blend streetwear grit with timeless style, ensuring you stand out in every crowd.
            </p>
            <Link
              to="/products"
              className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Shop Caps →
            </Link>
          </motion.div>
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={isCraftInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <img
              src="https://www.urbanmonkey.com/cdn/shop/files/community-hub-2.jpg"
              alt="Urban Monkey Craftsmanship"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Limited Edition Drops Section */}
      <motion.section
        ref={dropsRef}
        className="py-16 px-6 bg-gray-100"
        variants={sectionVariants}
        initial="hidden"
        animate={isDropsInView ? "visible" : "hidden"}
      >
        <h2 className="text-4xl font-bold text-center">Limited Edition Drops</h2>
        <p className="text-gray-600 mt-3 text-center max-w-2xl mx-auto">
          Grab these exclusive caps before they’re gone forever.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
          {[
            {
              name: "Royal Enfield Collab",
              price: 39.99,
              image: "https://www.urbanmonkey.com/cdn/shop/files/Emperor_White_Corduroy_Baseball_Cap_02-989790.jpg",
            },
            {
              name: "Lazy Day Cap",
              price: 35.99,
              image: "https://www.urbanmonkey.com/cdn/shop/files/lazy-day-05-301072.jpg",
            },
            {
              name: "Vintage Trucker",
              price: 29.99,
              image: "https://www.urbanmonkey.com/cdn/shop/files/steezy-24s214-grn-672294.jpg",
            },
          ].map((drop, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate={isDropsInView ? "visible" : "hidden"}
              transition={{ delay: index * 0.2 }}
              className="relative group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={drop.image}
                alt={drop.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{drop.name}</h3>
                <p className="text-gray-600">${drop.price.toFixed(2)}</p>
              </div>
              <Link
                to="/products"
                className="absolute inset-0 flex items-end bg-black bg-opacity-20 text-white p-4 opacity-0 group-hover:opacity-100 group-hover:bg-opacity-40 transition"
              >
                Shop Now →
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Community Vibes Section */}
      <motion.section
        ref={communityRef}
        className="py-16 px-6 bg-white relative"
        variants={sectionVariants}
        initial="hidden"
        animate={isCommunityInView ? "visible" : "hidden"}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url(https://www.urbanmonkey.com/cdn/shop/files/streetwear-bg-001-456789.jpg)`,
          }}
          animate={{ x: ["0%", "-10%"], transition: { duration: 20, repeat: Infinity, ease: "linear" } }}
        />
        <h2 className="text-4xl font-bold text-center relative z-10">Community Vibes</h2>
        <p className="text-gray-600 mt-3 text-center max-w-2xl mx-auto relative z-10">
          Hear from our tribe about why they love Urban Monkey.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto relative z-10">
          {[
            {
              name: "Pavan Patel",
              quote: "Urban Monkey caps are my go-to for any outfit. The quality is unreal!",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbntqRVQeZ2p-uK_CGRzjqD0xT8V1D-uwXZ1GPYzI70Zugub7eaQYRqNg7oDrl2JyWM&usqp=CAU",
            },
            {
              name: "Sanjay Tundiya",
              quote: "The limited edition drops are fire. I get compliments everywhere!",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCwYtl1tFUwEbfdDLVzOmud-NVp1vrzzunyMdPsCIHWH6UWEbI_Ua-I_1GOvpDYFCDgpQ&usqp=CAU",
            },
            {
              name: "Parth Barot",
              quote: "Love the vibe and sustainability focus. Proud to rep UM!",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoq0f1tSU2b8opZaApGh5tl2FreFb52dyo6Q&s",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              variants={slideVariants}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isCommunityInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-100 p-6 rounded-lg shadow-lg text-center"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              <p className="text-lg font-semibold mt-4">{testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Style Guide Section */}
      <motion.section
        ref={styleRef}
        className="py-16 px-6 bg-gray-100"
        variants={sectionVariants}
        initial="hidden"
        animate={isStyleInView ? "visible" : "hidden"}
      >
        <h2 className="text-4xl font-bold text-center">Style Guide</h2>
        <p className="text-gray-600 mt-3 text-center max-w-2xl mx-auto">
          Get inspired with our tips for rocking Urban Monkey caps.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 max-w-6xl mx-auto">
          {[
            {
              title: "Street Casual",
              image: "https://www.urbanmonkey.com/cdn/shop/files/love-happiness-um23sc-057-656779.jpg?v=1734935374&width=400",
              desc: "Pair a trucker cap with a hoodie and sneakers for an effortless look.",
            },
            {
              title: "Festival Ready",
              image: "https://www.urbanmonkey.com/cdn/shop/files/love-over-fear-24bck217-owh-472317.jpg?v=1740828154&width=400",
              desc: "Rock a snapback with bold patterns and sunglasses for festival vibes.",
            },
            {
              title: "Winter Layering",
              image: "https://www.urbanmonkey.com/cdn/shop/files/URBANMONKEY17_11_232166-804522.jpg?v=1733829604&width=330",
              desc: "Style a beanie with a puffer jacket and boots for cozy streetwear.",
            },
            {
              title: "Skater Edge",
              image: "https://www.urbanmonkey.com/cdn/shop/files/skater-kid-umbc150-blk-721532.jpg?v=1734935730&width=400",
              desc: "Combine a bucket hat with baggy jeans and a graphic tee.",
            },
          ].map((style, index) => (
            <motion.div
              key={index}
              variants={bounceVariants}
              initial="hidden"
              animate={isStyleInView ? "visible" : "hidden"}
              transition={{ delay: index * 0.2 }}
              className="relative group rounded-lg overflow-hidden shadow-lg"
              whileHover={{ rotate: 3, scale: 1.05 }}
            >
              <img
                src={style.image}
                alt={style.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold">{style.title}</h3>
                <p className="text-gray-600 mt-2">{style.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Get in Touch Section */}
      <motion.section
        ref={ctaRef}
        className="py-16 px-6 text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white"
        variants={sectionVariants}
        initial="hidden"
        animate={isCtaInView ? "visible" : "hidden"}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 100%" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isCtaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get in Touch
          </motion.h2>
          <motion.p
            className="mt-4 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Join our community for exclusive drops, styling tips, and more. Follow us or drop us a line!
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              to="/contact-us"
              className="bg-white text-gray-900 px-6 py-3 font-semibold rounded-md hover:bg-gray-200 transition"
            >
              Contact Us
            </Link>
            <a
              href="https://instagram.com/urbanmonkey"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white px-6 py-3 font-semibold rounded-md hover:bg-white hover:text-gray-900 transition"
            >
              Follow on Instagram
            </a>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

// TypewriterText Component
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

// NumberAnimation Component
const NumberAnimation = ({ target, isInView }) => {
  const spring = useSpring(0, { stiffness: 100, damping: 20 });
  const number = useTransform(spring, (value) => Math.floor(value));

  React.useEffect(() => {
    if (isInView) {
      spring.set(target);
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

export default HomePage;