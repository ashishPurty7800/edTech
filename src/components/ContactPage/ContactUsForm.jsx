import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../data/countrycode.json";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
        console.log("Logging Data", data);
        try{
            setLoading(true);
            const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            // const response = {status:"OK"};
            console.log("Logging response", response);
            setLoading(false);
        }
        catch(error){
            console.log("Error : ", error.message);
            setLoading(false);            
        }
    }


    useEffect( () => {
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNo:"",
            })
        }
    }, [reset, isSubmitSuccessful]);


    return (
        <form 
            className="flex flex-col gap-7 w-[40rem]"
            onSubmit={handleSubmit(submitContactForm)}>
            
                <div className="flex flex-col gap-5 lg:flex-row">
                    {/* firstName */}
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="firstname" className="lable-style">First Name</label>
                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            placeholder="Enter first name"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="form-style rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            {...register("firstName", {required:true})}
                        />
                        {
                            errors.firstname && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter Your name
                                </span>
                            )
                        }
                    </div>

                    {/* lastName */}
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="lastname" className="lable-style">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Enter last name"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="form-style rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            {...register("lastName")}
                        />
                        
                    </div>
                
                </div>

                {/* email */}
                <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="lable-style">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter email Address"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="form-style rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            {...register("email", {required:true})}
                        />
                        {
                            errors.email && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your email address
                                </span>
                            )
                        }
                </div>

                {/* phoneNo */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="phonenumber" className="lable-style">Phone Number</label>
                    
                    <div className="flex gap-5">
                        {/* dropdown */}
                        <div className="flex w-[81px] flex-col gap-2">
                                <select
                                    name="dropdown"
                                    id="dropdown"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="form-style rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 "
                                    {...register("countrycode", {require: true})}
                                >
                                    {
                                        CountryCode.map( (element, index) => {
                                            return (
                                                <option 
                                                key={index} 
                                                value={element.code}
                                                
                                                >
                                                    {element.code} - {element.country}
                                                </option>
                                            )
                                        })
                                    }

                                </select>
                        </div>
                        
                        <div className="flex w-[clac(100%-90px)] flex-col gap-2">
                        
                            <input
                                type="number"
                                name="phonenumber"
                                id="phonenumber"
                                placeholder="12345 67890"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="form-style rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 w-[33.5rem]"
                                {...register("phoneNo", 
                                        {required: {value:true, message:"Please enter Phone Number"},
                                        maxLength: {value:10, message:"Invalid Phone Number"},
                                        minLength: {value:8, message:"Invalid Phone Number"}
                                        }
                                    )
                                }
                            />
                        </div>
                    </div>
                    {
                        errors.phoneNo && (
                            <span className="-mt-1 text-[12px] text-yellow-100" >
                                {errors.phoneNo.message}
                            </span>
                        )
                    }
                </div>

                {/* message */}
                <div className="flex flex-col gap-2">
                        <label htmlFor='message' className="lable-style">Message</label>
                        <textarea
                            name="message"
                            id="message"
                            cols="30"
                            rows="7"
                            placeholder="Enter Your message here"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="form-style rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            {...register("message", {required:true})}
                        />
                        {
                            errors.message && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your message.
                                </span>
                            )
                        }
                </div>

                <button 
                    type="submit"
                    disabled={loading}
                    className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                     ${
                       !loading &&
                       "transition-all duration-200 hover:scale-95 hover:shadow-none"
                     }  disabled:bg-richblack-500 sm:text-[16px] `}
                >
                        Send Message
                </button>
            

        </form>
    )
}

export default ContactUsForm;
