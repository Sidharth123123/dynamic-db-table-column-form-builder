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
const { login } = require("../controllers/authController");

router.post("/login", login);

module.exports = router;
