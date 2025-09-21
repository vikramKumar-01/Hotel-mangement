import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from "react";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext({
  user: null,
  role: "guest",
  isAuthenticated: false,
  loading: true,
  loginUser: async () => {},
  logoutUser: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const setGuest = () => {
    setUser(null);
    setRole("guest");
    setIsAuthenticated(false);
  };

  const fetchProfile = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/user/profile"); // cookies auto-sent
      if (res.data?.role) {
        setUser(res.data);
        setRole(res.data.role);
        setIsAuthenticated(true);
      } else {
        setGuest();
      }
    } catch (err) {
      console.error("Profile fetch error:", err?.response?.data || err.message);
      setGuest();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // ---- Login via Context (DON'T login from component) ----
  const loginUser = useCallback(async ({ email, password }) => {
    const res = await axiosInstance.post("/user/login", { email, password });
    // Login successful => fetch profile to get role and other fields
    await fetchProfile();
    return res.data;
  }, [fetchProfile]);

  // ---- Logout via Context ----
  const logoutUser = useCallback(async () => {
    try {
      await axiosInstance.post("/user/logout"); // single endpoint
    } catch (err) {
      console.error("Logout API error:", err?.response?.data || err.message);
    } finally {
      setGuest();
      // Optional: clear client caches if you store anything
      localStorage.clear();
      sessionStorage.clear();
    }
  }, []);

  const contextValue = useMemo(
    () => ({ user, role, isAuthenticated, loading, loginUser, logoutUser }),
    [user, role, isAuthenticated, loading, loginUser, logoutUser]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
