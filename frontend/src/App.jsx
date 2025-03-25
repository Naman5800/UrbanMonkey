import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react'; // Import ClerkProvider
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import ProtectedRoute from './components/ProtectedRoute';
import AboutUs from './components/AboutUs';
import ContactPage from './components/ContactPage';
import ProductDetailsPage from './components/ProductDetailsPage';

// Replace with your Clerk publishable key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log("Loaded Clerk Key:", import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);


const App = () => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactPage />} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
};

export default App;