const express = require("express");
const router = express.Router();
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")




// Auth
// const { sendOTP } = require("../controllers/Auth");
// const { signUp } = require("../controllers/Auth");
// const { login } = require("../controllers/Auth");
// const { changePassword } = require("../controllers/Auth");
// router.post("/sendOTP", sendOTP);
// router.post("/signUp", signUp);
// router.post("/login", login);
// router.post("/changePassword", changePassword);



// Category
// const { createCategory } = require("../controllers/Category");
// const { showAllCategories } = require("../controllers/Category");
// const { categoryPageDetails } = require("../controllers/Category");
// router.post("/createCategory", createCategory);
// router.get("/showAllCategories", showAllCategories);
// router.post("/categoryPageDetails", categoryPageDetails);


// Course
// const { createCourse } = require("../controllers/Course");
// const { showAllCourses } = require("../controllers/Course");
// const { getCourseDetails } = require("../controllers/Course");
// router.post("/createCourse", createCourse);
// router.get("/showAllCourses", showAllCourses);
// router.post("/getCourseDetails", getCourseDetails);



// Profile
// const { updateProfile } = require("../controllers/Profile");
// const { deleteAccount } = require("../controllers/Profile");
// const { getAllUserDetails } = require("../controllers/Profile");
// const { updateDisplayPicture } = require("../controllers/Profile");
// const { getEnrolledCourses } = require("../controllers/Profile");
// router.post("/updateProfile", updateProfile);
// router.post("/deleteAccount", deleteAccount);
// router.post("/getAllUserDetails", getAllUserDetails);
// router.post("/updateDisplayPicture", updateDisplayPicture);
// router.post("/getEnrolledCourses", getEnrolledCourses);


// RatingAndReview
// const { createRating } = require("../controllers/RatingAndReview");
// const { getAverageRating } = require("../controllers/RatingAndReview");
// const { getAllRating } = require("../controllers/RatingAndReview");
// router.post("/createRating", createRating);
// router.post("/getAverageRating", getAverageRating);
// router.get("/getAllRating", getAllRating);


// ResetPassword
// const { resetPasswordToken } = require("../controllers/ResetPassword");
// const { resetPassword } = require("../controllers/ResetPassword");
// router.post("/resetPasswordToken", resetPasswordToken);
// router.post("/resetPassword", resetPassword);



// Section
// const { createSection } = require("../controllers/Section");
// const { updateSection } = require("../controllers/Section");
// const { deleteSection } = require("../controllers/Section");
// router.post("/createSection", createSection);
// router.post("/updateSection", updateSection);
// router.post("/deleteSection", deleteSection);



// Subsection
// const { createSubSection } = require("../controllers/Subsection");
// const { updateSubSection } = require("../controllers/Subsection");
// const { deleteSubSection } = require("../controllers/Subsection");
// router.post("/createSubSection", createSubSection);
// router.post("/updateSubSection", updateSubSection);
// router.post("/deleteSubSection", deleteSubSection);



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



// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************

// Category
const { createCategory, showAllCategories, categoryPageDetails } = require("../controllers/Category");


router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/categoryPageDetails", categoryPageDetails);


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Course
const { createCourse, showAllCourses, getCourseDetails } = require("../controllers/Course");


router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/showAllCourses", showAllCourses);
router.post("/getCourseDetails", getCourseDetails);



// ********************************************************************************************************
//                                      Profile routes [testing needed]
// ********************************************************************************************************

// needed to be tested
const { capturePayment, verifySignature } = require("../controllers/Payments")

router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifySignature", verifySignature)


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************


// Profile
const { updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture,
    getEnrolledCourses
 } = require("../controllers/Profile");


 router.post("/updateProfile", auth, updateProfile);
router.post("/deleteAccount", deleteAccount);
router.post("/getAllUserDetails", auth, getAllUserDetails);
router.post("/updateDisplayPicture", auth, updateDisplayPicture);
router.post("/getEnrolledCourses", auth, getEnrolledCourses);



// ********************************************************************************************************
//                                      Rating And Review routes
// ********************************************************************************************************


// RatingAndReview
const { createRating, getAverageRating, getAllRating } = require("../controllers/RatingAndReview");


router.post("/createRating", auth, isStudent, createRating);
router.post("/getAverageRating", getAverageRating);
router.get("/getAllRating", getAllRating);




// ********************************************************************************************************
//                                      Reset Password routes
// ********************************************************************************************************


// ResetPassword
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");


router.post("/resetPasswordToken", resetPasswordToken);
router.post("/resetPassword", resetPassword);



// ********************************************************************************************************
//                                      Section routes
// ********************************************************************************************************


// Section
const { createSection, updateSection, deleteSection } = require("../controllers/Section");


router.post("/createSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);



// ********************************************************************************************************
//                                      Sub Section routes
// ********************************************************************************************************

// Subsection
const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/Subsection");


router.post("/createSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);


module.exports = router;











