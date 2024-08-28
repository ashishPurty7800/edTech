import { apiConnector } from "../apiconnector";
import { subSectionEndpoints } from "../apis";
import { toast } from 'react-hot-toast';

const {DELETE_SUBSECTION_API, CREATE_SUBSECTION_API, UPDATE_SUBSECTION_API} = subSectionEndpoints;

export const deleteSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    console.log("data from api--", data);
    try{
        console.log("Done1")
        const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Done2");
        console.log("DELETE SUB-SECTION API RESPONSE..............", response);
        if(!response.data.success){
            throw new Error("Could Not Delete Lecture")
        }
        toast.success("Lecture Deleted");
        result = response.data.data;
        console.log("response from api--", response);
    }
    catch(error){
        console.log("DELETE SUB-SECTION API ERROR................", error);
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}


export const createSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    // console.log("data from api--", data);
    try{
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE SUB-SECTION API RESPONSE.................", response);
        if(!response.data.success) {
            throw new Error("Could Not Add Lecture")
        }
        toast.success("Lecture Added");
        result = response.data.data
    }
    catch(error){
        console.log("CREATE SUB-SECTION API ERROR....................", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}


export const updateSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE SUB-SECTION API RESPONSE......................", response);
        if(!response.data.success) {
            throw new Error("Could Not Update Lecture")
        }
        toast.success("Lecture Updated");
        result = response.data.data
    }
    catch(error) {
        console.log("UPDATE SUB-SECTION API ERROR.................", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}