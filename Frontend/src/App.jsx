// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import { Toaster } from "react-hot-toast";

// // Pages
import Home from "./component/Home";
import Venues from "./component/Venues";
import AuthPage from "./component/AuthPage";
import Profile from "./component/Profile";
import MyBookings from "./component/MyBookings";
import BookNow from "./component/BookNow";
import PaymentPage from "./component/PaymentPage";
import AllBookings from "./component/AllBookings";
import EditVenue from "./component/EditVenue";
import AddVenue from "./component/AddVenue";
import PrivacyPolicy from "./component/PrivacyPolicy";
import TermsAndConditions from "./component/TermsAndConditions";
import RefundPolicy from "./component/RefundPolicy";

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout route */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-bookings" element={< MyBookings />} />
          <Route path="/book-now" element={< BookNow />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/all-bookings" element={< AllBookings />} />
          <Route path="/venues/one/:id" element={<Venues />} />
          <Route path="/edit-venue/:id" element={< EditVenue />} />
          <Route path="/add-venue" element={< AddVenue />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
