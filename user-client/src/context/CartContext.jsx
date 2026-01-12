import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find(
        (p) => p._id === item._id && p.size === item.size
      );

      if (existing) {
        return prev.map((p) =>
          p._id === item._id && p.size === item.size
            ? { ...p, qty: p.qty + item.qty }
            : p
        );
      }

      return [...prev, item];
    });
  };

  const updateQty = (id, size, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.size === size
          ? { ...item, qty }
          : item
      )
    );
  };

  const removeFromCart = (id, size) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item._id === id && item.size === size)
      )
    );
  };

  const clearCart = () => {
    setCart([]); // ✅ IMPORTANT
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
