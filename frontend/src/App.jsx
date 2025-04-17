import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import HomePage from "./components/HomePage";
import ProductsPage from "./components/ProductsPage";
import AboutUs from "./components/AboutUs";
import ContactPage from "./components/ContactPage";
import ProductDetailsPage from "./components/ProductDetailsPage";
import PaymentPage from "./components/PaymentPage";
import CartPage from "./components/CartPage";
import OrdersPage from "./components/OrdersPage";
import AdminPage from "./components/AdminPage";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY in .env.local");
}

function AppContent() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

const App = () => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <AppContent />
      </Router>
    </ClerkProvider>
  );
};

export default App;