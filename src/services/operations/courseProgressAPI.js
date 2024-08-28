import { apiConnector } from "../apiconnector";
import { toast } from 'react-hot-toast';
import { courseEndpoints } from "../apis";

const {LECTURE_COMPLETION_API} = courseEndpoints;

export const markLectureAsComplete = async (data, token) => {
    let result = null;
    // console.log("mark complete data", data);
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("MARK_LECTURE_AS_COMPLETE_API API RESPONSE.............", response);
        if(!response.data.message){
            throw new Error(response.data.error)
        }
        toast.success("Lecture Completed")
        result = true;
    }
    catch(error){
        console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR..............", error);
        toast.error(error.message);
        result = false;
    }
    toast.dismiss(toastId);
    return result;
}