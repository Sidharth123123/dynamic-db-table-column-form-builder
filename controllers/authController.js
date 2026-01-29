






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










// exports.table = async (req, res) => {
//   const { object_id, column_name, column_type, column_length, is_null_possible } = req.body;

//   if (!object_id || !column_name || !column_type) {
//     return res.status(400).json({
//       error: "object_id, column_name, and column_type are required",
//     });
//   }

//   if (!is_null_possible) {
//     return res.status(400).json({
//       error: "Cannot submit: 'Is NULL Possible' must be checked",
//     });
//   }

//   try {
//     // 3️⃣ Check if column already exists in metadata table
//     const existingMeta = await db.query(
//       `SELECT * FROM columns WHERE object_id = $1 AND LOWER(column_name) = LOWER($2)`,
//       [object_id, column_name]
//     );
//     if (existingMeta.rows.length > 0) {
//       return res.status(400).json({
//         error: `Column '${column_name}' already exists for object ID ${object_id}`,
//       });
//     }

//     // 4️⃣ Fetch object_name for this object_id
//     const objRes = await db.query(
//       `SELECT object_name FROM objects WHERE object_id = $1`,
//       [object_id]
//     );

//     if (objRes.rows.length === 0) {
//       return res.status(404).json({ error: "Object not found" });
//     }

//     const tableName = objRes.rows[0].object_name;

//     // 5️⃣ Check if column already exists in actual table
//      const columnExists = await db.query(
//        `SELECT column_name 
//         FROM information_schema.columns 
//         WHERE table_name = $1 AND column_name = $2`,
//       [tableName.toLowerCase(), column_name.toLowerCase()]
//     );

//     if (columnExists.rows.length > 0) {
//       return res.status(400).json({
//         error: `Column '${column_name}' already exists in table '${tableName}'`,
//       });
//     }

//     // 6️⃣ Insert metadata in columns table
//     const result = await db.query(
//       `INSERT INTO columns (object_id, column_name, column_type, column_length)
//        VALUES ($1, $2, $3, $4)
//        RETURNING object_id, column_name, column_type, column_length`,
//       [object_id, column_name, column_type, column_length || null]
//     );

//     // 7️⃣ Prepare column definition
//     let columnDef = column_type.toLowerCase();
//     if (column_type.toLowerCase() === "varchar" && column_length) {
//       columnDef += `(${column_length})`;
//     }

//     // 8️⃣ Alter table to add the column
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























// File: controllers/columnController.js

// File: controllers/columnController.js

exports.table = async (req, res) => {
  const {
    object_id,
    column_name,
    column_type,
    column_length,
    default_value,
    form_label,  // NEW
    not_null      // true if column can be null, false if NOT NULL
  } = req.body;

  // 1️⃣ Basic validation
  if (!object_id || !column_name || !column_type) {
    return res.status(400).json({
      error: "object_id, column_name, and column_type are required",
    });
  }

  // try {
  // 2️⃣ Check duplicate in metadata
  const columnMetaExists = await db.query(
    `SELECT column_name 
       FROM columns 
       WHERE object_id = $1 AND LOWER(column_name) = LOWER($2)`,
    [object_id, column_name]
  );

  if (columnMetaExists.rows.length > 0) {
    return res.status(400).json({
      error: `Column '${column_name}' already exists in metadata for object ID ${object_id}`,
    });
  }

  // 3️⃣ Get table name
  const objRes = await db.query(
    `SELECT object_name FROM objects WHERE object_id = $1`,
    [object_id]
  );

  if (objRes.rows.length === 0) {
    return res.status(404).json({ error: "Object not found" });
  }

  const tableName = objRes.rows[0].object_name;

  // 4️⃣ Check duplicate in actual table
  const columnExists = await db.query(
    `SELECT column_name 
       FROM information_schema.columns 
       WHERE table_name = $1 AND LOWER(column_name) = LOWER($2)`,
    [tableName.toLowerCase(), column_name.toLowerCase()]
  );

  if (columnExists.rows.length > 0) {
    return res.status(400).json({
      error: `Column '${column_name}' already exists in actual table '${tableName}'`,
    });
  }

  // 5️⃣ Insert metadata into columns table (use not_null instead of is_null_possible)
  insertQuery = `INSERT INTO columns (object_id, column_name, column_type, column_length, default_value, form_label, not_null)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING object_id, column_name, column_type, column_length, default_value, form_label, not_null`;
  const values = [
    object_id,
    column_name,
    column_type,
    column_length || null,
    default_value || null,
    form_label || null,
    not_null // store as not_null
  ];
  // console.log('this is object row query->',qs);
  console.log('this is column type->', column_type);



  var qs = `ALTER TABLE "${tableName}" ADD COLUMN "${column_name}"`;
  // var qs = `ALTER TABLE "${tableName}" ADD COLUMN "${column_name}" ${column_type}(${column_length}) DEFAULT '${default_value}';`;


  let columnDef = column_type.toLowerCase();
  if (column_type.toLowerCase() === "character" && column_length) {
    columnDef += `(${column_length})`; // यहाँ column_length 100 होना चाहिए
  }

  qs += ` ${columnDef}`;

  if (not_null == 1) {
    qs += ' NOT NULL';
  }
  if (default_value !== undefined && default_value !== null && default_value.toString().trim() != '') {
    if (column_type.toLowerCase().includes('char') || column_type.toLowerCase() === 'text') {
      qs += ` DEFAULT '${default_value}'`;
    } else {
      qs += ` DEFAULT ${default_value}`;
    }
  }

  qs += ';';

  // console.log('This is the final TABLE query --->', qs);
  // console.log('This is the final TABLE query --->',insertQuery,values);



  // await db.query(qs);
  // await db.query(insertQuery,values);
  const client = await db.connect();

  try {

    await client.query("BEGIN");

    console.log('Running ALTER TABLE --->', qs);
    await db.query(qs);

    console.log('Running INSERT --->', insertQuery, values);
    await db.query(insertQuery, values);

    await db.query("COMMIT");

    res.json({ message: "Column created successfully" });

  } catch (err) {

    await db.query("ROLLBACK");  // rollback correctly

    console.error("Error creating column:", err);
    res.status(500).json({ error: "Server error: " + err.message });

  } finally {

    client.release();  // important: release connection back to pool

  }
}









// const db = await db.connect();

// try {
//   await db.query("BEGIN");

//   // 1️⃣ ALTER TABLE
//   try {
//     await db.query(qs);
//     console.log("ALTER TABLE executed successfully");
//   } catch (err) {
//     console.error("Error in ALTER TABLE query:", err.message);
//     throw new Error("ALTER TABLE failed: " + err.message);
//   }

//   // 2️⃣ INSERT metadata
//   try {
//     await db.query(insertQuery, values);
//     console.log("INSERT executed successfully");
//   } catch (err) {
//     console.error("Error in INSERT query:", err.message);
//     throw new Error("INSERT query failed: " + err.message);
//   }

//   await db.query("COMMIT");
//   console.log("Transaction committed successfully");
//   res.json({ message: "Column created successfully" });

// } catch (err) {
//   await db.query("ROLLBACK");
//   console.error("Transaction rolled back. Query error:", err.message);
//   res.status(500).json({ error: err.message });
// } finally {
//   db.release();
// }










// try{
//   await db.beginTransaction();
//     await db.query(qs);
//     await db.query(insertQuery,values);

//     await db.commit();  

//   } catch (err) {
//     await db.rollback();
//     console.error("Error creating column:", err);
//     res.status(500).json({ error: "Server error: " + err.message });
//   }

// exports.table = async (req, res) => {
//   const {
//     object_id,
//     column_name,
//     column_type,
//     column_length,

//     form_label
//   } = req.body;

//   // 1️⃣ Basic validation
//   if (!object_id || !column_name || !column_type || !form_label) {
//     return res.status(400).json({
//       error: "object_id, column_name, column_type, and form_label are required",
//     });
//   }

//   try {
//     // 2️⃣ Check duplicate column in METADATA
//     const columnMetaExists = await db.query(
//       `SELECT column_name 
//        FROM columns 
//        WHERE object_id = $1 AND LOWER(column_name) = LOWER($2)`,
//       [object_id, column_name]
//     );

//     if (columnMetaExists.rows.length > 0) {
//       return res.status(400).json({
//         error: `Column '${column_name}' already exists in metadata for object ID ${object_id}`,
//       });
//     }

//     // 3️⃣ Get table name
//     const objRes = await db.query(
//       `SELECT object_name FROM objects WHERE object_id = $1`,
//       [object_id]
//     );

//     if (objRes.rows.length === 0) {
//       return res.status(404).json({ error: "Object not found" });
//     }

//     const tableName = objRes.rows[0].object_name;

//     // 4️⃣ Check column in actual table
//     const columnExists = await db.query(
//       `SELECT column_name 
//        FROM information_schema.columns 
//        WHERE table_name = $1 AND LOWER(column_name) = LOWER($2)`,
//       [tableName.toLowerCase(), column_name.toLowerCase()]
//     );

//     if (columnExists.rows.length > 0) {
//       return res.status(400).json({
//         error: `Column '${column_name}' already exists in actual table '${tableName}'`,
//       });
//     }

//     // 5️⃣ Insert into metadata table
//     const result = await db.query(
//       `INSERT INTO columns (object_id, column_name, column_type, column_length, form_label)
//        VALUES ($1, $2, $3, $4, $5 )
//        RETURNING *`,
//       [object_id, column_name, column_type, column_length ||  null, form_label]
//     );

//     // 6️⃣ Build column definition for ALTER TABLE
//     let columnDef = column_type.toLowerCase();
//     if (column_type.toLowerCase() === "varchar" && column_length) {
//       columnDef += `(${column_length})`;
//     }



//     // Optional NOT NULL if is_null_possible = false


//     // 7️⃣ ALTER TABLE → actual column creation
//     const alterQuery = `ALTER TABLE "${tableName}" ADD COLUMN "${column_name}" ${columnDef}`;
//     await db.query(alterQuery);

//     res.status(201).json({
//       message: `Column '${column_name}' added to metadata and table '${tableName}' successfully`,
//       metadata: result.rows[0],
//       sql: alterQuery
//     });

//   } catch (err) {
//     console.error("Error creating column:", err);
//     res.status(500).json({ error: "Server error: " + err.message });
//   }
// };


// if (default_value !== undefined && default_value !== null && default_value !== "") {
//   if (["varchar", "character", "text"].includes(column_type.toLowerCase())) {
//     columnDef += ` DEFAULT '${default_value}'`;
//   } else {
//     columnDef += ` DEFAULT ${default_value}`;
//   }
// }
//Add NOT NULL if not_null === true
// if (not_null === true) {
//   columnDef += " NOT NULL";
// }
// console.log(columnDef);

// 7️⃣ Alter actual table
// const alterQuery = `ALTER TABLE "${tableName}" ADD COLUMN "${column_name}" ${columnDef}`;
// await db.query(alterQuery);

// res.json({
//   message: `Column '${column_name}' added to metadata and table '${tableName}' successfully`,
//   column: result.rows[0],
//   sql: alterQuery
// });

//----------NK----------------------------------------------------

// var qs=`ALTER TABLE "${tableName}" ADD COLUMN "${column_name}" ${columnDef}`; 
// if (not_null) {
//   qs=qs + ' not null';
// }
// if (trim(default_value)!=''){
//   qs=qs + ' DEFAULT '.default_value;
// }
// qs=qs+';';
// console.log('this is query by neeraj--->',qs);
// await db.query(qs);
// ------------NKEND--------------------------------------------









// if (default_value !== undefined && default_value !== null && default_value.toString().trim() !== '') {
//   if (["varchar", "character", "text"].includes(column_type.toLowerCase())) {
//     qs = qs + ` DEFAULT '${default_value}'`;
//   } else {
//     qs = qs + ` DEFAULT ${default_value}`;
//   }
// }












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



exports.getUsedObjects = async (req, res) => {
  try {
    const result = await db.query(`
     SELECT DISTINCT
  o.object_id,
  o.object_name
FROM columns c
JOIN objects o ON o.object_id = c.object_id
ORDER BY o.object_id DESC;

    `);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




// Get only 'object_id' from columns table
exports.getColumnsByObjectIdOnly = async (req, res) => {
  const object_id = req.query.object_id; // <-- query param se lena hai
  // console.log("helloooooooooooooooooooooooooooooooooo",object_id)


  if (!object_id) {
    return res.status(400).json({ error: "object_id is required in query" });
  }

  try {
    const result = await db.query(
      `SELECT object_id FROM columns WHERE object_id = $1`,
      [object_id]
    );
    console.log("heloooooooooooooooo", object_id)
    res.status(200).json(result.rows); // sirf object_id return hoga
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};









// exports.columnsget = async (req, res) => {
//   const { object_id } = req.query;

//   if (!object_id) {
//     return res.status(400).json({
//       error: "object_id is required"
//     });
//   }

//   try {
//     const result = await db.query(
//       `
//       SELECT
//         id,
//         object_id,
//         column_name,
//         column_type,
//         column_length,
//         form_label
//       FROM columns
//       WHERE object_id = $1
//       ORDER BY id
//       `,
//       [object_id]
//     );

//     res.status(200).json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
















exports.columnsget = async (req, res) => {
  const { object_id } = req.query;

  if (!object_id) {
    return res.status(400).json({ error: "object_id is required" });
  }

  try {
    const result = await db.query(
      `
      SELECT
        id,
        object_id,
        column_name,
        column_type,
        column_length,
        form_label
      FROM columns
      WHERE object_id = $1
      ORDER BY id
      `,
      [object_id]
    );

    // Backend se sirf available columns bhejo
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};









exports.getTableDataByObjectId = async (req, res) => {
  const { object_id, data } = req.body;

  if (!object_id || !data) {
    return res.status(400).json({ error: "object_id and data are required" });
  }

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Get table name
    const tableResult = await client.query(
      "SELECT object_name FROM objects WHERE object_id = $1",
      [object_id]
    );

    if (tableResult.rows.length === 0) {
      throw new Error("Invalid object_id");
    }

    const tableName = tableResult.rows[0].object_name;

    // 2️⃣ Get valid columns
    const columnsResult = await client.query(
      "SELECT column_name FROM columns WHERE object_id = $1",
      [object_id]
    );

    const validColumns = columnsResult.rows.map(row => row.column_name);


    if (validColumns.length === 0) {
      throw new Error("No columns found for this table");
    }

    const dataColumns = Object.keys(data);

    const extraFields = dataColumns.filter(col => !validColumns.includes(col));
    if (extraFields.length > 0) {
      throw new Error(
        `Invalid fields provided: ${extraFields.join(", ")}. Only these are allowed: ${validColumns.join(", ")}`
      )
    };


    const columnNames = validColumns;
    const values = columnNames.map(col => data[col] || null);

    const placeholders = columnNames.map((_, i) => `$${i + 1}`);

    const insertQuery = `
          INSERT INTO ${tableName} (${columnNames.join(", ")})
      VALUES (${placeholders.join(", ")})
      RETURNING *;
    `;
   

    const result = await client.query(insertQuery, values);



    await client.query("COMMIT");



     console.log("Insert Query:", insertQuery);
    console.log("Values to Insert:", values);

    //  Response
    res.status(201).json({
      message: "Data inserted successfully",
      object_id: object_id,
      table_name: tableName,
      inserted_data: result.rows[0]
    })

  }    catch (err) {
  await client.query("ROLLBACK");
  console.error("Insert Error:", err.message);
  res.status(400).json({ error: err.message });
} finally {
  client.release();
}}








// exports.getDataByObjectId = async (req, res) => {
//   const { object_id } = req.query;

//   if (!object_id) {
//     return res.status(400).json({ error: "object_id is required" });
//   }

//   const client = await db.connect();

//   try {
//     // 1️⃣ Get table name
//     const tableResult = await client.query(
//       "SELECT object_name FROM objects WHERE object_id = $1",
//       [object_id]
//     );

//     if (tableResult.rows.length === 0) {
//       throw new Error("Invalid object_id");
//     }

//     const tableName = tableResult.rows[0].object_name;
//     console.log("Fetching data from table:", tableName);

//     // 2️⃣ Fetch all data from that table
//     const selectQuery = `SELECT * FROM ${tableName} ORDER BY id DESC;`;

//     console.log("Select Query:", selectQuery);

//     const result = await client.query(selectQuery);

//     // 3️⃣ Response
//     res.status(200).json({
//       message: "Data fetched successfully",
//       object_id: object_id,
//       table_name: tableName,
//       total_records: result.rows.length,
//       data: result.rows
//     });

//   } catch (err) {
//     console.error("Fetch Error:", err.message);
//     res.status(400).json({ error: err.message });
//   } finally {
//     client.release();
//   }
// };


exports.getDataByObjectId = async (req, res) => {
  const { object_id } = req.query;

  if (!object_id) {
    return res.status(400).json({ error: "object_id is required" });
  }

  const client = await db.connect();

  try {
    // 1️⃣ Get table name
    const tableResult = await client.query(
      "SELECT object_name FROM objects WHERE object_id = $1",
      [object_id]
    );

    if (tableResult.rows.length === 0) {
      return res.status(400).json({ error: "Invalid object_id" });
    }

    const tableName = tableResult.rows[0].object_name;

    // 🔐 Security check
    if (!/^[a-zA-Z0-9_]+$/.test(tableName)) {
      throw new Error("Invalid table name");
    }

    // 2️⃣ Fetch table data
    const result = await client.query(
      `SELECT * FROM ${tableName} ORDER BY id DESC`
    );

    // ✅ If NO records → Fetch columns
    if (result.rows.length === 0) {

      const columnResult = await client.query(
        `SELECT column_name
         FROM information_schema.columns
         WHERE table_name = $1
         ORDER BY ordinal_position`,
        [tableName]
      );

      return res.status(200).json({
        message: "No records found. Columns fetched successfully.",
        object_id,
        table_name: tableName,
        total_records: 0,
        columns: columnResult.rows.map(col => col.column_name),
        data: []
      });
    }

    // ✅ If records exist
    return res.status(200).json({
      message: "Data fetched successfully",
      object_id,
      table_name: tableName,
      total_records: result.rows.length,
      columns: Object.keys(result.rows[0]),
      data: result.rows
    });

  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};



exports.updateDataById = async (req, res) => {
  const { object_id, id, data } = req.body;

  if (!object_id || !id || !data) {
    return res.status(400).json({ error: "object_id, id, and data are required" });
  }

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Get table name
    const tableResult = await client.query(
      "SELECT object_name FROM objects WHERE object_id = $1",
      [object_id]
    );

    if (tableResult.rows.length === 0) {
      throw new Error("Invalid object_id");
    }

    const tableName = tableResult.rows[0].object_name;

    // 2️⃣ Get valid columns
    const columnsResult = await client.query(
      "SELECT column_name FROM columns WHERE object_id = $1",
      [object_id]
    );

    const validColumns = columnsResult.rows.map(row => row.column_name);

    if (validColumns.length === 0) {
      throw new Error("No columns found for this table");
    }

    // 3️⃣ Filter data only for valid columns
    const filteredData = {};
    validColumns.forEach(col => {
      if (data[col] !== undefined) filteredData[col] = data[col];
    });

    const columnNames = Object.keys(filteredData);
    const values = Object.values(filteredData);

    if (columnNames.length === 0) {
      throw new Error("No valid data provided to update");
    }

    const setString = columnNames.map((col, i) => `${col}=$${i + 1}`).join(", ");

    const query = `UPDATE ${tableName} SET ${setString} WHERE id=$${columnNames.length + 1} RETURNING *;`;

    const result = await client.query(query, [...values, id]);

    await client.query("COMMIT");

    res.status(200).json({
      message: "Row updated successfully",
      data: result.rows[0]
    });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Update Error:", err.message);
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
};



exports.deleteDataById = async (req, res) => {
  const { object_id, id } = req.body;

  if (!object_id || !id) {
    return res.status(400).json({ error: "object_id and id are required" });
  }

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Get table name
    const tableResult = await client.query(
      "SELECT object_name FROM objects WHERE object_id = $1",
      [object_id]
    );

    if (tableResult.rows.length === 0) {
      throw new Error("Invalid object_id");
    }

    const tableName = tableResult.rows[0].object_name;

    // 2️⃣ Delete row
    const deleteQuery = `DELETE FROM ${tableName} WHERE id=$1 RETURNING *;`;
    const result = await client.query(deleteQuery, [id]);

    if (result.rows.length === 0) {
      throw new Error("Row not found or already deleted");
    }

    await client.query("COMMIT");

    res.status(200).json({
      message: "Row deleted successfully",
      data: result.rows[0]
    });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Delete Error:", err.message);
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
};
