import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import IconBtn from '../../../../common/IconBtn';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails, publishCourseFunction } from '../../../../../services/operations/courseAPI';
import { useNavigate } from 'react-router-dom';

const PublishCourse = () => {

    const {register, handleSubmit, setValue, getValues} = useForm();
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const goBack = () => {
        dispatch(setStep(2));
    }

    const goToCourses = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }

    const handleCoursePublish = async () => {
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ||
            (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)){
                // no updation in form
                // no need to make api call
                goToCourses();
                return;
            }

            // if form is updated
            const formData = new FormData();
            const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
            // formData.append("courseId", course._id);
            // formData.append("status", courseStatus);
            // formData.append("courseName", course.courseName);
            // formData.append("courseDescription", course.courseDescription);
            // formData.append("whatYouWillLearn", course.whatYouWillLearn);
            // formData.append("price", course.price);
            // formData.append("tag", course.tag);
            // formData.append("category", course.category);
            // formData.append("instructions", course.instructions);
            // formData.append("thumbnailImage", course.thumbnail);

            // const thumbnail = course.thumbnail;
            // console.log("thumbnail--", thumbnail);
            // const finalData = {...course, status: courseStatus, courseId: course._id};
            // console.log("finalData--", finalData);
            
            // const result = await editCourseDetails(formData, token);
            // const data = {courseId: course._id, status: courseStatus};
            // console.log("data--------------", data);
            setLoading(true);

            formData.append("courseId", course._id);
            formData.append("status", courseStatus);
            const result = await publishCourseFunction(formData, token);

            if(result){
                goToCourses();
            }

            setLoading(false);
    }

    const onSubmit = () => {
        handleCoursePublish();
    }


    return (
        <div className='rounded-md border-[1px] bg-richblack-800 border-richblack-700 p-6'>
            <p className='text-2xl font-semibold text-richblack-5'>
                Publish Course
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='my-6 mb-8'>
                    <label htmlFor='public' className='inline-flex items-center text-lg'>
                        <input
                            type='checkbox'
                            id='public'
                            {...register("public")}
                            className='border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5'
                        />
                        <span className='ml-2 text-richblack-400'>Make this Course as Public</span>
                    </label>
                </div>

                {/* Back and save Changes button */}
                <div className='ml-auto flex max-w-max items-center gap-x-4'>
                    <button
                        disabled={loading}
                        type='button'
                        onClick={goBack}
                        className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'
                    >
                        Back
                    </button>
                    <IconBtn disabled={loading} text="save changes" />
                </div>
            </form>
        </div>
    )
}

export default PublishCourse;


// 1:4:34