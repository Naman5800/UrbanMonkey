import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-black shadow-md py-8 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and About */}
        <div className="flex flex-col items-start">
          <img 
            src={logo} 
            alt="Urban Monkey Logo" 
            className="h-10 mb-4"
          />
          <p className="text-white text-sm">
            Urban Monkey - Crafting spaces that harmonize modern aesthetics with timeless elegance.
          </p>
        </div>

        {/* About Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">About</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="text-white hover:text-gray-300">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:text-gray-300">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/careers" className="text-white hover:text-gray-300">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/shipping" className="text-white hover:text-gray-300">
                Shipping
              </Link>
            </li>
            <li>
              <Link to="/returns" className="text-white hover:text-gray-300">
                Returns Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-white hover:text-gray-300">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <ul className="space-y-2">
            <li>
              <a href="https://www.instagram.com" className="text-white hover:text-gray-300">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com" className="text-white hover:text-gray-300">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" className="text-white hover:text-gray-300">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center mt-8 text-gray-300 text-sm">
        © 2025 Urban Monkey. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;