import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RenderSteps from "../AddCourse/RenderSteps"
import { getFullDetailsOfCourse } from '../../../../services/operations/courseAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

export default function EditCourse () {

    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const {token} = useSelector((state) => state.auth);

    useEffect(() => {

        console.log("courseId--", courseId);
        const populateCourseDetails = async () => {
            setLoading(true);
            const result = await getFullDetailsOfCourse({courseId: courseId}, token);
            console.log("result from editCourse -- ", result);
            if(result) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result));
            }
            // if(result?.courseDetails) {
            //     dispatch(setLoading(true));
            //     dispatch(setCourse(result?.courseDetails));
            // }
            setLoading(false);
        }

        populateCourseDetails();
    }, [])

    if(loading){
        return (
            <div className='text-white'>
                Loading....
            </div>
        )
    }


    return (
        <div className='text-white'>
            <h1>Edit Course</h1>
            <div>
                {
                    course 
                    ? (<RenderSteps />)
                    : (<p>Course Not Found</p>)
                }
            </div>
        </div>
    )
}