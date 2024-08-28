const express = require("express");
const router = express.Router();
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************


// Profile
const { updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture,
    getEnrolledCourses, instructorDashboard
 } = require("../controllers/Profile");


 router.post("/updateProfile", auth, updateProfile);
router.get("/deleteAccount", auth, deleteAccount);
router.get("/getAllUserDetails", auth, getAllUserDetails);
router.post("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);



module.exports = router;