const express = require("express");
const router = express.Router();
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")


// ********************************************************************************************************
//                                      Profile routes [testing needed]
// ********************************************************************************************************

// needed to be tested
const { capturePayment, verifyPayment, sendPaymentSuccessEmail, enrollStudents } = require("../controllers/Payments");

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", verifyPayment);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);
router.post("/enrollStudents", auth, isStudent, enrollStudents);



module.exports = router;