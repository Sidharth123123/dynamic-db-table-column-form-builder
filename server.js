require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const pool = require('./db'); 

const app = express();
const path = require("path");

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
// 
pool.query('SELECT 1')
  .then(() => {
    console.log('✅ PostgreSQL Connected');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ PostgreSQL connection error:', err.message);
    process.exit(1);

  });








//   require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const authRoutes = require("./routes/authRoutes");
// const pool = require("./db");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);

// // ✅ PostgreSQL connection test
// pool.query("SELECT 1")
//   .then(() => console.log("✅ PostgreSQL Connected"))
//   .catch(err => {
//     console.error("❌ PostgreSQL connection error:", err.message);
//     process.exit(1);
//   });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));










