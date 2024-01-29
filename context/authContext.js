// Remove the "use client"; statement
// "use client";
import { createContext, useContext, useState } from "react";
import { login as apiLogin } from "../api/api";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const isBrowser = typeof window !== "undefined";

  const [token, setToken] = useState(
    isBrowser ? localStorage.getItem("token") || null : null
  );
  const [loading, setLoading] = useState(false);
  console.log("load", loading);

  const login = async ({ username, password }) => {
    setLoading(true);

    console.log("eeee", username, password);
    try {
      setLoading(true);
      const token = await apiLogin(username, password);
      console.log("token", token);
      localStorage.setItem("token", token);
      setToken(token);
      setLoading(false);
    } catch (error) {
      console.error("Login failed:", error);
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("You have successfully logged out!");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider };
