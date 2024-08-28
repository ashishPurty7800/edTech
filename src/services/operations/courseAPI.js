import { apiConnector } from "../apiconnector"
import { toast } from 'react-hot-toast';

import { courseEndpoints } from "../apis";


const {CREATE_COURSE_API, EDIT_COURSE_API, PUBLISH_COURSE_API, GET_INSTRUCTOR_COURSES_API, DELETE_COURSE_API, GET_COURSE_FULL_DETAILS, GET_FULL_COURSE_DETAILS_AUTHENTICATED} = courseEndpoints;


export const addCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    // console.log("create course api-------", data);
    try{
        // console.log("Done1---", data);
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("Done2")
        console.log("CREATE COURSE API RESPONSE.............", response);
        if(!response?.data?.success) {
            throw new Error("Could Not Add Course Details")
        }
        toast.success("Course Details Added Successfully");
        result = response?.data?.data
        console.log("result from api--",result);
    }
    catch(error){
        console.log("CREATE COURSE API ERROR................", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}


export const editCourseDetails = async (data, token) => {
    let result = null
    console.log("from edit api --- ", data);
    const toastId = toast.loading("Loading...");
    try{
        // console.log("Done1");
        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            "Content-Type" : "multi/form-data",
            Authorization: `Bearer ${token}`,
        })
        // console.log("Done2");
        console.log("EDIT COURSE API RESPONSE.............", response);
        if(!response.data.success) {
            throw new Error("Could Not Update Course Details")
        }
        toast.success("Course Details Updated Successfully")
        result = response.data.data
        console.log("From edit Course api-----", result);
    }
    catch(error) {
        console.log("EDIT COURSE API ERROR..............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const publishCourseFunction = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading");
    console.log("data from publish api --- ", data);

    try{
        const response = await apiConnector("POST", PUBLISH_COURSE_API, data, {
            "Content-Type" : "multi/form-data",
            Authorization: `Bearer ${token}`,
        })

        console.log("PUBLISH COURSE API RESPONSE", response);
        if(!response.data.success){
            throw new Error("Could Not Update Course Status");
        }

        toast.success("Course Status Updated Successfully")
        result = response.data.data
        console.log("From publish Course api-----", result);
    }
    catch(error){
        console.log("PUBLISH COURSE API ERROR..............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}


export const fetchInstructorCourses = async (token) => {
    let result = null;
    const toastId = toast.loading("Loading");

    try{
        const response = await apiConnector("GET", GET_INSTRUCTOR_COURSES_API, null, {
            Authorization: `Bearer ${token}`,
        })

        console.log("GET INSTRUCTOR COURSES API RESPONSE", response);
        if(!response.data.success){
            throw new Error("Could Not Fetch Instructor Courses");
        }

        toast.success("Instructor Courses fetched successfully");
        result = response.data.data;
    }
    catch(error){
        console.log("GET INSTRUCTOR COURSE API ERROR..............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}


export const deleteCourse = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading");
    
    try{
        const response = await apiConnector("POST", DELETE_COURSE_API, data, {
            Authorization: `Bearer ${token}`,
        })

        console.log("DELETE COURSE API RESPONSE", response);
        if(!response.data.success){
            throw new Error("Could Not Delete Course");
        }

        toast.success("Instructor Courses fetched successfully");
        result = response.data.success;
    }
    catch(error){
        console.log("COURSE DELETE API ERROR................", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const getFullDetailsOfCourse = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading");
    console.log("data id course--", data);

    try{
        const response = await apiConnector("POST", GET_COURSE_FULL_DETAILS, data, {
            Authorization: `Bearer ${token}`,
        })

        

        console.log("GET COURSE FULL DETAILS RESPONSE", response);
        if(!response.data.success){
            throw new Error("Could Not Fetch Course Full Details");
        }

        toast.success("Course Full Details fetched successfully");
        result = response.data.data;
        console.log("result from course details api----", result);
    }
    catch(error){
        console.log("GET COURSE FULL DETAILS API ERROR..................", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}


export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("loading...");
    let result = null;
    try{
        const response = await apiConnector("POST", GET_COURSE_FULL_DETAILS, {courseId});
        console.log("FETCH_COURSE_DETAILS_API API RESPONSE..........", response);

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        result = response.data;
        
    }
    catch(error){
        console.log("FETCH_COURSE_DETAILS_API API ERROR.............", error);
        result = error.response.data;
    }
    toast.dismiss(toastId);
    return result;
}


export const getCourseFullDetails = async (courseId, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED, courseId, {
            Authorization: `Bearer ${token}`,
        })

        console.log("COURSE_FULL_DETAILS_API API RESPONSE..............", response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        result = response?.data?.data;
    }
    catch(error){
        console.log("COURSE_FULL_DETAILS_API API ERROR..............", error);
        result = error.response.data;
    }
    toast.dismiss(toastId);
    return result;
}

