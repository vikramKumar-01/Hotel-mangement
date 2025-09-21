import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const PaymentPage = () => {
  const { dark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [paid, setPaid] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});

  useEffect(() => {
    if (!bookingData) {
      toast.error("Booking details not found!");
      navigate("/");
      return;
    }
  }, [bookingData, navigate]);

  const handlePaymentDetailsChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    if (
      (paymentMethod === "Credit Card" &&
        (!paymentDetails.cardNumber || !paymentDetails.expiry || !paymentDetails.cvv)) ||
      (paymentMethod === "UPI" && !paymentDetails.upiId) ||
      (paymentMethod === "NetBanking" && !paymentDetails.bankName)
    ) {
      toast.error("Please fill all required payment details!");
      return;
    }

    setPaid(true);
    toast.success("Payment successful!");
  };

  const generateTXT = () => {
    if (!bookingData) return;

    const content = `
Booking Ticket
--------------
Venue: ${bookingData.venueName || bookingData.venue}
Date: ${bookingData.date}
Guests: ${bookingData.guests}
Requirements: ${bookingData.requirements || "None"}
Payment Method: ${paymentMethod}
Amount Paid: ₹${bookingData.price}
✅ Payment Successful!
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "booking-ticket.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!bookingData) return null;

  return (
    <div className={`min-h-screen flex flex-col items-center p-4 space-y-6 transition-colors ${dark ? "bg-gray-950 text-gray-200" : "bg-gray-50 text-gray-900"}`}>
      {!paid ? (
        <motion.div
          className={`w-full max-w-md p-6 rounded-3xl shadow-2xl transition-colors ${dark ? "bg-gray-850" : "bg-white"}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-center mb-6 text-yellow-500">Complete Payment</h2>

          <div className="space-y-4">
            <p><span className="font-semibold">Venue:</span> {bookingData.venueName || bookingData.venue}</p>
            <p><span className="font-semibold">Date:</span> {bookingData.date}</p>
            <p><span className="font-semibold">Guests:</span> {bookingData.guests}</p>
            <p><span className="font-semibold">Requirements:</span> {bookingData.requirements || "None"}</p>
            <p className="text-2xl font-bold text-yellow-400">Amount: ₹{bookingData.price}</p>
          </div>

          <label className="block mt-5">
            <span className="text-gray-700 dark:text-gray-300 font-semibold">Payment Method</span>
            <select
              value={paymentMethod}
              onChange={(e) => { setPaymentMethod(e.target.value); setPaymentDetails({}); }}
              className={`mt-2 block w-full px-4 py-2 rounded-xl border ${dark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-gray-100 text-gray-900"} focus:ring-2 focus:ring-yellow-400`}
            >
              <option value="Credit Card">Credit Card</option>
              <option value="UPI">UPI</option>
              <option value="NetBanking">NetBanking</option>
              <option value="Cash on Arrival">Cash on Arrival</option>
            </select>
          </label>

          {paymentMethod === "Credit Card" && (
            <div className={`mt-4 p-5 rounded-xl shadow-lg ${dark ? "bg-gray-800" : "bg-gray-100"}`}>
              <p className="font-semibold mb-3 text-lg">Credit Card Details</p>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={paymentDetails.cardNumber || ""}
                onChange={handlePaymentDetailsChange}
                className={`w-full px-4 py-3 rounded-lg border mb-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none ${dark ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"}`}
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={paymentDetails.expiry || ""}
                  onChange={handlePaymentDetailsChange}
                  className={`flex-1 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:outline-none ${dark ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"}`}
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={paymentDetails.cvv || ""}
                  onChange={handlePaymentDetailsChange}
                  className={`w-24 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:outline-none ${dark ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"}`}
                />
              </div>
            </div>
          )}

          {paymentMethod === "UPI" && (
            <input
              type="text"
              name="upiId"
              placeholder="UPI ID (example@upi)"
              value={paymentDetails.upiId || ""}
              onChange={handlePaymentDetailsChange}
              className="mt-4 w-full px-4 py-3 rounded-xl border shadow-sm focus:ring-2 focus:ring-yellow-400"
            />
          )}

          {paymentMethod === "NetBanking" && (
            <input
              type="text"
              name="bankName"
              placeholder="Bank Name"
              value={paymentDetails.bankName || ""}
              onChange={handlePaymentDetailsChange}
              className="mt-4 w-full px-4 py-3 rounded-xl border shadow-sm focus:ring-2 focus:ring-yellow-400"
            />
          )}

          <motion.button
            onClick={handlePayment}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold rounded-xl shadow-lg transition"
          >
            Pay Now
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          id="ticket"
          className={`w-full max-w-md p-6 rounded-3xl shadow-2xl transition-colors ${dark ? "bg-gray-850 text-gray-100" : "bg-white text-gray-900"}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-center mb-5 text-yellow-500">🎫 Booking Ticket</h2>
          <div className="space-y-3 border-t border-b py-5 px-4 rounded-xl shadow-sm bg-gray-50 dark:bg-gray-800">
            <p><span className="font-semibold">Venue:</span> {bookingData.venueName || bookingData.venue}</p>
            <p><span className="font-semibold">Date:</span> {bookingData.date}</p>
            <p><span className="font-semibold">Guests:</span> {bookingData.guests}</p>
            <p><span className="font-semibold">Requirements:</span> {bookingData.requirements || "None"}</p>
            <p><span className="font-semibold">Payment Method:</span> {paymentMethod}</p>
            <p className="text-2xl font-bold text-yellow-400">Amount Paid: ₹{bookingData.price}</p>
            <p className="mt-2 text-center text-green-500 font-bold text-lg">✅ Payment Successful!</p>
            <div className="mt-5 flex justify-center">
              <div className="w-28 h-28 bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold rounded-xl text-xl">
                QR
              </div>
            </div>
          </div>

          <motion.button
            onClick={generateTXT}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg transition"
          >
            Download Ticket TXT
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default PaymentPage;
