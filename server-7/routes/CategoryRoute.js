const express = require("express");
const router = express.Router();
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")



// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************

// Category
const { createCategory, showAllCategories, categoryPageDetails } = require("../controllers/Category");


router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/categoryPageDetails", categoryPageDetails);


module.exports = router;