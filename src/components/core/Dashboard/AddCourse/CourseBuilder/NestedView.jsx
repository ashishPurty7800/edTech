import React from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { RxDropdownMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSection } from '../../../../../services/operations/sectionAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import SubSectionModal from "./SubSectionModal";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { deleteSubSection } from '../../../../../services/operations/subSectionAPI';


const NestedView = ({handleChangeEditSectionName}) => {

    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    
    const [confirmationModal, setConfirmationModal] = useState(null);

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({sectionId, courseId: course._id, token})
        console.log("updated result from nested ---- ", result);

        if(result){
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({subSectionId, sectionId, courseId: course._id, token});
        console.log("result from nested--", result);
        console.log("course--", course);
        if(result){
            const updatedCourseContent = course.courseContent.map((section) => 
                section._id === sectionId ? result : section);
            const updatedCourse = {...course, courseContent: updatedCourseContent};
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }



    return (
        <div>
            <div className='rounded-lg bg-richblack-700 p-6 px-8'>
                {
                    course?.courseContent?.map((section) => (
                        <details key={section._id} open >
                            

                                <summary className='flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2'>
                                    <div className='flex items-center gap-x-3 ' >
                                        <RxDropdownMenu className='text-2xl text-richblack-50' />
                                        <p className='font-semibold text-richblack-50'>
                                            {section.sectionName}
                                        </p>
                                    </div>
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className='flex items-center gap-x-3'
                                    >
                                        <button
                                            onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}
                                            className='cursor-pointer'
                                        >
                                            <MdEdit className='text-xl text-richblack-300' />
                                        </button>

                                        <button
                                            onClick={() => {
                                                setConfirmationModal({
                                                    text1: "Delete this section",
                                                    text2: "All the lectures in this section will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: ()=> handleDeleteSection(section._id),
                                                    btn2Handler: () => setConfirmationModal(null),
                                                })
                                            }}
                                        >

                                                <RiDeleteBin6Line className='text-xl text-richblack-300' />

                                        </button>
                                        <span className='font-medium text-richblack-300' >|</span>
                                        <BiSolidDownArrow className={`text-xl text-richblack-300`} />
                                    </div>
                                </summary>

                                <div className='px-6 pb-4'>
                                    {/* Render All Sub Sections Within a Section */}
                                    {
                                        section.subSection.map((data) => (
                                            
                                            <div
                                                key={data?._id}
                                                onClick={() => setViewSubSection(data)}
                                                className='flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2'
                                            >

                                                    <div className='flex items-center gap-x-3 py-2'>
                                                        <RxDropdownMenu className='text-2xl text-richblack-50' />
                                                        <p className='font-semibold text-richblack-50' >
                                                            {data.title}
                                                        </p>
                                                    </div>

                                                    <div
                                                        onClick={(e) => e.stopPropagation()}
                                                        className='flex items-center gap-x-3'
                                                    >
                                                        <button
                                                            onClick={() => setEditSubSection({...data, sectionId: section._id})}
                                                        >
                                                            <MdEdit className='text-xl text-richblack-300' />
                                                        </button>

                                                        <button
                                                            onClick={() => {
                                                                setConfirmationModal({
                                                                    text1: "Delete this Sub Section",
                                                                    text2: "Selected Lecture will be deleted",
                                                                    btn1Text: "Delete",
                                                                    btn2Text: "Cancel",
                                                                    btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                                    btn2Handler: () => setConfirmationModal(null),
                                                                })
                                                            }}
                                                        >   
                                                            <RiDeleteBin6Line className='text-xl text-richblack-300' />
                                                        </button>
                                                    </div>

                                            </div>
                                        ))
                                    }
                                    <button
                                        onClick={() => setAddSubSection(section._id)}
                                        className='mt-4 flex items-center gap-x-2 text-yellow-50'
                                    >
                                        <FaPlus className='text-lg' />
                                        <p>Add Lecture</p>
                                    </button>
                                </div>

                                

                        </details>
                    ))
                }
            </div>
            {/* Modal Display */}
            {
                addSubSection
                ? (
                    <SubSectionModal
                        modalData={addSubSection}
                        setModalData={setAddSubSection}
                        add={true}
                    />
                )
                : (
                    viewSubSection
                    ? (
                        <SubSectionModal
                            modalData={viewSubSection}
                            setModalData={setViewSubSection}
                            view={true}
                        />
                    )
                    : (
                        editSubSection
                        ? (
                            <SubSectionModal
                                modalData={editSubSection}
                                setModalData={setEditSubSection}
                                edit={true}
                            />
                        )
                        : (
                            <div></div>
                        )
                    )
                )
            }
            {
                confirmationModal
                ? (
                    <ConfirmationModal modalData={confirmationModal} />
                )
                : (<div></div>)
            }
            
        </div>
    )
}

export default NestedView;