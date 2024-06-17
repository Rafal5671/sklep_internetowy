import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    setCartItems(cart);
    updateCartCount(cart);
  }, []);

  const updateCartCount = (cart) => {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  const addToCart = (product, quantity = 1) => {
    let cart = [...cartItems];
    const existingProduct = cart.find((p) => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      product.quantity = quantity;
      cart.push(product);
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    setCartItems(cart);
    updateCartCount(cart);
  };

  const removeFromCart = (productId) => {
    const cart = cartItems.filter(item => item.id !== productId);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    setCartItems(cart);
    updateCartCount(cart);
  };

  const updateQuantity = (productId, quantity) => {
    const cart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
    );
    sessionStorage.setItem('cart', JSON.stringify(cart));
    setCartItems(cart);
    updateCartCount(cart);
  };

  const clearCart = () => {
    sessionStorage.removeItem('cart');
    setCartItems([]);
    setCartCount(0);
  };

  return (
    <CartContext.Provider value={{ cartCount, cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
