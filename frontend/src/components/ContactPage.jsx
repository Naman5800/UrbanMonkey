import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Custom BorderBeam animation component
const BorderBeam = ({ duration = 8, size = 100 }) => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `
          linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent) 0% 0% / 200% 100%,
          linear-gradient(0deg, transparent, rgba(255, 255, 255, 0.3), transparent) 100% 0% / 100% 200%
        `,
        backgroundRepeat: 'no-repeat',
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
    message: ""
  });
  
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: ""
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    
    if (!value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1').trim()} is required`;
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
    
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    const error = validateField(name, value);
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      newErrors[key] = error;
      if (error) {
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setFormSubmitted(true);
      
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          message: ""
        });
        setFormSubmitted(false);
      }, 3000);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const getCharacterCount = (field) => {
    const maxLengths = {
      fullName: 50,
      email: 100,
      subject: 100,
      message: 1000
    };
    
    return `${formData[field].length}/${maxLengths[field]}`;
  };

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
          <h1 className="text-6xl font-bold text-white">Contact us</h1>
          <p className="text-lg text-white mt-4">
          Get in touch with us for any inquiries, support, or feedback – we're here to help!
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Contact Info Section - 50% width */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold">
                  We are always ready to help you and answer your questions
                </h2>
                <p className="mt-4 text-gray-600">
                  Provide hassle-free friendly support platform to track purchases, manage headwear transport & wearing deeper.
                </p>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Call Center */}
                <div>
                  <h3 className="text-xl font-semibold">Call Center</h3>
                  <p className="mt-2 text-gray-600">800 (246) 913-20-34</p>
                  <p className="text-gray-600">+1 (235) 000-234-5678</p>
                </div>

                {/* Location */}
                <div>
                  <h3 className="text-xl font-semibold">Our Location</h3>
                  <p className="mt-2 text-gray-600">Kitchener, Ontario - N2G</p>
                  <p className="text-gray-600">King Street, Downtown 1</p>
                </div>

                {/* Email */}
                <div>
                  <h3 className="text-xl font-semibold">Email</h3>
                  <p className="mt-2 text-gray-600">info@urbanmonkey.ca</p>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-xl font-semibold">Social network</h3>
                  <div className="flex gap-4 mt-2">
                    <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                    </a>
                    <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                    <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form - 50% width */}
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-lg overflow-hidden bg-white border border-gray-200 shadow-lg">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Get in Touch</h3>
                  <p className="text-gray-600 mb-6">
                    Define your goals and identify areas where Urban Monkey can add value to your business
                  </p>
                  
                  {/* Success Message */}
                  {formSubmitted && (
                    <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                      <p className="font-medium">Message sent successfully!</p>
                      <p className="text-sm">We'll get back to you shortly.</p>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div>
                      <div className="flex justify-between">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <span className="text-xs text-gray-500">{getCharacterCount("fullName")}</span>
                      </div>
                      <input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Full Name"
                        className={`w-full p-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-gray-200`}
                        maxLength="50"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <span className="text-xs text-gray-500">{getCharacterCount("email")}</span>
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="you@example.com"
                        className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-gray-200`}
                        maxLength="100"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <span className="text-xs text-gray-500">{getCharacterCount("subject")}</span>
                      </div>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="How can we help you?"
                        className={`w-full p-3 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-gray-200`}
                        maxLength="100"
                      />
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
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
                        className={`w-full p-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none`}
                        maxLength="1000"
                      ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                      )}
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={Object.values(errors).some(error => error !== "")}
                    >
                      <span>Send message</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </form>
                </div>
                
                {/* Border Animation */}
                <BorderBeam duration={8} size={100} />
                
                {/* Add animation keyframes */}
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
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10">
        <div className="container mx-auto px-6">
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
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;