import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import IconBtn from '../../../common/IconBtn';
import { updateProfile } from '../../../../services/operations/settingsAPI';

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Others"]

const EditProfile = () => {


    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: {errors} } = useForm(); 

    const submitProfileForm = async (data) => {
        try{
            dispatch(updateProfile(token, data))
        }
        catch(error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit(submitProfileForm)}>
                {/* Profile Information */}
                <div className='my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
                    <h2 className='text-lg font-semibold text-richblack-5'>
                        Profile Information
                    </h2>
                    <div className='flex flex-col gap-5 lg:flex-row'>
                        <div className='flex flex-col gap-2 lg:w-[48%]'>
                            <label htmlFor='firstName' className='lable-style text-richblack-5'>
                                First Name
                            </label>
                            <input
                                type='text'
                                name='firstName'
                                id='firstName'
                                placeholder="Enter first name"
                                className="form-style rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                                {...register("firstName", { required: true })}
                                defaultValue={user?.firstName}
                            />
                            {
                                errors.firstName && (
                                    <span className='-mt-1 text-[12px] text-yellow-100'>
                                        Please enter your first name.
                                    </span>
                                )
                            }
                        </div>
                        <div className='flex flex-col gap-2 lg:w-[48%]'>
                            <label htmlFor='lastName' className="lable-style text-richblack-5">
                                Last Name
                            </label>
                            <input
                                type='text'
                                name='lastName'
                                id='lastName'
                                placeholder='Enter last Name'
                                className="form-style rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                                {...register("lastName", { required: true })}
                                defaultValue={user?.lastName}
                            />
                            {
                                errors.lastName && (
                                    <span className='-mt-1 text-[12px] text-yellow-100'>
                                        Please enter your last name.
                                    </span>
                                )
                            }
                        </div>
                    </div>

                    <div className='flex flex-col gap-5 lg:flex-row'>
                        <div className='flex flex-col gap-2 lg:w-[48%]'>
                            <label htmlFor='dateOfBirth' className='lable-style text-richblack-5'>
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                name='dateOfBirth'
                                id='dateOfBirth'
                                className="form-style rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                                {...register("dateOfBirth", {
                                    required: {
                                        value: true,
                                        message: "Please enter your Date of Birth.",
                                    },
                                    max: {
                                        value: new Date().toISOString().split("T")[0],
                                        message: "Date of Birth cannot be in the future.",
                                    },
                                })}
                                defaultValue={user?.additionalDetails?.dateOfBirth}
                            />
                            {
                                errors.dateOfBirth && (
                                    <span>
                                        {errors.dateOfBirth.message}
                                    </span>
                                )
                            }
                        </div>
                        <div className='flex flex-col gap-2 lg:w-[48%]'>
                            <label htmlFor='gender' className='label-style text-richblack-5'>
                                Gender
                            </label>
                            <select
                                type="text"
                                name='gender'
                                id='gender'
                                className="form-style rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                                {...register("gender", { required: true })}
                                defaultValue={user?.additionalDetails?.gender}
                            >
                                {
                                    genders.map((element, index) => {
                                        return (
                                            <option key={index} value={element}>
                                                {element}
                                            </option>
                                        )
                                    })
                                }

                            </select>
                            {
                                errors.gender && (
                                    <span className='-mt-1 text-[12px] text-yellow-100'>
                                        Please enter your Date of Birth.
                                    </span>
                                )
                            }
                        </div>
                    </div>

                    <div className='flex flex-col gap-5 lg:flex-row'>
                        <div className='flex flex-col gap-2 lg:w-[48%]'>
                            <label htmlFor='contactNumber' className='lable-style text-richblack-5'>
                                Contact Number
                            </label>
                            <input
                                type='tel'
                                name="contactNumber"
                                id="contactNumber"
                                placeholder="Enter Contact Number"
                                className="form-style rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                                {...register("contactNumber", {
                                    required: {
                                        value: true,
                                        message: "Please enter your Contact Number.",
                                    },
                                    maxLength: { value: 12, message: "Invalid Contact Number" },
                                    minLength: { value: 10, message: "Invalid Contact Number" },
                                })}
                                defaultValue={user?.additionalDetails?.contactNumber}
                            />
                            {
                                errors.contactNumber && (
                                    <span className='-mt-1 text-[12px] text-yellow-100'>
                                        {errors.contactNumber.message}
                                    </span>
                                )
                            }
                        </div>

                        <div className='flex flex-col gap-2 lg:w-[48%]'>
                            <label htmlFor='about' className='lable-style text-richblack-5'>
                                About
                            </label>
                            <input
                                type="text"
                                name="about"
                                id="about"
                                placeholder="Enter Bio Details"
                                className="form-style rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
                                {...register("about", { required: true })}
                                defaultValue={user?.additionalDetails?.about}
                            />
                            {
                                errors.about && (
                                    <span className='-mt-1 text-[12px] text-yellow-100'>
                                        Please enter your About.
                                    </span>
                                )
                            }
                        </div>

                    </div>
                </div>

                <div className='flex justify-end gap-2'>
                    <button
                        onClick={() => {
                            navigate("/dashboard/my-profile")
                        }}
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-5"
                    >
                        Cancel
                    </button>
                    <IconBtn type="submit" text="Save" />
                </div>
            </form>
        </>
    )
}

export default EditProfile;