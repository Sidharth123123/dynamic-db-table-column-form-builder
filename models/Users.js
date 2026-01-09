const pool = require("../db");

const Users = {
  findByName: async (name) => {
    const res = await pool.query("SELECT * FROM users WHERE name = $1", [name]);
    return res.rows[0];
  },

  create: async (name, password) => {
    const res = await pool.query(
      "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *",
      [name, password] 
    );
    return res.rows[0];
  }
};

module.exports = Users;






