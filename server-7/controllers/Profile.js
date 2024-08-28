const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/ImageUploader");
require("dotenv").config();


exports.updateProfile = async (req, res) => {
    try{
            // get data
            const {dateOfBirth="", about="", contactNumber, gender} = req.body;

            // get userId
            const id = req.user.id;

            // validation
            if(!contactNumber || !gender || !id) {
                return res.status(400).json({
                    success:false,
                    message:'All fields are required',
                });
            }

            // find profile
            const userDetails = await User.findById(id);
            const profileId = userDetails.additionalDetails;
            console.log("id : ",profileId);
            const profileDetails = await Profile.findById(profileId);
            console.log("details : ",profileDetails);

            // update profile
            profileDetails.dateOfBirth = dateOfBirth;
            profileDetails.about = about;
            profileDetails.gender = gender;
            profileDetails.contactNumber = contactNumber;
            await profileDetails.save();

            // return response
            return res.status(200).json({
                success:true,
                message:'Profile Updated Successfully',
                profileDetails,
            });
    }
    catch(error){
            return res.status(500).json({
                success: false,
                error: error.message,
            });
    }
};


// delete Account
// Explore -> how can we schedule this deletion operation
exports.deleteAccount = async (req, res) => {
    try{
        // get id
        const id = req.user.id;

        // const {id} = req.body;

        // validation
        const userDetails = await User.findById(id);
        if(!userDetails) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        // TODO: HW unenroll user from all enrolled courses

        // delete user
        await User.findByIdAndDelete({_id:id});

        // return response
        return res.status(200).json({
            success: true,
            message: 'User Deleted Successfully',
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: 'User cannot be deleted successfully',
        });

    }
};

// get all user details
exports.getAllUserDetails = async (req, res) => {
    try{
        // get id
        const id = req.user.id;

        // const {id} = req.body;

        // validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        // return res
        return res.status(200).json({
            success: true,
            message: 'User Data Fetched Successfully',
            userDetails,
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// updateDisplayPicture 
exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture;
      const userId = req.user.id;
      // const {userId} = req.body;
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )

      // console.log("Done1");
      console.log(image);
      // console.log("Done2");
      const updatedProfile = await User.findByIdAndUpdate({ _id: userId }, 
                                                          { image: image.secure_url},
                                                          { new: true }
                                                          );

      // console.log("Done3");

      return res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      });


    } catch (error) {
      return res.status(500).json({
        success: false,
        message: ("Cannot update Profile Image, Please try again."),
        message: error.message,
      });
    }
};

// getEnrolledCourses [Testing pending]
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id;
      // const {userId} = req.body;
      console.log("Done1");
      // const userDetails = await User.findOne({
      //   _id: userId,
      // })
      // .populate("courses")
      // .exec();

      const userDetails = await User.findOne({
        _id: userId,
      })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

      console.log("Done2");


      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      console.log("error in getEnrolledCourses");
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};


exports.instructorDashboard = async (req, res) => {
  try{

      const instructorId = req.user.id;
      // console.log("InstructorId--", instructorId);
      const courseDetails = await Course.find({instructor: instructorId});
      console.log("courseDetails", courseDetails);

      const courseData = courseDetails.map((course) => {
        const totalStudentsEnrolled = course.studentsEnrolled.length;
        const totalAmountGenerated = totalStudentsEnrolled * course.price;

        // create a new object with the additional fields
        const courseDataWithStats = {
          _id: course._id,
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          totalStudentsEnrolled,
          totalAmountGenerated,
        }
        return courseDataWithStats;
      })

       res.status(200).json({
        success: true,
        courses:courseData,
      });

  }
  catch(error){
    console.error(error);
     res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}