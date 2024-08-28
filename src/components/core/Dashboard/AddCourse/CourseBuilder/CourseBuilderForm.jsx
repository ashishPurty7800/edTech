import React from 'react';
import { useForm } from 'react-hook-form';
import IconBtn from '../../../../common/IconBtn';
import { FiPlusCircle } from 'react-icons/fi';
import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { createSection, updateSection } from '../../../../../services/operations/sectionAPI';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { toast } from "react-hot-toast";
import NestedView from './NestedView';

const CourseBuilderForm = () => {


    const {register, handleSubmit, setValue, formState:{errors} } = useForm();
    const  [editSectionName, setEditSectionName] = useState(null);
    const {course} = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState();
    const {token} = useSelector((state) => state.auth);

    const onSubmitFunction = async (data) => {
        setLoading(true);
        let result;

        if(editSectionName) {
            // we are editing the section name
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: course._id,
                }, token
            )
        }
        else{
            result = await createSection({
                sectionName: data.sectionName,
                courseId: course._id,
            }, token)
        }

        console.log("result from coursebuilder---", result);

        // update values
        if(result){
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName", "");
        }

        // loading false
        setLoading(false);


    }

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    const goToNext = () => {
        if(course.courseContent.length === 0){
            toast.error("Please add atleast one Section");
            return;
        }
        if(course.courseContent.some((section) => section.subSection.length === 0 )){
            toast.error("Please add atleast one lecture in each section");
            return;
        }

        dispatch(setStep(3));
    }

    const cancelEdit = () => {
        setEditSectionName(null);
        setValue("sectionName", "");
    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
          cancelEdit()
          return
        }
        setEditSectionName(sectionId)
        setValue("sectionName", sectionName)
      }




    return (
        <div className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
            <p className='text-2xl font-semibold text-richblack-5'>Course Builder</p>
            <form onSubmit={handleSubmit(onSubmitFunction)} className='space-y-4'>
                <div className='flex flex-col space-y-2'>
                    <label className='text-sm text-richblack-5' htmlFor='sectionName'>
                        Section Name <sup className='text-pink-200'>*</sup>
                    </label>
                    <input
                        id='sectionName'
                        placeholder='Add section name'
                        {...register('sectionName', {required: true})}
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className='form-style w-full rounded-[0.5rem] bg-richblack-600 p-[12px] pr-12 text-richblack-5'
                    />
                    {
                        errors.sectionName && (
                            <span className='ml-2 text-xs tracking-wide text-pink-200'>Section Name is required</span>
                        )
                    }
                </div>
                <div className='flex items-end gap-x-4'>
                    <IconBtn
                        type="Submit"
                        text={editSectionName ? "Edit SectionName" : "create Section"}
                        outline={true}
                        customClasses={"text-yellow-50"}
                    >
                            <FiPlusCircle className='text-yellow-50' />
                    </IconBtn>
                    {
                        editSectionName && (
                            <button
                                onClick={cancelEdit}
                                type='button'
                                className='text-sm text-richblack-300 underline ml-10'
                            >
                                Cancel Edit
                            </button>
                        )
                    }
                </div>
            </form>
            
            {/*TODO: NestedView */}
            {
                course.courseContent.length > 0 && (
                    <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
                )
            }

            {/* Next Prev Button */}
            <div className='flex justify-end gap-x-3 mt-10'>
                <button
                    onClick={goBack}
                    className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                >
                    Back
                </button>
                <IconBtn
                    text="Next"
                    onclick={goToNext}
                >
                        <IoIosArrowForward />

                </IconBtn>
            </div>


        </div>
    )
}

export default CourseBuilderForm;