// const pool = require('../db'); // PostgreSQL pool connection

// class Addr {
//   static tableName = 'addr'; // table name

//   // /**
//   //  * Insert data into addr table
//   //  * @param {Object} data - { name: string, addr: { city, state, pincode } }
//   //  */
//   static async create(data) {
//     const { name, addr } = data;

//     if (!name || !addr) {
//       if (!city && !state && !pincode) {
//   throw new Error('city, state ya pincode me se koi ek required hai');
// }

//       throw new Error('name and addr are required');
//     }

//     const query = `
//       INSERT INTO ${this.tableName} (name, addr)
//       VALUES ($1, ROW($2, $3, $4)::address)
//       RETURNING *;
//     `;

//     const values = [
//       name,
//       addr.city || null,
//       addr.state || null,
//       addr.pincode || null
//     ];

//     const res = await pool.query(query, values);
//     return res.rows[0];
//   }
// }

// module.exports = Addr;





