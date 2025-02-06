import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src={logo} 
            alt="Urban Monkey Logo" 
            className="h-10"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <Link to="/categories" className="hover:text-blue-600">Categories</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
        </div>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="text-gray-800 hover:text-blue-600">
            Profile
          </Link>
          <Link to="/cart" className="text-gray-800 hover:text-blue-600">
            Cart
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus:outline-none"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link to="/" className="block py-2 hover:bg-gray-100">Home</Link>
            <Link to="/products" className="block py-2 hover:bg-gray-100">Products</Link>
            <Link to="/categories" className="block py-2 hover:bg-gray-100">Categories</Link>
            <Link to="/about" className="block py-2 hover:bg-gray-100">About</Link>
            <div className="flex justify-between py-2">
              <Link to="/login">Login</Link>
              <Link to="/cart">Cart</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;