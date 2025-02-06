// Footer.js
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold">About</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/about" className="hover:text-gray-400">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-400">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-gray-400">
                Careers
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Customer Service</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/shipping" className="hover:text-gray-400">
                Shipping
              </Link>
            </li>
            <li>
              <Link to="/returns" className="hover:text-gray-400">
                Returns Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-gray-400">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="hover:text-gray-400">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center mt-10 text-gray-500">
        © 2025 Urban Monkey. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
