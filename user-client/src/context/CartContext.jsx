import { createContext, useContext, useState } from "react";

const CartContext = createContext();

/* =========================
   HELPER: VALID MONGO ID
========================= */
const isValidObjectId = (id) => {
  return typeof id === "string" && /^[a-f\d]{24}$/i.test(id);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  /* =========================
     ADD TO CART (SAFE)
  ========================= */
  const addToCart = (item) => {
    // 🚨 BLOCK INVALID PRODUCTS
    if (!item || !isValidObjectId(item._id)) {
      console.error("❌ Invalid product added to cart:", item);
      return;
    }

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

      return [
        ...prev,
        {
          ...item,
          qty: item.qty || 1, // ✅ SAFETY
        },
      ];
    });
  };

  /* =========================
     UPDATE QUANTITY
  ========================= */
  const updateQty = (id, size, qty) => {
    if (!isValidObjectId(id)) return;

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
    if (!isValidObjectId(id)) return;

    setCart((prev) =>
      prev.filter(
        (item) => !(item._id === id && item.size === size)
      )
    );
  };

  /* =========================
     CLEAR CART
  ========================= */
  const clearCart = () => {
    setCart([]); // ✅ CORRECT
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
