import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from '../components/Carousel';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUs = () => {
  const [galleryImages, setGalleryImages] = useState([]);

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
          <h1 className="text-6xl font-bold text-white">About Us</h1>
          <p className="text-lg text-white mt-4">
            Discover the story behind Urban Monkey.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-4xl font-bold">Our Story</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Urban Monkey was founded with a passion for creating timeless and stylish caps that resonate with modern fashion trends. Our journey began in a small workshop, and today, we are proud to serve customers worldwide with our unique collections.
        </p>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-4xl font-bold text-center">Our Team</h2>
        <div className="flex justify-center mt-8 space-x-60">
          <div className="text-center">
            <img
              src="image link"
              alt="Andrew Scherz"
              className="w-32 h-32 rounded-full mx-auto"
            />
            <h3 className="text-xl font-semibold mt-4">Andrew Scherz</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          <div className="text-center">
            <img
              src="image link"
              alt="Andrew Scherz"
              className="w-32 h-32 rounded-full mx-auto"
            />
            <h3 className="text-xl font-semibold mt-4">Andrew Scherz</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          <div className="text-center">
            <img
              src="image link"
              alt="Schummtese"
              className="w-32 h-32 rounded-full mx-auto"
            />
            <h3 className="text-xl font-semibold mt-4">Schummtese</h3>
            <p className="text-gray-600">Creative Director</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-6">
        <h2 className="text-4xl font-bold text-center">Gallery</h2>
        <div className="mt-8">
          <Carousel images={galleryImages} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;