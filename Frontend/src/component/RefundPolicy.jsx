import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const RefundPolicy = () => {
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
      <h1 className="text-4xl font-bold mb-6 text-center border-b-4 border-red-500 pb-2">
        Refund Policy
      </h1>

      <section className={`mb-6 p-6 rounded-lg shadow transition-colors duration-500 ${dark ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-2xl font-semibold mb-2 text-red-400">Eligibility for Refund</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Service not delivered as described or promised.</li>
          <li>Technical issues preventing access or usage.</li>
          <li>Booking errors due to website malfunction.</li>
        </ul>
      </section>

      <section className={`mb-6 p-6 rounded-lg shadow transition-colors duration-500 ${dark ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-2xl font-semibold mb-2 text-red-400">Refund Process</h2>
        <p>
          Contact our support within 7 days of the issue. Provide booking ID and reason for refund. Refunds will be processed within 5-10 business days to the original payment method.
        </p>
      </section>

      <section className={`p-6 rounded-lg shadow transition-colors duration-500 ${dark ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-2xl font-semibold mb-2 text-red-400">Exceptions</h2>
        <p>
          Refunds are not applicable for voluntary cancellations after the booking confirmation or due to change of mind. Special cases may be considered at our discretion.
        </p>
      </section>
    </motion.div>
  );
};

export default RefundPolicy;
