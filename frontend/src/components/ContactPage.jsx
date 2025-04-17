import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaPhone, FaEnvelope, FaCommentDots, FaQuestionCircle, FaStar } from "react-icons/fa";

// TypewriterText component
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

// BorderBeam animation component
const BorderBeam = ({ duration = 8, size = 100 }) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `
          linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent) 0% 0% / 200% 100%,
          linear-gradient(0deg, transparent, rgba(255, 255, 255, 0.3), transparent) 100% 0% / 100% 200%
        `,
        backgroundRepeat: "no-repeat",
        animation: `borderBeamX ${duration}s linear infinite, borderBeamY ${duration}s linear infinite`,
      }}
    />
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionRefs = useRef([]);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  const validateField = (name, value) => {
    let error = "";

    if (!value.trim()) {
      return `${
        name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, " $1").trim()
      } is required`;
    }

    switch (name) {
      case "fullName":
        if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        } else if (value.trim().length > 50) {
          error = "Name cannot exceed 50 characters";
        } else if (!/^[A-Za-z\s.',-]+$/.test(value)) {
          error = "Name contains invalid characters";
        }
        break;
      case "email":
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          error = "Please enter a valid email address";
        } else if (value.length > 100) {
          error = "Email cannot exceed 100 characters";
        }
        break;
      case "subject":
        if (value.trim().length < 3) {
          error = "Subject must be at least 3 characters";
        } else if (value.trim().length > 100) {
          error = "Subject cannot exceed 100 characters";
        }
        break;
      case "message":
        if (value.trim().length < 10) {
          error = "Message must be at least 10 characters";
        } else if (value.trim().length > 1000) {
          error = "Message cannot exceed 1000 characters";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      newErrors[key] = error;
      if (error) {
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Placeholder for backend API call
        // await axios.post('http://localhost:5000/api/contact', formData);
        console.log("Form submitted:", formData);
        setFormSubmitted(true);

        setTimeout(() => {
          setFormData({
            fullName: "",
            email: "",
            subject: "",
            message: "",
          });
          setErrors({
            fullName: "",
            email: "",
            subject: "",
            message: "",
          });
          setFormSubmitted(false);
          setIsSubmitting(false);
        }, 3000);
      } catch (error) {
        console.error("Error submitting form:", error);
        setIsSubmitting(false);
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const getCharacterCount = (field) => {
    const maxLengths = {
      fullName: 50,
      email: 100,
      subject: 100,
      message: 1000,
    };

    return `${formData[field].length}/${maxLengths[field]}`;
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
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
            text="Connect with Urban Monkey"
            className="text-4xl sm:text-6xl font-bold text-white"
            delay={0.5}
          />
          <motion.p
            className="text-lg sm:text-xl text-white mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            We’re here to answer your questions and vibe with our community.
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
              Shop Our Caps
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Support Options Section */}
      <motion.section
        ref={(el) => (sectionRefs.current[0] = el)}
        data-section-index="0"
        variants={sectionVariants}
        initial="hidden"
        animate={visibleSections.includes(0) ? "visible" : "hidden"}
        className="py-16 px-6 bg-gray-100"
      >
        <h2 className="text-4xl font-bold text-center">How Can We Help?</h2>
        <p className="text-gray-600 mt-4 text-center max-w-2xl mx-auto">
          Choose the best way to connect with Urban Monkey’s support team for quick and friendly assistance.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 max-w-6xl mx-auto">
          {[
            {
              icon: <FaPhone className="text-4xl text-blue-600" />,
              title: "Call Us",
              desc: "Speak directly with our team.",
              details: "800-246-9132\n+1-235-000-2345",
              action: "tel:+12350002345",
            },
            {
              icon: <FaEnvelope className="text-4xl text-green-600" />,
              title: "Email Us",
              desc: "Send us a message anytime.",
              details: "info@urbanmonkey.ca",
              action: "mailto:info@urbanmonkey.ca",
            },
            {
              icon: <FaCommentDots className="text-4xl text-purple-600" />,
              title: "Live Chat",
              desc: "Chat with us in real-time.",
              details: "Available 9 AM - 5 PM",
              action: "#", // Placeholder for live chat integration
            },
            {
              icon: <FaQuestionCircle className="text-4xl text-orange-600" />,
              title: "FAQs",
              desc: "Find quick answers.",
              details: "Browse common questions",
              action: "#faqs",
            },
          ].map((option, index) => (
            <motion.a
              key={index}
              href={option.action}
              variants={cardVariants}
              initial="hidden"
              animate={visibleSections.includes(0) ? "visible" : "hidden"}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 text-center"
            >
              <div className="flex justify-center">{option.icon}</div>
              <h3 className="text-xl font-semibold mt-4">{option.title}</h3>
              <p className="text-gray-600 mt-2">{option.desc}</p>
              <p className="text-gray-500 mt-2 whitespace-pre-line text-sm">{option.details}</p>
            </motion.a>
          ))}
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        ref={(el) => (sectionRefs.current[1] = el)}
        data-section-index="1"
        variants={sectionVariants}
        initial="hidden"
        animate={visibleSections.includes(1) ? "visible" : "hidden"}
        className="py-16 px-6"
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Contact Info */}
            <motion.div
              className="w-full lg:w-1/2 space-y-8"
              variants={sectionVariants}
              initial="hidden"
              animate={visibleSections.includes(1) ? "visible" : "hidden"}
            >
              <h2 className="text-3xl font-bold">
                Let’s Talk Streetwear
              </h2>
              <p className="mt-4 text-gray-600">
                Whether you have questions about our caps, need support, or want to collaborate, we’re all ears. Drop us a message, and let’s vibe!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold">Call Center</h3>
                  <p className="mt-2 text-gray-600">289-289-2892</p>
                  <p className="text-gray-600">+1-372-020-2345</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Our Location</h3>
                  <p className="mt-2 text-gray-600">Kitchener, Ontario - N2G</p>
                  <p className="text-gray-600">King Street, Downtown 1</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Email</h3>
                  <p className="mt-2 text-gray-600">info@urbanmonkey.ca</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Social Media</h3>
                  <div className="flex gap-4 mt-2">
                    {[
                      { icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", href: "#" },
                      { icon: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z", href: "#" },
                      { icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4z", href: "#" },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                        >
                          <path d={social.icon}></path>
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="w-full lg:w-1/2"
              variants={sectionVariants}
              initial="hidden"
              animate={visibleSections.includes(1) ? "visible" : "hidden"}
            >
              <div className="relative rounded-lg overflow-hidden bg-white border border-gray-200 shadow-lg">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Get in Touch</h3>
                  <p className="text-gray-600 mb-6">
                    Send us a message, and we’ll get back to you faster than a streetwear drop.
                  </p>

                  <AnimatePresence>
                    {formSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
                      >
                        <p className="font-medium">Message sent successfully!</p>
                        <p className="text-sm">We’ll get back to you shortly.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {[
                      { id: "fullName", label: "Full Name", type: "text", placeholder: "Full Name" },
                      { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
                      { id: "subject", label: "Subject", type: "text", placeholder: "How can we help you?" },
                    ].map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between">
                          <label
                            htmlFor={field.id}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            {field.label}
                          </label>
                          <span className="text-xs text-gray-500">{getCharacterCount(field.id)}</span>
                        </div>
                        <input
                          id={field.id}
                          name={field.id}
                          type={field.type}
                          value={formData[field.id]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder={field.placeholder}
                          className={`w-full p-3 border ${
                            errors[field.id] ? "border-red-500" : "border-gray-300"
                          } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                          maxLength={field.id === "fullName" ? 50 : 100}
                        />
                        {errors[field.id] && (
                          <p className="mt-1 text-sm text-red-600">{errors[field.id]}</p>
                        )}
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex justify-between">
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Message
                        </label>
                        <span className="text-xs text-gray-500">{getCharacterCount("message")}</span>
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Your message here..."
                        rows="5"
                        className={`w-full p-3 border ${
                          errors.message ? "border-red-500" : "border-gray-300"
                        } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none`}
                        maxLength="1000"
                      ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                      )}
                    </motion.div>
                    <motion.button
                      type="submit"
                      disabled={Object.values(errors).some((error) => error !== "") || isSubmitting}
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSubmitting ? (
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
                <BorderBeam duration={8} size={100} />
                <style jsx>{`
                  @keyframes borderBeamX {
                    0% { background-position-x: 200%, 0%; }
                    100% { background-position-x: 0%, 0%; }
                  }
                  @keyframes borderBeamY {
                    0% { background-position-y: 0%, 0%; }
                    100% { background-position-y: 0%, 200%; }
                  }
                `}</style>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQs Section */}
      <motion.section
        ref={(el) => (sectionRefs.current[2] = el)}
        data-section-index="2"
        variants={sectionVariants}
        initial="hidden"
        animate={visibleSections.includes(2) ? "visible" : "hidden"}
        className="py-16 px-6 bg-gray-100"
      >
        <h2 className="text-4xl font-bold text-center">Frequently Asked Questions</h2>
        <p className="text-gray-600 mt-4 text-center max-w-2xl mx-auto">
          Find answers to common questions about Urban Monkey’s products, shipping, and more.
        </p>
        <div className="max-w-3xl mx-auto mt-8 space-y-4">
          {[
            {
              question: "What materials are used in Urban Monkey caps?",
              answer:
                "Our caps are made from premium, sustainable materials like organic cotton, recycled polyester, and durable stitching for lasting quality.",
            },
            {
              question: "How long does shipping take?",
              answer:
                "Shipping within Canada takes 3-5 business days. International orders may take 7-14 days, depending on your location.",
            },
            {
              question: "What is your return policy?",
              answer:
                "We offer a 30-day return policy for unworn items in original condition. Contact us to initiate a return and receive a refund or exchange.",
            },
            {
              question: "Can I collaborate with Urban Monkey?",
              answer:
                "We love working with artists and creators! Email us at collabs@urbanmonkey.ca with your portfolio and ideas.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate={visibleSections.includes(2) ? "visible" : "hidden"}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    expandedFAQ === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-gray-50 text-gray-600"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        ref={(el) => (sectionRefs.current[3] = el)}
        data-section-index="3"
        variants={sectionVariants}
        initial="hidden"
        animate={visibleSections.includes(3) ? "visible" : "hidden"}
        className="py-16 px-6"
      >
        <h2 className="text-4xl font-bold text-center">What Our Community Says</h2>
        <p className="text-gray-600 mt-4 text-center max-w-2xl mx-auto">
          Hear from Urban Monkey fans who rock our caps with style and pride.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
          {[
            {
              name: "Amit Chudhari",
              quote: "Urban Monkey caps are my go-to for every outfit. The quality and style are unmatched!",
              rating: 5,
            },
            {
              name: "Dhruvil Patel",
              quote: "Fast shipping and amazing customer service. I’m a fan for life!",
              rating: 4,
            },
            {
              name: "Udit Bherwani",
              quote: "The designs are so unique, and I love the sustainable materials. Keep it up!",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate={visibleSections.includes(3) ? "visible" : "hidden"}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <p className="text-sm font-semibold">{testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Map Section */}
      <motion.section
        ref={(el) => (sectionRefs.current[4] = el)}
        data-section-index="4"
        variants={sectionVariants}
        initial="hidden"
        animate={visibleSections.includes(4) ? "visible" : "hidden"}
        className="py-16 px-6 bg-gray-100"
      >
        <h2 className="text-4xl font-bold text-center">Visit Us</h2>
        <p className="text-gray-600 mt-4 text-center max-w-2xl mx-auto">
          Drop by our headquarters in Kitchener, Ontario, or connect with us online.
        </p>
        <div className="container mx-auto mt-8">
          <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Urban Monkey Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92433.84017711358!2d-80.57001837646485!3d43.430199999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf48c03ee5105%3A0x9525f8e6df5f544b!2sKitchener%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sus!4v1677619666793!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </motion.section>

      

      <Footer />
    </div>
  );
};

export default ContactPage;