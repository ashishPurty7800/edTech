const express = require("express");
const router = express.Router();
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Course
const { createCourse, showAllCourses, getCourseDetails, editCourse, publishCourse, getInstructorCourses, deleteCourse, getFullCourseDetails } = require("../controllers/Course");


router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/showAllCourses", showAllCourses);
router.post("/getCourseDetails", getCourseDetails);
router.post("/editCourse", auth, isInstructor, editCourse);
router.post("/publishCourse", publishCourse);
router.get("/getInstructorCourses", auth, getInstructorCourses);
router.post("/deleteCourse", auth, deleteCourse);
router.post("/getFullCourseDetails", auth, getFullCourseDetails);


module.exports = router;