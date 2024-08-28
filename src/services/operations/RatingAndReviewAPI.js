import { toast } from 'react-hot-toast';
import { apiConnector } from "../apiconnector"
import { ratingAndReviewEndpoints } from "../apis"

const {CREATE_RATING_API, REVIEWS_DETAILS_API} = ratingAndReviewEndpoints;

export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let success = false;
    try{
        const response = await apiConnector("POST", CREATE_RATING_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE RATING API RESPONSE................", response);
        if(!response?.data?.success){
            throw new Error("Could Not Create Rating")
        }
        toast.success("Rating Created");
        success = true
    }
    catch(error) {
        success = false
        console.log("CREATE RATING API ERROR..............", error);
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return success
}


export const getAllReviews = async () => {
    const toastId = toast.loading("Loading...");
    let success = false;
    let result = [];
    try{
        const response = await apiConnector("GET", REVIEWS_DETAILS_API);
        console.log("GET ALL REVIEWS API RESPONSE...............", response);
        if(!response?.data?.success){
            throw new Error("Could Not Fetch Reviews");
        }
        toast.success("All Reviews Fetched Successfully");
        success = true;
        result = response.data;
        console.log(result);
    }
    catch(error){
        success = false;
        console.log("GET ALL REVIEWS API ERROR...............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}