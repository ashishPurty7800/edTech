const express = require("express");
const router = express.Router();
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")


// ********************************************************************************************************
//                                      Rating And Review routes
// ********************************************************************************************************


// RatingAndReview
const { createRating, getAverageRating, getAllRating } = require("../controllers/RatingAndReview");


router.post("/createRating", auth, isStudent, createRating);
router.post("/getAverageRating", getAverageRating);
router.get("/getAllRating", getAllRating);


module.exports = router;