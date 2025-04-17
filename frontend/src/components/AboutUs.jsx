import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NamanImage from '../assets/naman.png';
import TeerthImage from '../assets/teerth.png';
import HemrajImage from '../assets/hemraj.png';
import { FaLeaf, FaPaintBrush, FaUsers } from 'react-icons/fa';

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

const AboutUs = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/gallery');
        setGalleryImages(response.data);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };

    fetchGalleryImages();
  }, []);

  // Intersection Observer for section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.sectionIndex);
            setVisibleSections((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <div className="bg-white text-gray-900">
      <Navbar />

      {/* Hero Section with Parallax */}
      <motion.section
        className="relative h-[90vh] flex items-center justify-center text-center bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(https://www.urbanmonkey.com/cdn/shop/files/on-the-road-002-royal-enfield-x-urban-monkey-24sre06blu-221498.jpg)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-4xl px-4">
          <TypewriterText
            text="About Urban Monkey"
            className="text-4xl sm:text-6xl font-bold text-white"
            delay={0.5}
          />
          <motion.p
            className="text-lg sm:text-xl text-white mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Crafting iconic streetwear that defines urban culture.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Link
              to="/products"
              className="inline-block mt-6 bg-white text-gray-900 px-6 py-3 font-semibold rounded-md hover:bg-gray-200 transition"
            >
              Explore Our Caps
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Story Section */}
      <motion.section
        ref={(el) => (sectionRefs.current[0] = el)}
        data-section-index="0"
        variants={sectionVariants}
        initial="hidden"
        animate={visibleSections.includes(0) ? "visible" : "hidden"}
        className="py-16 px-6 text-center"
      >
        <h2 className="text-4xl font-bold">Our Story</h2>
        <div className="max-w-3xl mx-auto mt-6 text-gray-600 leading-relaxed">
          <p className="mb-4">
            Urban Monkey was born in 2025 in the vibrant streets of Mumbai, where founders <span className='text-blue-800 text-l font-bold '>Naman Shah</span> and <span className='text-blue-800 text-l font-bold '>Teerth Pandya</span> along with the assistance of <span className='text-blue-800 text-l font-bold '>Hemrajsinh Solanki</span> envisioned a brand that captures the pulse of urban culture. Starting with a single cap design in a small workshop, we set out to blend streetwear swagger with timeless craftsmanship.
          </p>
          <p className="mb-4">
            Today, Urban Monkey is a global name in street fashion, known for our bold designs, premium materials, and a commitment to individuality. Each cap tells a story—of rebellion, creativity, and the hustle of city life. Our mission is to empower you to express your unique style, one headspace at a time.
          </p>
          <p>
            From collaborations with artists to limited-edition drops, we’re more than a brand—we’re a movement. Join us in redefining streetwear for the modern urbanite.
          </p>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <motion.section
        ref={(el) => (sectionRefs.current[1] = el)}
        data-section-index="1"
        variants={sectionVariants}
        initial="hidden"
        animate={visibleSections.includes(1) ? "visible" : "hidden"}
        className="py-16 px-6 bg-gray-100 text-center"
      >
        <h2 className="text-4xl font-bold">Mission & Vision</h2>
        <div className="max-w-3xl mx-auto mt-6 text-gray-600">
          <p className="mb-4">
            <strong>Mission:</strong> To craft streetwear that inspires self-expression and celebrates urban culture, delivering high-quality, sustainable products that resonate with the modern generation.
          </p>
          <p>
            <strong>Vision:</strong> To lead the global streetwear scene by fostering creativity, building community, and pushing the boundaries of fashion with every cap we create.
          </p>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        ref={(el) => (sectionRefs.current[2] = el)}
        data-section-index="2"
        variants={sectionVariants}
        initial="hidden"
        animate={visibleSections.includes(2) ? "visible" : "hidden"}
        className="py-16 px-6"
      >
        <h2 className="text-4xl font-bold text-center">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
          {[
            {
              icon: <FaLeaf className="text-4xl text-green-600" />,
              title: 'Sustainability',
              desc: 'We prioritize eco-friendly materials and ethical production to reduce our environmental footprint.',
            },
            {
              icon: <FaPaintBrush className="text-4xl text-blue-600" />,
              title: 'Creativity',
              desc: 'Every design is a canvas for innovation, blending art and fashion to create unique pieces.',
            },
            {
              icon: <FaUsers className="text-4xl text-red-600" />,
              title: 'Community',
              desc: 'We build connections with our fans, artists, and creators to foster a vibrant urban tribe.',
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate={visibleSections.includes(2) ? "visible" : "hidden"}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
            >
              <div className="flex justify-center">{value.icon}</div>
              <h3 className="text-xl font-semibold mt-4">{value.title}</h3>
              <p className="text-gray-600 mt-2">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        ref={(el) => (sectionRefs.current[3] = el)}
        data-section-index="3"
        variants={sectionVariants}
        initial="hidden"
        animate={visibleSections.includes(3) ? "visible" : "hidden"}
        className="py-16 px-6 bg-gray-100"
      >
        <h2 className="text-4xl font-bold text-center">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
          {[
            {
              img: NamanImage,
              name: 'Naman Shah',
              role: 'Founder & CEO',
            },
            {
              img: TeerthImage,
              name: 'Teerth Pandya',
              role: 'Founder & CEO',
            },
            {
              img: HemrajImage,
              name: 'Hemrajsinh Solanki',
              role: 'Creative Director',
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate={visibleSections.includes(3) ? "visible" : "hidden"}
              transition={{ delay: index * 0.2 }}
              className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto object-cover"
              />
              <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Craftsmanship Timeline Section */}
      <motion.section
        ref={(el) => (sectionRefs.current[4] = el)}
        data-section-index="4"
        variants={sectionVariants}
        initial="hidden"
        animate={visibleSections.includes(4) ? "visible" : "hidden"}
        className="py-16 px-6"
      >
        <h2 className="text-4xl font-bold text-center">Our Craftsmanship</h2>
        <div className="relative max-w-4xl mx-auto mt-12">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>
          {[
            {
              title: 'Design',
              desc: 'Our team sketches bold, urban-inspired designs that blend trends with timeless appeal.',
              side: 'left',
            },
            {
              title: 'Material Selection',
              desc: 'We source premium, sustainable fabrics to ensure comfort and durability.',
              side: 'right',
            },
            {
              title: 'Production',
              desc: 'Skilled artisans craft each cap with precision in our ethical workshops.',
              side: 'left',
            },
            {
              title: 'Quality Check',
              desc: 'Every cap undergoes rigorous testing to meet our high standards.',
              side: 'right',
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate={visibleSections.includes(4) ? "visible" : "hidden"}
              transition={{ delay: index * 0.2 }}
              className={`mb-8 flex justify-${step.side === 'left' ? 'start' : 'end'} items-center w-full`}
            >
              <div className={`w-1/2 ${step.side === 'left' ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600 mt-2">{step.desc}</p>
              </div>
              <div className="w-8 h-8 bg-blue-600 rounded-full border-4 border-white z-10"></div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section
        ref={(el) => (sectionRefs.current[5] = el)}
        data-section-index="5"
        variants={sectionVariants}
        initial="hidden"
        animate={visibleSections.includes(5) ? "visible" : "hidden"}
        className="py-16 px-6 bg-gray-100"
      >
        <h2 className="text-4xl font-bold text-center">Our Gallery</h2>
        <div className="mt-8">
          <Carousel images={galleryImages} />
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default AboutUs;