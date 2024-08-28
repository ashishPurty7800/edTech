import { apiConnector } from "../apiconnector"
import { categoryEndpoint } from "../apis"
import { toast } from "react-hot-toast"


const { CATEGORY_API } = categoryEndpoint;

export const fetchCourseCategories = async () => {
    let result = []
    try{
        const response = await apiConnector("GET", CATEGORY_API)
        console.log("COURSE_CATEGORIES_API API RESPONSE................", response);
        if(!response?.data?.success){
            throw new Error("Could Not Fetch Course Categories")
        }
        result = response?.data?.allTags
        // console.log("result", result);
    }
    catch(error){
        console.log("COURSE_CATEGORY_API API ERROR...............", error)
        toast.error(error.message)
    }
    return result
}