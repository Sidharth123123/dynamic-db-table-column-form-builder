// // // models/Person.js
// // const mongoose = require('mongoose');

// // const personSchema = new mongoose.Schema({
// //   fName: { type: String, required: true },
// //   lName: { type: String, required: true },
// //   age: { type: Number, required: true },
// //   city: { type: String, required: true },
// //   state: { type: String, required: true },
// // });

// // module.exports = mongoose.model('Seler', personSchema);









const pool = require('../db');

class Seller {
  static tableName = 'seller';

  static async create(data) {
  const keys = [];
const values = [];
const placeholders = [];
let i = 1;

for (const key in data) {
  if (data[key] !== undefined && data[key] !== null) {
    keys.push(key);
    values.push(data[key]);
    placeholders.push(`$${i}`);
    i++;
  }
}

    if (keys.length === 0) throw new Error('No valid fields provided');

    const query = `
      INSERT INTO ${this.tableName} (${keys.join(', ')})
      VALUES (${placeholders.join(', ')})
      RETURNING *;
    `;

    const res = await pool.query(query, values);
    return res.rows[0];
  }
}

module.exports = Seller;




