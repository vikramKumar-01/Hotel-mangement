import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const TermsAndConditions = () => {
  const { dark } = useTheme();

  return (
    <motion.div
      className={`max-w-5xl mx-auto p-8 transition-colors duration-500 ${
        dark ? "text-gray-100 bg-gray-900" : "text-gray-900 bg-gray-50"
      } min-h-screen`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold mb-6 text-center border-b-4 border-blue-500 pb-2">
        Terms & Conditions
      </h1>

      <section className={`mb-6 p-6 rounded-lg shadow transition-colors duration-500 ${dark ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-2xl font-semibold mb-2 text-blue-400">Acceptance of Terms</h2>
        <p>
          By using our website or services, you agree to comply with these terms and all applicable laws. If you do not agree, please do not use our services.
        </p>
      </section>

      <section className={`mb-6 p-6 rounded-lg shadow transition-colors duration-500 ${dark ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-2xl font-semibold mb-2 text-blue-400">User Responsibilities</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Provide accurate and truthful information.</li>
          <li>Use services lawfully and ethically.</li>
          <li>Respect copyright, intellectual property, and privacy of others.</li>
        </ul>
      </section>

      <section className={`mb-6 p-6 rounded-lg shadow transition-colors duration-500 ${dark ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-2xl font-semibold mb-2 text-blue-400">Limitation of Liability</h2>
        <p>
          We are not liable for any damages or losses arising from the use of our services, including indirect, incidental, or consequential damages.
        </p>
      </section>

      <section className={`p-6 rounded-lg shadow transition-colors duration-500 ${dark ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-2xl font-semibold mb-2 text-blue-400">Modifications</h2>
        <p>
          We reserve the right to update these terms at any time. Continued use of the services constitutes acceptance of updated terms.
        </p>
      </section>
    </motion.div>
  );
};

export default TermsAndConditions;
