const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const {uploadImageToCloudinary} = require("../utils/ImageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");


// createCourse handler function
exports.createCourse = async (req, res) => {
    try{
        // Get user ID from request object
        const userId = req.user.id;

        // fetch data
        const {courseName, courseDescription, whatYouWillLearn, price, tag, category, status, instructions} = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category){
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        if (!status || status === undefined) {
			status = "Draft";
		}

        // check for instructor
        // const userId = req.user.id;
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
        });
        console.log("Instuctor Details: ", instructorDetails);
        // TODO: Verify that userId and instructorDetails._id are same or different ?

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:'Instructor Details not found',
            });
        }

         // check given tag is valid or not
         const categoryDetails = await Category.findById(category);
         if(!categoryDetails) {
             return res.status(404).json({
                 success: false,
                 message: 'Category Details not found',
             });
         }

          // Upload Image to Cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);


        // create an entry for new Course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            instructions: instructions,
        })

        // add the new course to the user schema of Instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            {new: true},
        );

        await Category.findByIdAndUpdate(
            { _id: category},
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true }
        );

          // return response
          return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse,
        });

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create Course',
            error: error.message,
        })

    }
};


// getAllCourses handler function

exports.showAllCourses = async (req, res) => {
    try{
        // TODO: change the below statement incrementally
        const allCourses = await Course.find(
            {},
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReview: true,
                studentsEnrolled: true,
            })
            .populate("instructor")
            .exec();

        return res.status(200).json({
            success:true,
            message:'Data for all courses fetched successfully',
            data:allCourses,
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Cannot Fetch course data',
            error:error.message,
        })
    }
}


// getCourseSetails [Testing Pending]
exports.getCourseDetails = async (req, res) => {
    try{
        // get id
        const {courseId} = req.body;

        console.log("Course id from backend--", courseId);

        // find course details
        const courseDetails = await Course.findOne(
                                    {_id:courseId})
                                    .populate(
                                        {
                                            path:"instructor",
                                            populate:{
                                                path:"additionalDetails",
                                            },
                                        }
                                    )
                                    .populate("category")
                                    .populate("ratingAndReview")
                                    .populate({
                                        path:"courseContent",
                                        populate:{
                                            path:"subSection",
                                            select: "-videoUrl",
                                        },
                                    })
                                    .exec();

        

        // validation
        if(!courseDetails){
            // console.log("course--", courseDetails);
            return res.status(400).json({
                success: false,
                message:`Could not find the course with ${courseId}`,
            });
        }

        console.log("course details from backend.........", courseDetails);        

        // return response
        return res.status(200).json({
            success: true,
            message: "Course Details fetched successfully",
            data: courseDetails,
        })
        

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
}



exports.editCourse = async (req, res) => {
    try{
        const {courseId} = req.body;
        const {courseName, courseDescription, whatYouWillLearn, price, tag, category, status, instructions} = req.body;
        const course_id = await Course.findById(courseId)

        console.log("courseId from backend--", courseId);
        console.log("courseName from backend--", courseName);
        console.log("courseDescription from backend--", courseDescription);
        console.log("whatYouWillLearn from backend--", whatYouWillLearn);
        console.log("price from backend--", price);
        console.log("tag from backend--", tag);
        console.log("category from backend--", category);
        console.log("status from backend--", status);
        console.log("instructions from backend--", instructions);
        console.log("-----------------------------------------------");


        if(!course_id) {
            return res.status(404).json({
                success: false,
                error: "Course not found",
            })
        }

        const editCourse = await Course.findByIdAndUpdate(course_id, {courseName, courseDescription, whatYouWillLearn, price, tag, category, status, instructions}, {new: true} );
        console.log("edit Course backend---", editCourse);
        const image = req.files.thumbnailImage;
        console.log("thumbnail backend--", image);

        // Upload the image to cloudinary
        const thumbnailObj = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
        const thumbnail = thumbnailObj.secure_url;
        console.log("url thimb image--", thumbnail);
        const thumb = await Course.findByIdAndUpdate(course_id, {thumbnail}, {new: true});

        if(!thumb){
            return res.status(400).json({
                success: false,
                message: "Could Not Update Thumbnail",
            })
        }

        console.log("Thumbnail ---- ", thumb);

        const updatedCourse = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).exec();

        

        if(!updatedCourse){
            return res.status(400).json({
                success: false,
                message: "Could Not Fetch Course",
            })

        }

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}



exports.publishCourse = async (req, res) => {
    try{
        const {courseId, status} = req.body;
        console.log("course--", courseId);
        console.log("Status--", status);

        if(!courseId){
            return res.status(400).json({
                success: false,
                message: "Could Not Find Course",
            })
        }

        if(!status){
            return res.status(400).json({
                success: false,
                message: "Status not found",
            })
        }

        const publishedCourse = await Course.findByIdAndUpdate(courseId, {status});
        
        if(!publishedCourse){
            res.status(400).json({
                success: false,
                message: "Could Not update status",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Course status updated successfully",
            data: publishedCourse,
        })


    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}



// Get a list of Course for a given instructor
exports.getInstructorCourses = async (req, res) => {
    try{
        // Get the instructor ID from the authenticated user or request body
        const instructorId = req.user.id;
        
        console.log("instructot id --- ", instructorId);
        // Find all courses belonging to the instructor
        const instructorCourses = await Course.find({
            instructor: instructorId,
        })
        .sort({createdAt: -1})
        

        console.log("Instructor courses--", instructorCourses);

        // Return the instructor's courses
        return res.status(200).json({
            success: true,
            data: instructorCourses,
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}


exports.deleteCourse = async (req, res) => {
    try{
        const { courseId } = req.body;

        // Find the course
        const course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({
                message: "Course not found"
            })
        }

        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled
        for(const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId, {
                $pull: { courses: courseId },
            })
        }

        // Delete sections and sub-sections
        const courseSections = course.courseContent
        for(const sectionId of courseSections) {
            // Delete sub-sections of the section
            const section = await Section.findById(sectionId)
            if(section) {
                const subSections = section.subSection
                for(const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }

            // Delete the section
            await Section.findByIdAndDelete(sectionId)
        }

        // Delete the course
        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        })
    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
}

exports.getFullCourseDetails = async (req, res) => {
    try{
        const { courseId } = req.body;
        const userId = req.user.id;
        const courseDetails = await Course.findOne({
            _id: courseId,
        })
        .populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            },
        })
        .populate("category")
        .populate("ratingAndReview")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        // let courseProgressCount = await CourseProgress.findOne({
        //     courseId: courseId,
        //     userId: userId,
        // })

        // console.log("courseProgressCount : ", courseProgressCount);

        let courseProgressCount;

        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            })
        }

        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos
                    ? courseProgressCount?.completedVideos
                    : [],
            },
        })
        
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}