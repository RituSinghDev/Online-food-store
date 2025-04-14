import React, { createContext, useState, useEffect, useCallback } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Define calculateTotal using useCallback to prevent infinite loops
  const calculateTotal = useCallback(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + (item.price * item.quantity), 
      0
    );
    setCartTotal(total);
  }, [cartItems]);

  useEffect(() => {
    // Load cart from localStorage
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage and calculate total
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    calculateTotal();
  }, [cartItems, calculateTotal]);

  const addToCart = (item, size, quantity = 1) => {
    // Check if item already exists with the same size
    const existingItemIndex = cartItems.findIndex(
      cartItem => cartItem._id === item._id && cartItem.size === size
    );

    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    } else {
      // Add new item
      setCartItems([...cartItems, { ...item, size, quantity }]);
    }
  };

  const removeFromCart = (id, size) => {
    setCartItems(cartItems.filter(
      item => !(item._id === id && item.size === size)
    ));
  };

  const updateQuantity = (id, size, quantity) => {
    const updatedCartItems = cartItems.map(item => 
      (item._id === id && item.size === size) 
        ? { ...item, quantity } 
        : item
    );
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        cartTotal, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider; 