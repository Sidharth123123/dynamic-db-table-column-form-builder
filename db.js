require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;




// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "sachin",           // PostgreSQL user with privileges
//   host: "localhost",
//   database: "attendance_db",  // DB name
//   password: "sachin123",
//   port: 5432,
// });

// module.exports = pool;


