const express = require("express");
const router = express.Router();
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")


// ********************************************************************************************************
//                                      Sub Section routes
// ********************************************************************************************************

// Subsection
const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/Subsection");


router.post("/createSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);




module.exports = router;