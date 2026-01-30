import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  /* =========================
     ADD TO CART (FIXED)
  ========================= */
  const addToCart = (item) => {
    if (!item || !item._id) {
      console.error("❌ Invalid cart item:", item);
      return;
    }

    setCart((prev) => {
      const existing = prev.find(
        (p) => p._id === item._id && p.size === item.size
      );

      if (existing) {
        return prev.map((p) =>
          p._id === item._id && p.size === item.size
            ? { ...p, qty: p.qty + (item.qty || 1) }
            : p
        );
      }

      return [
        ...prev,
        {
          _id: item._id,
          name: item.name,
          price: Number(item.price),
          image: item.image,
          size: item.size || "M",
          qty: item.qty || 1,
        },
      ];
    });
  };

  /* =========================
     UPDATE QTY
  ========================= */
  const updateQty = (id, size, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.size === size
          ? { ...item, qty: Math.max(1, qty) }
          : item
      )
    );
  };

  /* =========================
     REMOVE ITEM
  ========================= */
  const removeFromCart = (id, size) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item._id === id && item.size === size)
      )
    );
  };

  /* =========================
     CLEAR CART
  ========================= */
  const clearCart = () => setCart([]);

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
