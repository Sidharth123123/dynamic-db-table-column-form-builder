






const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const db = require('../db');  // अगर db.js project root में है
const pool = require("../db"); 

exports.login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await Users.findByName(name);

    // ❌ User nahi mila
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ❌ Password match nahi hua
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Sab sahi hai → Token generate
    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (err) {
    res.status(500).json({
      message: "Login failed",
      error: err.message
    });
  }
};





// POST /api/objects


// exports.pbjects= async (req, res) => {
//   const { object_name } = req.body;

//   if (!object_name) {
//     return res.status(400).json({ error: "object_name is required" });
//   }

//   try {
//     // API internally INSERT करता है → आपको manual insert नहीं करना
//     const result = await db.query(
//       "INSERT INTO objects (object_name) VALUES ($1) RETURNING object_id",
//       [object_name]
//     );

//     res.json({                                     //////////////////////////////////////////////////
//       message: "Object created successfully",
//       object_id: result.rows[0].object_id
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }


// POST /api/objects

exports.pbjects = async (req, res) => {
  const { object_name } = req.body;

  if (!object_name) {
    return res.status(400).json({ error: "object_name is required" });
  }

  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(object_name)) {
    return res.status(400).json({ error: "Invalid object_name" });
  }

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Insert object
    const result = await client.query(
      "INSERT INTO objects (object_name) VALUES ($1) RETURNING object_id",
      [object_name]
    );
    const objectId = result.rows[0].object_id;

    // 2️⃣ Create table with same name (lowercase)
    const tableName = object_name.toLowerCase();
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.${tableName} (
        id SERIAL PRIMARY KEY
      );
    `);

    await client.query("COMMIT");

    res.json({
      message: "Object created and table generated successfully",
      object_id: objectId,
      table_name: tableName
    });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};






















// exports.table = async (req, res) => {
//   const { object_id, column_name, column_type, column_length } = req.body;

//   // Required field check
//   if (!object_id || !column_name || !column_type) {
//     return res.status(400).json({
//       error: "object_id, column_name, and column_type are required",
//     });
//   }

//   try {
//     // 🔹 Check if the column already exists for this object_id (case-insensitive)
//     const existing = await db.query(
//       `SELECT * FROM columns 
//        WHERE object_id = $1 AND LOWER(column_name) = LOWER($2)`,
//       [object_id, column_name]
//     );

//     if (existing.rows.length > 0) {
//       return res.status(400).json({
//         error: `Column '${column_name}' already exists for object ID ${object_id}`,
//       });
//     }

//     // 🔹 Insert new column
//     const result = await db.query(
//       `INSERT INTO columns (object_id, column_name, column_type, column_length)
//        VALUES ($1, $2, $3, $4)
//        RETURNING *`,
//       [object_id, column_name, column_type, column_length || null]
//     );

//     res.json({
//       message: "Column created successfully",
//       column: result.rows[0],
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error: " + err.message });
//   }
// };





// controllers/tableController.js
// controllers/tableController.js
// controllers/tableController.js
// controllers/tableController.js
// controllers/tableController.js




// exports.table = async (req, res) => {
//   const { object_id, column_name, column_type, column_length } = req.body;

//   // 1️⃣ Validation
//   if (!object_id || !column_name || !column_type) {
//     return res.status(400).json({
//       error: "object_id, column_name, and column_type are required",
//     });
//   }

//   try {
//     // 2️⃣ Check if column already exists in metadata table
//     const existingMeta = await db.query(
//       `SELECT * FROM columns WHERE object_id = $1 AND LOWER(column_name) = LOWER($2)`,
//       [object_id, column_name]
//     );
//     if (existingMeta.rows.length > 0) {
//       return res.status(400).json({
//         error: `Column '${column_name}' already exists for object ID ${object_id}`,
//       });
//     }

//     // 3️⃣ Fetch object_name for this object_id
//     const objRes = await db.query(
//       `SELECT object_name FROM objects WHERE object_id = $1`,
//       [object_id]
//     );

//     if (objRes.rows.length === 0) {
//       return res.status(404).json({ error: "Object not found" });
//     }

//     const tableName = objRes.rows[0].object_name;

//     // 4️⃣ Check if column already exists in actual table
//     const columnExists = await db.query(
//       `SELECT column_name 
//        FROM information_schema.columns 
//        WHERE table_name = $1 AND column_name = $2`,
//       [tableName.toLowerCase(), column_name.toLowerCase()]
//     );

//     if (columnExists.rows.length > 0) {
//       return res.status(400).json({
//         error: `Column '${column_name}' already exists in table '${tableName}'`,
//       });
//     }

//     // 5️⃣ Insert metadata in columns table
//     const result = await db.query(
//       `INSERT INTO columns (object_id, column_name, column_type, column_length)
//        VALUES ($1, $2, $3, $4)
//        RETURNING object_id, column_name, column_type, column_length`,
//       [object_id, column_name, column_type, column_length || null]
//     );

//     // 6️⃣ Prepare column definition
//     let columnDef = column_type.toLowerCase();
//     if (column_type.toLowerCase() === "varchar" && column_length) {
//       columnDef += `(${column_length})`;
//     }

//     // 7️⃣ Alter table to add the column (structure only)
//     const alterQuery = `ALTER TABLE "${tableName}" ADD COLUMN "${column_name}" ${columnDef}`;
//     await db.query(alterQuery);

//     res.json({
//       message: `Column '${column_name}' created in metadata and added to table '${tableName}' successfully`,
//       column: result.rows[0]
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error: " + err.message });
//   }
// };





exports.table = async (req, res) => {
  const { object_id, column_name, column_type, column_length, is_null_possible } = req.body;

  if (!object_id || !column_name || !column_type) {
    return res.status(400).json({
      error: "object_id, column_name, and column_type are required",
    });
  }

  if (!is_null_possible) {
    return res.status(400).json({
      error: "Cannot submit: 'Is NULL Possible' must be checked",
    });
  }

  try {
    // 3️⃣ Check if column already exists in metadata table
    const existingMeta = await db.query(
      `SELECT * FROM columns WHERE object_id = $1 AND LOWER(column_name) = LOWER($2)`,
      [object_id, column_name]
    );
    if (existingMeta.rows.length > 0) {
      return res.status(400).json({
        error: `Column '${column_name}' already exists for object ID ${object_id}`,
      });
    }

    // 4️⃣ Fetch object_name for this object_id
    const objRes = await db.query(
      `SELECT object_name FROM objects WHERE object_id = $1`,
      [object_id]
    );

    if (objRes.rows.length === 0) {
      return res.status(404).json({ error: "Object not found" });
    }

    const tableName = objRes.rows[0].object_name;

    // 5️⃣ Check if column already exists in actual table
    const columnExists = await db.query(
      `SELECT column_name 
       FROM information_schema.columns 
       WHERE table_name = $1 AND column_name = $2`,
      [tableName.toLowerCase(), column_name.toLowerCase()]
    );

    if (columnExists.rows.length > 0) {
      return res.status(400).json({
        error: `Column '${column_name}' already exists in table '${tableName}'`,
      });
    }

    // 6️⃣ Insert metadata in columns table
    const result = await db.query(
      `INSERT INTO columns (object_id, column_name, column_type, column_length)
       VALUES ($1, $2, $3, $4)
       RETURNING object_id, column_name, column_type, column_length`,
      [object_id, column_name, column_type, column_length || null]
    );

    // 7️⃣ Prepare column definition
    let columnDef = column_type.toLowerCase();
    if (column_type.toLowerCase() === "varchar" && column_length) {
      columnDef += `(${column_length})`;
    }

    // 8️⃣ Alter table to add the column
    const alterQuery = `ALTER TABLE "${tableName}" ADD COLUMN "${column_name}" ${columnDef}`;
    await db.query(alterQuery);

    res.json({
      message: `Column '${column_name}' created in metadata and added to table '${tableName}' successfully`,
      column: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};





// GET /api/objects
exports.getobj = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT object_id, object_name FROM objects ORDER BY object_id"
    );

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.data_type = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT TRIM(type_name) AS type_name FROM public.data_types ORDER BY id ASC"
    );

    const dataTypes = result.rows.map(row => row.type_name);

    res.status(200).json(dataTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
