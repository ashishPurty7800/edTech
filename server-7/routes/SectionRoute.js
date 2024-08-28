const express = require("express");
const router = express.Router();
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")


// ********************************************************************************************************
//                                      Section routes
// ********************************************************************************************************


// Section
const { createSection, updateSection, deleteSection } = require("../controllers/Section");


router.post("/createSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);


module.exports = router;