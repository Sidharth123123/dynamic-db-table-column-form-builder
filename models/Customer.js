// // // models/Profile.js
// // const mongoose = require('mongoose');

// // const profileSchema = new mongoose.Schema({
// //   name: { type: String, required: true },
// //   age: { type: Number, required: true },
// //   city: { type: String, required: true },
// // });

// // module.exports = mongoose.model('Customer', profileSchema);

// // const pool = require('../db'); // correct path to your db.js


// // class Customer {
// //   static tableName = 'Customer'; // lowercase, no spaces

// //   static async create(data) {
// //     const allowedColumns = ['fname', 'lname', 'city', 'state', 'age', 'type'];
// //     const keys = [];
// //     const values = [];
// //     const placeholders = [];
// //     let i = 1;

// //     for (const key of allowedColumns) {
// //       if (data[key] !== undefined) {
// //         keys.push(key);
// //         values.push(data[key]);
// //         placeholders.push(`$${i}`);
// //         i++;
// //       }
// //     }

// //     if (keys.length === 0) throw new Error('No valid fields provided');

// //     const query = `
// //       INSERT INTO ${this.tableName} (${keys.join(', ')})
// //       VALUES (${placeholders.join(', ')})
// //       RETURNING *;
// //     `;

// //     const res = await pool.query(query, values);
// //     return res.rows[0];
// //   }
// // }

// // module.exports = Customer;




// const pool = require('../db');

// class Customer {
//   static tableName = 'customer';

//   static async create(data) {
//     const allowedColumns = ['fname', 'lname', 'city', 'state', 'age','myaddress', 'type'];
//     const keys = [];
//     const values = [];
//     const placeholders = [];
//     let i = 1;

// for (const key of Object.keys(restData)) {
//   const value = restData[key];
//   if (typeof value === 'object' && value !== null) {
//     await ensureColumnSafe(tblname, key, "JSONB"); 
//     restData[key] = JSON.stringify(value); 
//   } else {
//     await ensureColumnSafe(tblname, key, "TEXT");
//   }
// }


//     if (keys.length === 0) throw new Error('No valid fields provided');

//     const query = `
//       INSERT INTO ${this.tableName} (${keys.join(', ')})
//       VALUES (${placeholders.join(', ')})
//       RETURNING *;
//     `;

//     const res = await pool.query(query, values);
//     return res.rows[0];
//   }
// }

// module.exports = Customer;





// // const pool = require('../db');

// // class Customer {
// //   static tableName = 'customer';

// //   static async create(data) {
// //     const keys = Object.keys(data);
// //     const values = Object.values(data);
// //     const placeholders = keys.map((_, i) => `$${i + 1}`);

// //     if (keys.length === 0) {
// //       throw new Error("No data to insert");
// //     }

// //     const query = `
// //       INSERT INTO ${this.tableName} (${keys.join(', ')})
// //       VALUES (${placeholders.join(', ')})
// //       RETURNING *;
// //     `;

// //     const res = await pool.query(query, values);
// //     return res.rows[0];
// //   }
// // }

// // module.exports = Customer;

