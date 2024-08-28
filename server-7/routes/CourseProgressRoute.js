const express = require("express");
const router = express.Router();
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")


// ********************************************************************************************************
//                                      Course Progress routes
// ********************************************************************************************************


const {updateCourseProgress} = require("../controllers/CourseProgress");

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

module.exports = router;

// 00:23:44