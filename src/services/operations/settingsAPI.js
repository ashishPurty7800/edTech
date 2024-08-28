import { toast } from "react-hot-toast";
import { settingsEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice";

const { UPDATE_DISPLAY_PICTURE_API, UPDATE_PROFILE_API, CHANGE_PASSWORD_API } = settingsEndpoints;

export function updateDisplayPicture(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST", UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            );
            console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE...........", response);

            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Display Picture Updated Successfully")
            console.log("from SettingAPI----------", response.data.data);
            dispatch(setUser(response.data.data))
        }
        catch(error){
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR...............", error);
            toast.error("Could Not Update Display Picture")
        }
        toast.dismiss(toastId);
    }
}

export function updateProfile(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector("POST", UPDATE_PROFILE_API, formData, {
                Authorization: `Bearer ${token}`,
            })
            console.log("UPDATE_PROFILE_API API RESPONSE.............", response);

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            // console.log("Done from func1");
            // const userImage = response.data.updatedUserDetails.image
            //                     ? (response.data.updatedUserDetails.image)
            //                     : (`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`)

            // console.log("Done from func2");

            // dispatch(
            //     setUser({...response.data.updatedUserDetails, image: userImage })
            // )
            toast.success("Profile Updated Successfully")
        }
        catch(error){
            console.log("UPDATE_PROFILE_API ERROR................", error);
            toast.error("Could Not Update Profile")
        }
        toast.dismiss(toastId);
    }
}


export async function changePassword(token, formData) {
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
            Authorization: `Bearer ${token}`,
        })
        console.log("CHANGE_PASSWORD_API API RESPONSE..............", response);

        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Password changed Successfully")
    }
    catch(error) {
        console.log("CHANGE_PASSWORD_API API ERROR..............", error);
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
}
