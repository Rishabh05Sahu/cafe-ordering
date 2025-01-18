import React, { createContext, useState,useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, action) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.name === item.name
      );

      if (action === "increment") {
        if (existingItem) {
          return prevCart.map((cartItem) =>
            cartItem.name === item.name
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        } else {
          return [...prevCart, { ...item, quantity: 1 }];
        }
      }

      if (action === "decrement") {
        if (existingItem) {
          return prevCart
            .map((cartItem) =>
              cartItem.name === item.name
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            )
            .filter((cartItem) => cartItem.quantity > 0);
        }
      }

      return prevCart;
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};
