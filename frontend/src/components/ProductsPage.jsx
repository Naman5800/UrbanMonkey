import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-xl">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const ProductsPage = () => {
  // Initialize products as an empty array to prevent errors
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]); // Default price range

  useEffect(() => {
    // Fetching products from MongoDB
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products', {
          params: {
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            query: searchQuery,
          },
        });

        // Log the API response for debugging
        console.log('API Response:', response.data);

        // Ensure the response data is an array before setting it
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('Invalid API response: Expected an array');
          setProducts([]); // Set products to an empty array if the response is invalid
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]); // Set products to an empty array on error
      }
    };

    fetchProducts();
  }, [searchQuery, priceRange]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">All Yours For The Taking</h1>
          <div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded py-2 px-4 w-64"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex">
          {/* Filter Slider */}
          <aside className="w-1/5 pr-6">
            <h2 className="text-2xl font-semibold mb-4">Filter by Price</h2>
            <div className="bg-white p-4 shadow-md rounded">
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-gray-600 mt-2">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </aside>

          {/* Product Cards */}
          <div className="w-4/5 grid md:grid-cols-3 gap-6">
            {/* Ensure products is an array before calling map */}
            {Array.isArray(products) && products.length ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-gray-600 col-span-3">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;