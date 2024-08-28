import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getCourseFullDetails } from "../services/operations/courseAPI";
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from "../slices/viewCourseSlice";
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';



const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState();
    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const setCourseSpecificDetails = async() => {
            const courseData = await getCourseFullDetails({courseId}, token);
            console.log("courseData from viewCourse----", courseData);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData));
            dispatch(setCompletedLectures(courseData.completedVideos));
            
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificDetails();
    }, []);

    


    return (
        <>
            <div  className='relative flex min-h-[calc(100vh-3.5rem)]'>
                <VideoDetailsSidebar setReviewModal={setReviewModal} />

                <div className='h-[clac(100vh-3.5rem)] flex-1 overflow-auto'>
                    <div className='mx-6'>
                        <Outlet />
                    </div>
                </div>
            </div>
            {
                reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />
            }
        </>
    )
}

export default ViewCourse;