const express = require("express");
const app = express();
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// const userProfile = require("./routes/userProfile");
const authRoutes = require("./routes/AuthRoute");
const categoryRoutes = require("./routes/CategoryRoute");
const courseRoutes = require("./routes/CourseRoute");
const paymentRoutes = require("./routes/PaymentsRoute");
const profileRoutes = require("./routes/ProfileRoute");
const ratingAndReviewRoutes = require("./routes/RatingAndReviewRoute");
const resetPasswordRoutes = require("./routes/ResetPasswordRoute");
const sectionRoutes = require("./routes/SectionRoute");
const subSectionRoutes = require("./routes/SubsectionRoute"); 
const contactUsRoutes = require("./routes/ContactRoute");
const courseProgressRoutes = require("./routes/CourseProgressRoute");


const connect = require("./config/database");
const cloudinary = require("./config/cloudinary");
require("dotenv").config();



const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


cors
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials:true,
    })
)



// mount
// app.use("/api/v1", userProfile);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/ratingAndReview", ratingAndReviewRoutes);
app.use("/api/v1/resetPassword", resetPasswordRoutes);
app.use("/api/v1/section", sectionRoutes);
app.use("/api/v1/subSection", subSectionRoutes);
app.use("/api/v1/contact", contactUsRoutes);
app.use("/api/v1/courseProgress", courseProgressRoutes);

// DB connection
connect();

// // cors
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         credentials:true,
//     })
// )

// cloud se connect krna h
cloudinary.cloudinaryConnect();

// start the server
app.listen(PORT, () => {
    console.log(`App is started at PORT no ${PORT}`);
})


app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: 'Your serveris upand running....'
    });
});
