import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // 🔁 TOGGLE FAVORITE
  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p._id === product._id);

      if (exists) {
        // ❌ REMOVE
        return prev.filter((p) => p._id !== product._id);
      } else {
        // ✅ ADD
        return [...prev, product];
      }
    });
  };

  // ✅ CHECK
  const isFavorite = (id) =>
    favorites.some((item) => item._id === id);

  return (
    <FavoriteContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);
