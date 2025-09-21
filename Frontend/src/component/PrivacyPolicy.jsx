import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const PrivacyPolicy = () => {
  const { dark } = useTheme();

  return (
    <motion.div
      className={`max-w-5xl mx-auto p-8 transition-colors duration-500 ${
        dark ? "text-gray-100 bg-gray-900" : "text-gray-900 bg-gray-50"
      } min-h-screen`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold mb-6 text-center border-b-4 border-yellow-400 pb-2">
        Privacy Policy
      </h1>

      <section className={`mb-6 p-6 rounded-lg shadow transition-colors duration-500 ${dark ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-2xl font-semibold mb-2 text-yellow-400">Introduction</h2>
        <p>
          We take your privacy seriously. This Privacy Policy explains what personal information we collect, how we use it, and the measures we take to protect your data.
        </p>
      </section>

      <section className={`mb-6 p-6 rounded-lg shadow transition-colors duration-500 ${dark ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-2xl font-semibold mb-2 text-yellow-400">Information We Collect</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Personal information such as your name, email, phone number, and address.</li>
          <li>Account information when you register or log in.</li>
          <li>Usage data including pages visited, interactions, and preferences.</li>
          <li>Cookies and similar technologies for analytics and personalization.</li>
          <li>Third-party data if you use integrated services or social logins.</li>
        </ul>
      </section>

      <section className={`mb-6 p-6 rounded-lg shadow transition-colors duration-500 ${dark ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-2xl font-semibold mb-2 text-yellow-400">How We Use Your Information</h2>
        <p>
          We use your data to provide and improve our services, personalize your experience, communicate important updates, and comply with legal obligations. We do not sell your personal information to third parties.
        </p>
      </section>

      <section className={`p-6 rounded-lg shadow transition-colors duration-500 ${dark ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-2xl font-semibold mb-2 text-yellow-400">Your Rights</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>You can access and update your personal information.</li>
          <li>You can request deletion of your data.</li>
          <li>You can manage cookies and communication preferences.</li>
          <li>You have the right to withdraw consent at any time.</li>
        </ul>
      </section>
    </motion.div>
  );
};

export default PrivacyPolicy;
