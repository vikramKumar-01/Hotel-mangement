const express = require('express');
const dbConnection = require('./Config/db');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors");   
const fs = require("fs");
const path = require("path");
const PORT =process.env.PORT
require('dotenv').config();

// ✅ Uploads folder ka absolute path
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}




const authRoutes = require("./routes/authRoutes");
const venueRoutes = require("./routes/venueRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

// ✅ CORS enable karo
app.use(cors({
    origin: "http://localhost:5173", // frontend ka URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/user", authRoutes);
app.use("/venues", venueRoutes);
app.use("/admin", adminRoutes);
app.use("/booking", bookingRoutes);
app.use("/uploads", express.static("uploads"));

dbConnection().then(() => {
    console.log("database connection established...");
    app.listen(PORT, () => {
        console.log("server run successfully");
    });
}).catch((err) => {
    console.error("Database cannot be connected!", err.message);
});
