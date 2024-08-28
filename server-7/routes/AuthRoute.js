const express = require("express");
const router = express.Router();


// ***********************************************************************************************
//                                    Authentication routes
// ***********************************************************************************************

// Auth
const { sendOTP, signUp, login, changePassword } = require("../controllers/Auth");
const { auth } = require("../middlewares/auth");


router.post("/sendOTP", sendOTP);
router.post("/signUp", signUp);
router.post("/login", login);
router.post("/changePassword", auth, changePassword);


module.exports = router;