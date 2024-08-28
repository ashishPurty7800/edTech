const express = require("express");
const router = express.Router();
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")


// ********************************************************************************************************
//                                      Reset Password routes
// ********************************************************************************************************


// ResetPassword
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");


router.post("/resetPasswordToken", resetPasswordToken);
router.post("/resetPassword", resetPassword);


module.exports = router;