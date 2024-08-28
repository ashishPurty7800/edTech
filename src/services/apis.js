
const BASE_URL = process.env.REACT_APP_BASE_URL


// AUTH ENDPOINTS = AuthRoutes
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendOTP",
    SIGNUP_API: BASE_URL + "/auth/signUp",
    LOGIN_API: BASE_URL + "/auth/login",

}

export const resetPasswordUrl = {
    RESETPASSTOKEN_API: BASE_URL + "/resetPassword/resetPasswordToken",
    RESETPASSWORD_API: BASE_URL + "/resetPassword/resetPassword",
}

// CONTACT-US API
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/contact/contactUs",
}

// CATEGORY API
export const categoryEndpoint = {
    CATEGORY_API: BASE_URL + "/category/showAllCategories",
    CATALOG_PAGE_DATA_API: BASE_URL + "/category/categoryPageDetails",
}


// SETTINGS PAGE API
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
}

// PROFILE API
export const profileEndpoints = {
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}

// COURSE API
export const courseEndpoints = {
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    PUBLISH_COURSE_API: BASE_URL + "/course/publishCourse",
    GET_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_COURSE_FULL_DETAILS: BASE_URL + "/course/getCourseDetails",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "",
}

// SECTION API
export const sectionEndpoints = {
    CREATE_SECTION_API: BASE_URL + "/section/createSection",
    UPDATE_SECTION_API: BASE_URL + "/section/updateSection",
    DELETE_SECTION_API: BASE_URL + "/section/deleteSection",
}

// SUB SECTION API
export const subSectionEndpoints = {
    DELETE_SUBSECTION_API: BASE_URL + "/subSection/deleteSubSection",
    CREATE_SUBSECTION_API: BASE_URL + "/subSection/createSubSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/subSection/updateSubSection",
}

// STUDENTS ENDPOINTS
export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}


export const paymentEndpoints = {
    COURSE_ENROLL_API: BASE_URL + "/payment/enrollStudents",
}

export const ratingAndReviewEndpoints = {
    CREATE_RATING_API: BASE_URL + "/ratingAndReview/createRating",
    REVIEWS_DETAILS_API: BASE_URL + "/ratingAndReview/getAllRating",
}
