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
              className="inline-block mt-6 bg-black text-white px-6 py-3 font-semibold rounded-md hover:bg-blue-700 transition"
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
              image: "data:image/jpeg;base64,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",
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