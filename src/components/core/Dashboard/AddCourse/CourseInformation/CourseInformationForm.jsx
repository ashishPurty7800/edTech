import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchCourseCategories } from '../../../../../services/operations/categoryAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import RequirementField from './RequirementField';
import IconBtn from "../../../../common/IconBtn";
import { addCourseDetails, editCourseDetails } from '../../../../../services/operations/courseAPI';
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import { toast } from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";
import ChipInput from './ChipInput';
import Upload from '../Upload';
import { MdNavigateNext } from "react-icons/md"



const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    } = useForm();

    const {token} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const {course, editCourse} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        const getCategories = async() => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            // console.log("Categories..", categories);
            if(categories.length > 0) {
                setCourseCategories(categories);
            }
            setLoading(false);
        }

        if(editCourse) {
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnailImage);
            
        }

        getCategories();
    }, [])


    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() 

        )
            return true;
        else
            return false;
    }

    
    //handles next button click 
    const onSubmit = async(data) => {

        console.log("data--", data);
        
        if(editCourse) {
            if(isFormUpdated){
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("courseId", course._id);
                // if(currentValues.courseTitle !== course.courseName){
                //     formData.append("courseName", data.courseTitle);
                // }
                // if(currentValues.courseShortDesc !== course.courseDescription){
                //     formData.append("courseDescription", data.courseShortDesc);
                // }
                // if(currentValues.coursePrice !== course.price){
                //     formData.append("price", data.coursePrice);
                // }
                // if(currentValues.courseTags.toString() !== course.tag.toString()){
                //     formData.append("tag", data.courseTags.toString());
                // }
                // if(currentValues.courseBenefits !== course.whatYouWillLearn){
                //     formData.append("whatYouWillLearn", data.courseBenefits);
                // }
                // if(currentValues.courseCategory._id !== course.category._id){
                //     formData.append("category", data.courseCategory);
                // }
                // if(currentValues.courseImage !== course.thumbnail){
                //     formData.append("thumbnail", data.courseImage);
                // }
                // if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
                //     formData.append("instructions", JSON.stringify(data.courseRequirements));
                // }

                formData.append('courseName', data.courseTitle);
                formData.append("courseDescription", data.courseShortDesc);
                formData.append("price", data.coursePrice);
                formData.append("tag", JSON.stringify(data.courseTags));
                formData.append("whatYouWillLearn", data.courseBenefits);
                formData.append("category", data.courseCategory);
                formData.append("thumbnailImage", data.courseImage);
                formData.append("instructions", JSON.stringify(data.courseRequirements));
                formData.append("status", COURSE_STATUS.DRAFT);

                setLoading(true);
                const result = await editCourseDetails(formData, token)
                
                setLoading(false);
                if(result) {
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            }
            else{
                toast.error("No changes made so far");
            }
            return;
            
        }

        // create a new course
        const formData = new FormData();
        formData.append('courseName', data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("tag", JSON.stringify(data.courseTags));
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("thumbnailImage", data.courseImage);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("status", COURSE_STATUS.DRAFT);     
        
        
        setLoading(true);
        
        const result = await addCourseDetails(formData, token);
        if(result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);
        console.log("Printing FormData--", formData);
        console.log("Printing result--", result);
    }



    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'
        >
            {/* course Title */}
            <div className='flex flex-col space-y-2'>
                <label 
                className='text-sm text-richblack-5' 
                htmlFor='courseTitle'>
                    Course Title<sup>*</sup>
                </label>
                <input
                    id='courseTitle'
                    placeholder='Enter Course Title'
                    {...register("courseTitle", {required: true})}
                    className='form-style w-full rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5'
                    
                />
                {
                    errors.courseTitle && (
                        <span className='ml-2 text-xs tracking-wide text-pink-200'>
                            Course Title is Required**
                        </span>
                    )
                }
            </div>
            
            {/* Course Short Description */}
            <div
            className='flex flex-col space-y-2'
            >
                <label 
                className='text-sm text-richblack-5 '
                htmlFor='courseShortDesc'>
                    Course Short Description<sup className='text-pink-200'>*</sup>
                </label>
                <textarea
                    id='courseShortDesc'
                    placeholder='Enter Description'
                    {...register("courseShortDesc", {required: true})}
                    className='form-style resize-x-none min-h-[130px] w-full rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5'
                />
                {
                    errors.courseShortDesc && (
                        <span className='ml-2 text-xs tracking-wide text-pink-200'>
                            Course Descriptionis required*
                        </span>
                    )
                }
            </div>
            
            {/* Course Price */}
            <div className='flex flex-col space-y-2'>
                <label 
                className='text-sm text-richblack-5 '
                htmlFor='coursePrice'>
                    Course Price<sup>*</sup>
                </label>
                <div className='relative'>
                    <input
                        id='coursePrice'
                        placeholder='Enter Course Price'
                        {...register("coursePrice", {
                            required: true,
                            valueAsNumber: true,
                        })}
                        className='form-style w-full !pl-12 rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5'
                    />
                    <HiOutlineCurrencyRupee className='absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400' />
                </div>
                {
                    errors.coursePrice && (
                        <span className='ml-2 text-xs tracking-wide text-pink-200'>
                            Course Price is Required*
                        </span>
                    )
                }
            </div>
            
            {/* Course Category */}
            <div className='flex flex-col space-y-2'>
                <label 
                className='text-sm text-richblack-5'
                htmlFor='courseCategory'>
                    Course Category<sup className='text-pink-200'>*</sup>
                </label>
                <select
                    id='courseCategory'
                    defaultValue=""
                    {...register("courseCategory", {required:true})}
                    className='form-style w-full rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5'
                >
                    <option value="" disabled>Choose a Category</option>
                    {
                        !loading && courseCategories.map((category, index) => (
                            <option key={index} value={category?._id} >
                                {category?.name}
                            </option>
                        ))
                    }

                </select>
                {
                    errors.courseCategory && (
                        <span className='ml-2 text-xs tracking-wide text-pink-200'>
                            Course Category is Required
                        </span>
                    )
                }
            </div>

            {/* create a custom component for handling tags input */}
            <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter tags and press enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            {/* create a component for uploading and showing preview of media */}
            <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? (course?.thumbnail) : (null)}
            />

            {/* Benefits of the course */}
            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-richblack-5'>
                    Benefits of the course
                </label>
                <textarea
                    id='courseBenefits'
                    placeholder='Enter Benefits of the course'
                    {...register("courseBenefits", {required:true})}
                    className='form-style resize-x-none min-h-[130px] w-full rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5'
                />
                {
                    errors.courseBenefits && (
                        <span className='ml-2 text-xs tracking-wide text-pink-200'>
                            Benefits of the course are required*
                        </span>
                    )
                }
            </div>
            
            {/* Requirements/Instructions */}
            <RequirementField
                name="courseRequirements"
                label="Requirements/Instructions"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            {/* Next Button */}
            <div className='flex justify-end gap-x-2'>
                {
                    editCourse && (
                        <button
                         onClick={() => dispatch(setStep(2))}
                         className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                        >
                            Continue Without Saving
                        </button>
                    )
                }

                <IconBtn
                    text={!editCourse ? "Next" : "Save Changes"}
                >
                    <MdNavigateNext />
                </IconBtn>
            </div>

        </form>
    )
}

export default CourseInformationForm;