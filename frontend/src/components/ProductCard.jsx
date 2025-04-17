import React from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";

const ProductCard = ({ product, onProductClick, onNotify }) => {
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) {
      onProductClick(true, `/product/${product._id}`);
      return;
    }

    try {
      // Update sessionStorage first for reliability
      const existingCart = JSON.parse(sessionStorage.getItem('cart') || '[]');
      const existingItemIndex = existingCart.findIndex(item => item.productId === product._id);

      if (existingItemIndex > -1) {
        existingCart[existingItemIndex].quantity += 1;
      } else {
        existingCart.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        });
      }

      sessionStorage.setItem('cart', JSON.stringify(existingCart));

      // Attempt backend sync if authenticated
      try {
        const token = await getToken();
        if (token) {
          await axios.post(
            'http://localhost:5000/api/users/cart',
            { productId: product._id, quantity: 1 },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
        }
      } catch (authError) {
        console.warn('Backend sync failed, proceeding with local cart:', authError);
        // Continue with local cart update
      }

      onNotify("Product added to cart!", "success");
      console.log("Updated cart:", existingCart);
    } catch (error) {
      console.error('Error adding to cart:', error);
      onNotify("Failed to add product to cart", "error");
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) {
      onProductClick(true, window.location.pathname);
      return;
    }

    const existingWishlist = JSON.parse(sessionStorage.getItem('wishlist') || '[]');
    if (!existingWishlist.some(item => item.productId === product._id)) {
      existingWishlist.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image
      });
      sessionStorage.setItem('wishlist', JSON.stringify(existingWishlist));
      onNotify("Added to wishlist!", "success");
    } else {
      onNotify("Product already in wishlist!", "error");
    }
    console.log("Updated wishlist:", existingWishlist);
  };

  const handleClickProduct = (e) => {
    if (!isSignedIn) {
      e.preventDefault();
      onProductClick(true, `/product/${product._id}`);
    }
  };

  return (
    <div className="block">
      <div className="relative bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 w-full h-auto text-center">
        <div className="absolute top-3 right-3 flex flex-col space-y-2 z-10">
          <div onClick={handleAddToWishlist}>
            <FaHeart className="text-gray-600 hover:text-red-500 cursor-pointer text-lg" />
          </div>
          <div onClick={handleAddToCart}>
            <FaShoppingCart className="text-gray-600 hover:text-blue-600 cursor-pointer text-lg" />
          </div>
        </div>

        <Link to={`/product/${product._id}`} onClick={handleClickProduct}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-sm sm:text-base md:text-lg">{product.name}</h3>
            <p className="text-gray-600 text-sm sm:text-base">${product.price}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;