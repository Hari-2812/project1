import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  /* ======================
     INITIAL USER LOAD
  ====================== */
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      console.error("Invalid user data in localStorage");
      return null;
    }
  });

  /* ======================
     AUTH CHECK ON LOAD
     (NO res USED HERE)
  ====================== */
  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🚨 If token missing → logout
    if (!token) {
      setUser(null);
      localStorage.removeItem("user");
    }
  }, []);

  /* ======================
     LOGOUT HELPER (OPTIONAL)
  ====================== */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout, // ✅ available if needed
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
