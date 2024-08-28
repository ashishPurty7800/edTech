import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';
import { BiArrowBack } from 'react-icons/bi';

const UpdatePassword = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {loading} = useSelector( (state) => state.auth );

    const {password, confirmPassword} = formData;

    const handleOnChange = (e) => {
        setFormData( (prevData) => (
            {
                ...prevData,
                [e.target.name] : e.target.value,
            }
        ))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token))
    }

    return (
        <div className='grid min-h-[clac(100vh-3.5rem)] place-items-center'>
            {
                loading
                ? (
                    <div className='text-white'>
                        Loading....
                    </div>
                )
                : (
                    <div className='max-w-[500px] p-4 lg:p-8'>
                        <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                            Choose new Password
                        </h1>
                        <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>
                            Almost done. Enter your new password and youre all set.
                        </p>
                        <form onSubmit={handleOnSubmit}>
                            <label className='relative'>
                                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                                    New Password <sup className='text-pink-200'>*</sup>
                                </p>
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    value={password}
                                    onChange={handleOnChange}
                                    placeholder='New Password'
                                    className='w-full p-6 bg-richblack-600 text-richblack-5 rounded-md'
                                />
                                <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className='absolute right-3 top-[50px] z-[10] cursor-pointer'
                                >
                                    {
                                        showPassword 
                                        ? <IoMdEyeOff fontSize={24} fill="#AFB2BF" /> 
                                        : <IoEye fontSize={24} fill="#AFB2BF" />
                                    }
                                </span>
                            </label>

                            <label className='relative mt-3 block'>
                                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                                    Confirm New Password <sup className='text-pink-200'>*</sup>
                                </p>
                                <input
                                    required
                                    type={showConfirmPassword ? "text" : "password"}
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    onChange={handleOnChange}
                                    placeholder='Confirm New Password'
                                    className='w-full p-6 bg-richblack-600 text-richblack-5 rounded-md'
                                />
                                <span
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className='absolute right-3 top-[50px] z-[10] cursor-pointer'
                                >
                                    {
                                        showConfirmPassword 
                                        ? <IoMdEyeOff fontSize={24} fill="#AFB2BF" /> 
                                        : <IoEye fontSize={24} fill="#AFB2BF" />
                                    }
                                </span>
                            </label>

                            <button 
                            type='Submit'
                            className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] fint-medium text-richblack-900'
                            >
                                Reset Password
                            </button>
                        </form>

                        <div className='mt-6 flex items-center justify-between'>
                            <Link to="/login">
                                <p className='flex items-center gap-x-2 text-richblack-5'>
                                    <BiArrowBack />    Back to Login
                                </p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword;