require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
const authRoutes = require("./routes/authRoutes");
const feedRoutes = require("./routes/feedRoutes");
app.use("/auth", authRoutes);
app.use("/feed", feedRoutes);

// Connect to Firebase
const admin = require("firebase-admin");
const serviceAccount = require("./config/firebase.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
