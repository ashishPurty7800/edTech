const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try{
        // data fetch
        const {sectionName, courseId} = req.body;

        // data validation
        if(!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'Missing Properties',
            });
        }

        // create section
        const newSection = await Section.create({sectionName});

        // update course with section ObjectID
        const updateCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent: newSection._id,
                }
            },
            {new: true},
        )
        // HW: use populate to replace section/sub-sections both in the updatedCourseDetails
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        })
        .exec();  

        // return response
        return res.status(200).json({
            success: true,
            message: 'Section created successfully',
            updateCourseDetails,
        });

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to create Section, please try again",
            error: error.message,
        });

    }
}

// update a section
exports.updateSection = async (req, res) => {
    try{
        // data input
        const {sectionName, sectionId, courseId} = req.body;

        // data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success: false,
                message: 'Missing Properties',
            });
        }

        // update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new: true});

        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        },)
        .exec();

        // return res
        return res.status(200).json({
            success: true,
            message:'Section Updated Successfully',
            data: course,
        });

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to update Section, please try again",
            error: error.message,
        });

    }
}

// delete section
exports.deleteSection = async (req, res) => {
    try{

        // get ID - assuming that we are sending ID in params
        const {sectionId, courseId} = req.body; //  (for testing api call in postman)
        // const {sectionId} = req.params;
        const details = await Section.findById(sectionId);
        console.log("details : ", details);
        const subSectionId = details.subSection;
        console.log("subSection : ", subSectionId);

        await SubSection.findByIdAndDelete(subSectionId);


        // use findByIdandDelete
        await Section.findByIdAndDelete(sectionId);

        console.log("courseId : ", courseId);
        // TODO[testing]: do we need to delete the entry from the course schema ??
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            {_id:courseId},
            {
                $pull: {
                    courseContent : sectionId,
                }
            },
            {new: true}
        );

        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        },)
        .exec();


        // return response
        return res.status(200).json({
            success: true,
            message: "Section Deleted Successfully",
            // updatedCourseDetails,
            course,

        });

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to delete Section, please try again",
            error: error.message,
        });

    }
};




