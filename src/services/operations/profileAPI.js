import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import { profileEndpoints } from "../apis";

const {GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API} = profileEndpoints;




export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...");
    let result = []
    try{
        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null, {
            Authorization: `Bearer ${token}`,
        })

        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data.data
    }
    catch(error){
        console.log("GET_USER_ENROLLED_COURSES_API ERROR...............", error)
        toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
}

export async function getInstructorData(token){
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
            Authorization: `Bearer ${token}`,
        })

        console.log("GET INSTRUCTOR DATA API RESPONSE.............", response);
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result = response.data;
    }
    catch(error){
        console.log("GET INSTRUCTOR DATA API ERROR................", error);
        toast.error("Could Not Get Instructor Data");
    }
    toast.dismiss(toastId);
    return result;
}