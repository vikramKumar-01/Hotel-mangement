import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { dark } = useTheme();
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (!validateEmail(email)) { setMessage("Invalid email address!"); setIsError(true); return; }
    if (!validatePassword(password)) { setMessage("Password must be at least 6 chars, include 1 number & 1 special char."); setIsError(true); return; }

    setLoading(true);
    try {
      if (isLogin) {
        // ✅ Single call via Context (no direct axios here)
        await loginUser({ email, password });
        navigate("/profile");
      } else {
        // ✅ Signup using axiosInstance (server should NOT auto-login on signup)
        const res = await axiosInstance.post("/user/signup", { name, email, password });
        if (res.data?.error === "AccountExists") {
          setMessage("Account already exists! Please login.");
          setIsError(true);
        } else {
          setMessage("Signup successful! Please login.");
          setIsError(false);
          setIsLogin(true);
        }
      }
      setName(""); setEmail(""); setPassword("");
    } catch (err) {
      setMessage(err?.response?.data?.error || "Something went wrong!");
      setIsError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className={`flex flex-col w-96 rounded-xl shadow-2xl ${dark ? "bg-gray-800" : "bg-gradient-to-br from-yellow-50 via-white to-yellow-100"} p-8`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${dark ? "text-white" : "text-gray-900"}`}>{isLogin ? "Login" : "Signup"}</h2>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${dark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"}`} required />
          )}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className={`px-4 py-2 rounded-lg border ${dark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"}`} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className={`px-4 py-2 rounded-lg border ${dark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"}`} required />

          {message && (<p className={`text-sm mt-1 ${isError ? "text-red-500" : "text-green-500"}`}>{message}</p>)}

          <button type="submit" className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-semibold transition" disabled={loading}>
            {loading ? (isLogin ? "Logging in..." : "Signing up...") : isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p className={`text-center mt-4 text-sm ${dark ? "text-gray-300" : "text-gray-700"}`}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => { setIsLogin(!isLogin); setMessage(""); setIsError(false); }} className="text-yellow-400 font-semibold cursor-pointer hover:underline">
            {isLogin ? "Signup" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
