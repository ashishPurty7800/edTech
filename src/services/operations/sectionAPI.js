import { apiConnector } from "../apiconnector";
import { sectionEndpoints } from "../apis";
import { toast } from "react-hot-toast";

const {UPDATE_SECTION_API, CREATE_SECTION_API, DELETE_SECTION_API} = sectionEndpoints;


export const updateSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE SECTION API RESPONSE..............", response);
        if(!response?.data?.success) {
            throw new Error("Could Not Update section")
        }
        toast.success("Course Section Updated");
        result = response?.data?.data

    }
    catch(error){
        console.log("UPDATE SECTION API ERROR...............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}


export const createSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE SECTION API RESPONSE.................", response);
        if(!response.data.success){
            throw new Error("Could Not Create Section")
        }
        toast.success("Course Section Created");
        result = response.data.updateCourseDetails;
        
        
    }
    catch(error){
        console.log("CREATE SECTION API ERROR.................", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}


export const deleteSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...")

    try{
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETE SECTION API RERSPONSE............", response);
        if(!response.data.success){
            throw new Error("Could Not Delete Section")
        }
        toast.success("Course Section Deleted");
        result = response.data.course;
        console.log("result from section api ----", result);
    }
    catch(error){
        console.log("DELETE SECTION API ERROR...............", error);
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result;
}