import { apiConnector } from "../apiconnector"
import { toast } from 'react-hot-toast';
import { paymentEndpoints } from '../apis';


const {COURSE_ENROLL_API} = paymentEndpoints;

export const enrollStudentsPayment = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading");

    try{
        // console.log("data---", data);
        const response = await apiConnector("POST", COURSE_ENROLL_API, {courseId: data}, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        console.log("STUDENT ENROLL API RESPONSE............", response);

        if(!response.data.success){
            throw new Error("Could Not Enroll Student");
        }

        toast.success("Student Enrolled Successfully");
        result = response;
    }
    catch(error){
        console.log("STUDENT ENROLL API ERROR.............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}