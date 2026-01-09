

// // // // // const Customer = require("../models/Customer");



// // const Customer = require('../models/Customer'); // Correct name

// // const Seller = require('../models/Seller');






// // // // // const models = {
// // // // //   customer: Customer,
// // // // //   seler: Seler
// // // // // };





// // // // // exports.Custsel = async (req, res) => {
// // // // //   try {
// // // // //     const { type, ...restData } = req.body;

// // // // //     if (!type) {
// // // // //       return res.status(400).json({ message: "type is required" });
// // // // //     }

// // // // //     const Model = models[type.toLowerCase()];
// // // // //     if (!Model) {
// // // // //       return res.status(400).json({ message: "Invalid type" });
// // // // //     }

// // // // //     const docData = {};
// // // // //     const fields = Object.keys(restData);

// // // // //     fields.forEach(field => {
// // // // //       docData[field] = restData[field];
// // // // //       console.log(`Field: ${field} = ${restData[field]}`);
// // // // //     });

// // // // //     console.log("Type:", type);
// // // // //     console.log("Total fields:", fields.length);
// // // // //     console.log("Fields list:", fields);

// // // // //     const doc = new Model(docData);
// // // // //     await doc.save();

// // // // //     return res.status(201).json({
// // // // //       message: `${type} created successfully`,
// // // // //       type,
// // // // //       totalFields: fields.length,
// // // // //       fields,
// // // // //       data: doc
// // // // //     });

// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     return res.status(500).json({
// // // // //       message: "Creation failed",
// // // // //       error: err.message
// // // // //     });
// // // // //   }
// // // // // };


// // // // // 🔹 Map types to models







// // // // // function getModel(type) {
// // // // //   try {
// // // // //     const fileName = type.charAt(0).toUpperCase() + type.slice(1); 
// // // // //     const modelPath = path.join(__dirname, "../models", fileName);
// // // // //     const Model = require(modelPath);
// // // // //     return Model;
// // // // //   } catch (err) {
// // // // //     console.error(`Model not found for type: ${type}`);
// // // // //     return null;
// // // // //   }
// // // // // }


// // // // // exports.Custsel = async (req, res) => {
// // // // //   try {
// // // // //     const dataArray = Array.isArray(req.body) ? req.body : [req.body];
// // // // //     const results = [];

// // // // //     for (const item of dataArray) {
// // // // //       const { type, ...restData } = item;

// // // // //       if (!type) {
// // // // //         results.push({ status: "failed", reason: "type is required", item });
// // // // //         continue;
// // // // //       }

// // // // //       const Model = getModel(type);
// // // // //       if (!Model) {
// // // // //         results.push({ status: "failed", reason: `Model not found for type: ${type}`, item });
// // // // //         continue;
// // // // //       }

// // // // //       const docData = {};
// // // // //       const fields = Object.keys(restData);

// // // // //       fields.forEach(field => {
// // // // //         docData[field] = restData[field];
// // // // //         console.log(`Field: ${field} = ${restData[field]}`);
// // // // //       });

// // // // //       const doc = new Model(docData);
// // // // //       await doc.save();

// // // // //       results.push({
// // // // //         status: "success",
// // // // //         type,
// // // // //         totalFields: fields.length,
// // // // //         fields,
// // // // //         data: doc
// // // // //       });
// // // // //     }

// // // // //     return res.status(201).json({
// // // // //       message: "Batch creation completed",
// // // // //       results
// // // // //     });

// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     return res.status(500).json({
// // // // //       message: "Creation failed",
// // // // //       error: err.message
// // // // //     });
// // // // //   }
// // // // // };




// // // // exports.Custsel = async (req, res) => {
// // // //   try {
// // // //     const dataArray = Array.isArray(req.body) ? req.body : [req.body];
// // // //     const results = [];
// // // //     for (const item of dataArray) {
// // // //       if (!item.type) {
// // // //         results.push({ status: "failed", reason: "type is required", item });
// // // //         continue;
// // // //       }

// // // //       try {
// // // //         const inserted = await Customer.create(item); // CustomerModel -> Customer
// // // //         results.push({ status: "success", data: inserted });
// // // //         console.log(inserted, "insertedinsertedinsertedinserted")
// // // //       } catch (err) {
// // // //         console.error(err);
// // // //         results.push({ status: "failed", reason: err.message, item });
// // // //       }
// // // //     }

// // // //     return res.status(201).json({ message: "Batch insertion completed", results });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     return res.status(500).json({ message: "Insertion failed", error: err.message });
// // // //   }
// // // // };












// // // // exports.SellerInsert = async (req, res) => {
// // // //   try {
// // // //     const dataArray = Array.isArray(req.body) ? req.body : [req.body];
// // // //     const results = [];

// // // //   for (const item of dataArray) {
// // // //   if (!item.type || !item.email) {
// // // //     results.push({
// // // //       status: "failed",
// // // //       reason: "type and email are required",
// // // //       item
// // // //     });
// // // //     continue;
// // // //   }

// // // //   try {
// // // //     const inserted = await Seller.create(item);
// // // //     results.push({ status: "success", data: inserted });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     results.push({ status: "failed", reason: err.message, item });
// // // //   }
// // // // }

// // // //     return res.status(201).json({ message: "Batch insertion completed", results });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     return res.status(500).json({ message: "Insertion failed", error: err.message });
// // // //   }
// // // // };














// // // // exports.CustSelInsert = async (req, res) => {
// // // //   try {
// // // //     const dataArray = Array.isArray(req.body) ? req.body : [req.body];
// // // //     const results = [];

// // // //     for (const item of dataArray) {

// // // //       // COMMON VALIDATION
// // // //       if (!item.type) {
// // // //         results.push({
// // // //           status: "failed",
// // // //           reason: "type is required (seller | customer)",
// // // //           item
// // // //         });
// // // //         continue;
// // // //       }

// // // //       const type = item.type.trim().toLowerCase();

// // // //       try {

// // // //         // 🔥 SELLER FLOW
// // // //         if (type === 'seller') {

// // // //           if (!item.email) {
// // // //             results.push({
// // // //               status: "failed",
// // // //               reason: "email is required for seller",
// // // //               item
// // // //             });
// // // //             continue;
// // // //           }

// // // //           item.email = item.email.trim().toLowerCase();
// // // //           item.type = 'seller'; // force

// // // //           const inserted = await Seller.create(item);
// // // //           results.push({
// // // //             status: "success",
// // // //             table: "seller",
// // // //             data: inserted
// // // //           });

// // // //         }

// // // //         // 🔥 CUSTOMER FLOW
// // // //         else if (type === 'customer') {

// // // //           item.type = 'customer'; // force

// // // //           const inserted = await Customer.create(item);
// // // //           results.push({
// // // //             status: "success",
// // // //             table: "customer",
// // // //             data: inserted
// // // //           });

// // // //         }

// // // //         // ❌ INVALID TYPE
// // // //         else {
// // // //           results.push({
// // // //             status: "failed",
// // // //             reason: "invalid type (allowed: seller, customer)",
// // // //             item
// // // //           });
// // // //         }

// // // //       } catch (err) {

// // // //         // DUPLICATE EMAIL (SELLER)
// // // //         if (err.code === '23505') {
// // // //           results.push({
// // // //             status: "failed",
// // // //             reason: "duplicate email",
// // // //             item
// // // //           });
// // // //         } else {
// // // //           results.push({
// // // //             status: "failed",
// // // //             reason: err.message,
// // // //             item
// // // //           });
// // // //         }
// // // //       }
// // // //     }

// // // //     return res.status(201).json({
// // // //       message: "Batch insertion completed",
// // // //       results
// // // //     });

// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     return res.status(500).json({
// // // //       message: "Insertion failed",
// // // //       error: err.message
// // // //     });
// // // //   }
// // // // };
























// // // const Seller = require('../models/Seller');
// // // const Customer = require('../models/Customer');
// // // const Addr = require('../models/Addr');
// // // const pool = require('../db'); // ek folder upar jao


// // // const path = require('path');




// // // // Dynamic model loader
// // // function getModel(type) {
// // //   try {
// // //     // Capitalize first letter for file name (Seller.js, Customer.js)
// // //     const fileName = type.charAt(0).toUpperCase() + type.slice(1);
// // //     const modelPath = path.join(__dirname, "../models", fileName);
// // //     const Model = require(modelPath);
// // //     return Model;
// // //   } catch (err) {
// // //     console.error(`Model not found for type: ${type}`);
// // //     return null;
// // //   }
// // // }

// // // exports.CustSelInsert = async (req, res) => {
// // //   try {
// // //     const dataArray = Array.isArray(req.body) ? req.body : [req.body];
// // //     const results = [];

// // //     for (const item of dataArray) {
// // //       const { type, ...restData } = item;

// // //       if (!type) {
// // //         results.push({ status: "failed", reason: "type is required", item });
// // //         continue;
// // //       }

// // //       // Load model dynamically based on type
// // //       const Model = getModel(type.trim().toLowerCase());
// // //       if (!Model) {
// // //         results.push({ status: "failed", reason: `Model not found for type: ${type}`, item });
// // //         continue;
// // //       }

// // //       // Optional: force type field
// // //       restData.type = type.trim().toLowerCase();

// // //       try {
// // //         const inserted = await Model.create(restData);

// // //         results.push({
// // //           status: "success",
// // //           table: type,
// // //           data: inserted
// // //         });

// // //       } catch (err) {
// // //         if (err.code === '23505') { // duplicate email for seller
// // //           results.push({
// // //             status: "failed",
// // //             reason: "duplicate email",
// // //             item
// // //           });
// // //         } else {
// // //           results.push({
// // //             status: "failed",
// // //             reason: err.message,
// // //             item
// // //           });
// // //         }
// // //       }
// // //     }

// // //     return res.status(201).json({
// // //       message: "Batch insertion completed",
// // //       results
// // //     });

// // //   } catch (err) {
// // //     console.error(err);
// // //     return res.status(500).json({
// // //       message: "Insertion failed",
// // //       error: err.message
// // //     });
// // //   }
// // // };








// // // Insert address data into addr table
// // // const Addr = require('../models/Addr');
// // const path = require("path");

// // exports.createAddr = async (req, res) => {
// //   try {
// //     const dataArray = Array.isArray(req.body) ? req.body : [req.body];
// //     const results = [];

// //     for (const item of dataArray) {
// //       try {
// //         const inserted = await Addr.create(item);
// //         results.push({
// //           status: 'success',
// //           data: inserted
// //         });
// //       } catch (err) {
// //         results.push({
// //           status: 'failed',
// //           reason: err.message,
// //           item
// //         });
// //       }
// //     }

// //     return res.status(201).json({
// //       message: 'Address insertion completed',
// //       results
// //     });

// //   } catch (err) {
// //     return res.status(500).json({
// //       message: 'Server error',
// //       error: err.message
// //     });
// //   }
// // };






























// const pool = require("../db");
// const path = require("path");

// // Dynamic model loader
// function getModel(tblname) {
//   const fileName = tblname.charAt(0).toUpperCase() + tblname.slice(1);
//   return require(path.join(__dirname, "../models", fileName));
// }

// // Safe column creator
// async function ensureColumnSafe(tblname, column, datatype = "TEXT") {
//   const check = `
//     SELECT column_name 
//     FROM information_schema.columns 
//     WHERE table_name='${tblname}' AND column_name='${column}'
//   `;
//   const res = await pool.query(check);

//   if (res.rows.length === 0) {
//     await pool.query(`ALTER TABLE ${tblname} ADD COLUMN ${column} ${datatype}`);
//   }
// }

// exports.CustSelInsert = async (req, res) => {
//   try {
//     const dataArray = Array.isArray(req.body) ? req.body : [req.body];


//     const results = [];

//     for (const item of dataArray) {
//       const { type, ...restData } = item;

//       if (!type) {
//         results.push({ status: "failed", reason: "type required", item });
//         continue;
//       }

//       const tblname = type.toLowerCase();
//       const Model = getModel(tblname);

//       // 🔥 JSON handling YAHI hoga
//       for (const key of Object.keys(restData)) {
//         if (typeof restData[key] === "object" && restData[key] !== null) {
//           await ensureColumnSafe(tblname, key, "JSONB");
//           restData[key] = JSON.stringify(restData[key]);
//         } else {
//           await ensureColumnSafe(tblname, key, "TEXT");
//         }
//       }

//       const inserted = await Model.create(restData);
//       results.push({ status: "success", data: inserted });
//     }

//     res.json({
//       message: "Batch insertion completed",
//       totalInserted: results.filter(r => r.status === "success").length,
//       results
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };































// exports.getTableFields = async (req, res) => {
//   try {
//     const { type } = req.query; // table name, e.g., ?type=customer

//     if (!type) return res.status(400).json({ error: "type query param required" });

//     const tblname = type.toLowerCase();

//     const query = `
//       SELECT 
//         column_name, 
//         data_type,
//         character_maximum_length
//       FROM information_schema.columns
//       WHERE table_name = $1
//       ORDER BY ordinal_position
//     `;

//     const { rows } = await pool.query(query, [tblname]);
//     const fields = [];

//     for (const col of rows) {
//       if (col.data_type === "jsonb" || col.data_type === "json") {
//         let jsonKeys = [];

//         // Try to fetch first row value
//         const jsonRow = await pool.query(`SELECT ${col.column_name} FROM ${tblname} LIMIT 1`);
//         let value = jsonRow.rows[0]?.[col.column_name] || {};

//         if (typeof value === "string") {
//           try { value = JSON.parse(value); } catch {}
//         }

//         if (value && typeof value === "object") {
//           jsonKeys = Object.keys(value);
//         }

//         if (jsonKeys.length === 0 && col.column_name === "myaddress") {
//           jsonKeys = ["city", "state", "pincode"];
//         }

//         for (const key of jsonKeys) {
//           fields.push({
//             label: key,
//             fieldname: `${col.column_name}.${key}`, // e.g., myaddress.city
//             datatype: "character varying",         // parent datatype propagate
//             data_length: col.character_maximum_length
//           });
//         }
//       } else {
//         // Normal column
//         fields.push({
//           label: col.column_name,
//           fieldname: col.column_name,
//           datatype: col.data_type,
//           data_length: col.character_maximum_length
//         });

//       }
//     }
//         console.log("Final fields sent to frontend:", fields);

//     res.json({ table: tblname, fields });

//     res.json({ table: tblname, fields });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };














// // // GET API to fetch all fields metadata dynamically
// // exports.getTableFields = async (req, res) => {
// //   try {
// //     const { type } = req.query;
// //     if (!type) {
// //       return res.status(400).json({ error: "type query param required" });
// //     }

// //     const tblname = type.toLowerCase();

// //     // 🔹 Fetch table columns from DB
// //     const query = `
// //       SELECT 
// //         column_name,
// //         data_type,
// //         character_maximum_length
// //       FROM information_schema.columns
// //       WHERE table_name = $1
// //       ORDER BY ordinal_position
// //     `;

// //     const { rows } = await pool.query(query, [tblname]);
// //     const fields = [];

// //     for (const col of rows) {

// //       // 🔴 JSON / ADDRESS TYPE COLUMN
// //       if (col.data_type === "json" || col.data_type === "jsonb") {

// //         let keys = [];

// //         // try to read first row json to detect keys
// //         const jsonRow = await pool.query(
// //           `SELECT ${col.column_name} FROM ${tblname} LIMIT 1`
// //         );

// //         let value = jsonRow.rows[0]?.[col.column_name] || {};

// //         if (typeof value === "string") {
// //           try { value = JSON.parse(value); } catch {}
// //         }

// //         if (value && typeof value === "object") {
// //           keys = Object.keys(value);
// //         }

// //         // fallback if JSON empty
// //         if (keys.length === 0 && col.column_name === "myaddress") {
// //           keys = ["city", "state", "pincode"];
// //         }

// //         // ✅ Push nested fields with FULL metadata
// //         keys.forEach(key => {
// //           fields.push({
// //             label: key,                               // city / state / pincode
// //             fieldname: `${col.column_name}.${key}`,   // myaddress.city
// //             datatype: col.data_type,                  // json / jsonb
// //             data_length: col.character_maximum_length // same as parent
// //           });
// //         });

// //       } else {
// //         // 🟢 NORMAL COLUMN
// //         fields.push({
// //           label: col.column_name,
// //           fieldname: col.column_name,
// //           datatype: col.data_type,
// //           data_length: col.character_maximum_length
// //         });
// //       }
// //     }

// //     res.json({
// //       table: tblname,
// //       fields
// //     });

// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };































// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const Users = require("../models/Users"); // ✅ file name matches exactly

// exports.login = async (req, res) => {
//   const { name, password } = req.body;

//   try {
//     const user = await Users.findByName(name); // ✅ use same as import
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: user.id },
//       process.env.JWT_SECRET || "secret123",
//       { expiresIn: "1h" }
//     );

//     res.json({ token });

//   } catch (err) {
//     res.status(500).json({ message: "Login failed", error: err.message });
//   }
// };






const jwt = require("jsonwebtoken");
const Users = require("../models/Users"); 

exports.login = async (req, res) => {
  const { name, password } = req.body;

  try {
    let user = await Users.findByName(name);

    if (!user) {
      user = await Users.create(name, password);
      console.log(`New user created: ${name}`);
    } else {
      if (user.password !== password) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
