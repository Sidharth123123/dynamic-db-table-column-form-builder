// const express = require('express');
// const router = express.Router();
// const Usermodel = require("../models/UserModel")

// const Customer = require("../models/Customer");
// const Seller = require("../models/Seller");
// const Usermodel = require("../models/UserModel")


// const express = require('express');
// const router = express.Router();


// const {
//   login


// } = require("../controllers/authController");




// router.post('/login', login);

// module.exports = router;        


const Users = require("../models/Users");
const express = require("express");
const router = express.Router();
const{ 
    login , 
    pbjects,
    table,
    getobj,
    data_type,
    getUsedObjects,
    // getColumnsByObjectIdOnly,
    columnsget,
getTableDataByObjectId,
getDataByObjectId,
updateDataById,
deleteDataById


} = require("../controllers/authController");


router.post("/login", login);
router.post("/objects",pbjects)
router.post('/table',table)
router.get('/objects_id',getobj)
router.get("/data-types", data_type);
router.get("/getUsedObjects",getUsedObjects)
// router.get("/getColumnsById",getColumnsById)
// Express me route
// router.get("/getColumnsByObjectIdOnly", getColumnsByObjectIdOnly);
router.get("/columnsget", columnsget);

router.post("/getTableDataByObjectId", getTableDataByObjectId);

router.get("/getDataByObjectId",getDataByObjectId)

router.put("/updateDataById", updateDataById);

router.delete("/deleteDataById", deleteDataById);





module.exports = router;
