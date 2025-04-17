import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const AdminPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    features: [],
    compatibility: [],
    rating: 0,
    inStock: true,
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if admin is logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle array inputs (features, compatibility)
  const handleArrayChange = (e, field) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setFormData((prev) => ({
      ...prev,
      [field]: values,
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      image: "",
      description: "",
      category: "",
      features: [],
      compatibility: [],
      rating: 0,
      inStock: true,
    });
    setEditingProductId(null);
  };

  // Handle form submission (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const data = {
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating),
      };

      if (editingProductId) {
        // Update product
        const response = await axios.put(
          `http://localhost:5000/api/products/${editingProductId}`,
          data
        );
        setProducts((prev) =>
          prev.map((p) => (p._id === editingProductId ? response.data : p))
        );
        setSuccess("Product updated successfully");
      } else {
        // Add new product
        const response = await axios.post("http://localhost:5000/api/products", data);
        setProducts((prev) => [...prev, response.data]);
        setSuccess("Product added successfully");
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save product");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit product
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
      features: product.features || [],
      compatibility: product.compatibility || [],
      rating: product.rating,
      inStock: product.inStock,
    });
    setEditingProductId(product._id);
  };

  // Handle delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setSuccess("Product deleted successfully");
    } catch (err) {
      setError("Failed to delete product");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-900">
      <Navbar />
      <motion.section
        className="py-16 px-6"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>

          {/* Notifications */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
              >
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {editingProductId ? "Edit Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: "name", label: "Name", type: "text", placeholder: "Product Name" },
                { id: "price", label: "Price", type: "number", placeholder: "Price", step: "0.01" },
                { id: "image", label: "Image URL", type: "text", placeholder: "Image URL" },
                { id: "description", label: "Description", type: "text", placeholder: "Description" },
                {
                  id: "category",
                  label: "Category",
                  type: "text",
                  placeholder: "e.g., Clothing, Accessories",
                },
                {
                  id: "features",
                  label: "Features (comma-separated)",
                  type: "text",
                  placeholder: "e.g., Waterproof, Adjustable",
                },
                {
                  id: "compatibility",
                  label: "Compatibility (comma-separated)",
                  type: "text",
                  placeholder: "e.g., Unisex, All Seasons",
                },
                { id: "rating", label: "Rating", type: "number", placeholder: "Rating", step: "0.1" },
              ].map((field, index) => (
                <motion.div
                  key={field.id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    value={
                      field.id === "features" || field.id === "compatibility"
                        ? formData[field.id].join(", ")
                        : formData[field.id]
                    }
                    onChange={
                      field.id === "features" || field.id === "compatibility"
                        ? (e) => handleArrayChange(e, field.id)
                        : handleChange
                    }
                    placeholder={field.placeholder}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step={field.step}
                  />
                </motion.div>
              ))}
              <motion.div
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.8 }}
                className="flex items-center space-x-4"
              >
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span>In Stock</span>
                </label>
              </motion.div>
              <motion.div
                className="sm:col-span-2 flex space-x-4"
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.9 }}
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : editingProductId ? "Update Product" : "Add Product"}
                </button>
                {editingProductId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-300 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                )}
              </motion.div>
            </form>
          </div>

          {/* Product Table */}
          <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4">Products</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["Name", "Price", "Category", "Image", "Actions"].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product, index) => (
                  <motion.tr
                    key={product._id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && (
              <p className="text-center text-gray-600 py-4">No products found.</p>
            )}
          </div>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default AdminPage;