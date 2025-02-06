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
          ))}
        </div>
      </section>

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
    </div>
  );
};

export default HomePage;