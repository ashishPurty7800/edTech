import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { useState, useEffect } from 'react';
import { fetchCourseDetails } from '../services/operations/courseAPI';
import  GetAvgRating  from "../utils/avgRating";
import Error from "./Error";
import ConfirmationModal from "../components/common/ConfirmationModal";
import RatingStars from "../components/common/RatingStars";
import { formatDate } from '../services/formatDate';
import CourseDetailCard from '../components/core/Course/CourseDetailCard';
import { BiInfoCircle } from 'react-icons/bi';
import { HiOutlineGlobeAlt } from 'react-icons/hi';
import Footer from '../components/common/Footer';
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar';
import { enrollStudentsPayment } from "../services/operations/paymentAPI";



const CourseDetails = () => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const {loading} = useSelector((state) => state.profile);
    const {paymentLoading} = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams();

    const [courseData, setCourseData] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);

    useEffect(() => {
        const getCourseFullDetails = async() => {
            try{
                const result = await fetchCourseDetails(courseId);
                setCourseData(result);
            }
            catch(error){
                console.log("Could not fetch course details");
            }
        }

        getCourseFullDetails();
    }, [courseId]);

    const [avgReviewCount, setAverageReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(courseData?.data?.ratingAndReview);
        setAverageReviewCount(count);
    }, [courseData]);

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

    useEffect(() => {
        let lectures = 0;
        courseData?.data?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0;
        })
        setTotalNoOfLectures(lectures);

    }, [courseData]);

    const [isActive, setIsActive] = useState(Array(0));
    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id)
            ? isActive.concat(id)
            : isActive.filter((e) => e != id)
        )
    }

    // const handleBuyCourse = () => {
    //     if(token) {
    //         buyCourse(token, courseId, user, navigate, dispatch);
    //         return;
    //     }
    //     setConfirmationModal({
    //         text1: "you are not Logged in",
    //         text2: "Please login to purchase the course",
    //         btn1Text: "Login",
    //         btn2Text: "Cancel",
    //         btn1Handler: () => navigate("/login"),
    //         btn2Handler: () => setConfirmationModal(null),
    //     })
    // }

    const handleBuyCourse = async () => {
        if(token){
            const data = courseData.data;
            const result = await enrollStudentsPayment(courseId , token);
            console.log("result from courseDetails----", result.data.success);
            if(result.data.success){
                navigate("/dashboard/enrolled-courses");
            }
            return;
        }
        setConfirmationModal({
            text1: "you are not Logged in",
            tet2: "Please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    if(loading || !courseData) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    
    if(!courseData.success){
        return (
            <div>
                <Error />
            </div>
        )
    }


    const {
        _id:course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReview,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseData.data;

    // console.log("courseData--", courseData.data.courseContent[0].subSection);
    console.log("courseData--", courseData.data);
    // console.log("createdAt---", createdAt );

    



    return (
        <div>
            <div className={`relative min-h-[calc(100vh-3.5rem)] place-items-center`}>
            {/* Hero Section */}
            
                <div className='mx-auto box-content px-4 lg:w-[1260px] 2xl:relative'>
                    <div className='mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]'>
                        {/* <div>
                            <div></div>
                            <img
                                src={thumbnail}
                                alt="course thumbnail"
                            />
                        </div> */}
                        <div className='z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5'>
                            <div>
                                <p className='text-4xl font-bold text-richblack-5 sm:text-[42px]'>
                                    {courseName}
                                </p>
                            </div>
                        
                            <p className='text-richblack-200'>{courseDescription}</p>
                            <div className='text-md flex flex-wrap items-center gap-2'>
                                <span className='text-yellow-25'>{avgReviewCount}</span>
                                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                                <span>{`(${ratingAndReview.length} reviews)`}</span>
                                <span>{`(${studentsEnrolled.length} students enrolled)`}</span>
                            </div>

                            <div>
                                <p>Created By {`${instructor.firstName}`}</p>
                            </div>

                            <div className='flex flex-wrap gap-5 text-lg'>
                                <p className='flex items-center gap-2'>
                                    {" "}
                                <BiInfoCircle /> Created at {formatDate(createdAt)}
                                </p>
                                <p className='flex items-center gap-2'>
                                    {" "}
                                    <HiOutlineGlobeAlt/> English
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Courses Card */}
                    <div className='right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block'>
                        <CourseDetailCard
                            course = {courseData?.data}
                            setConfirmationModal = {setConfirmationModal}
                            handleBuyCourse = {handleBuyCourse}
                        />
                    </div>
                </div>

            </div>
            
            <div className='mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]'>
                <div className='mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]'>
                    {/* what you will learn section */}
                    <div className='my-8 border border-richblack-600 p-8'>
                        <p className='text-3xl font-semibold'>What You Will Learn</p>
                        <div className='mt-5'>
                            {whatYouWillLearn}
                        </div>
                    </div>
                    
                    {/* Course Content Section */}
                    <div className='max-w-[830px]'>
                        <div className='flex flex-col gap-3'>
                            <p className='text-[28px] font-semibold'>Course Content</p>
                            <div className='flex flex-wrap justify-between gap-2'>
                                <div className='flex gap-2'>
                                    <span>{courseContent.length} section(s)</span>
                                    <span>
                                        {totalNoOfLectures} lectures
                                    </span>
                                    <span>
                                        1h total length
                                    </span>
                                </div>
                                <div>
                                    <button
                                        className='text-yellow-25'
                                        onClick={() => setIsActive([])}
                                    >
                                        Collapse all Sections
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Course Details Accordion */}
                        <div className='py-4'>
                            {
                                courseContent?.map((course, index) => (
                                    <CourseAccordionBar
                                        course={course}
                                        key={index}
                                        isActive={isActive}
                                        handleActive={handleActive}
                                    />
                                ))
                            }
                        </div>

                        {/* Author Details */}
                        <div className='mb-12 py-4'>
                            <p className='text-[28px] font-semibold'>Author</p>
                            <div className='flex items-center gap-4 py-4'>
                                <img
                                    src={
                                        instructor.image
                                          ? instructor.image
                                          : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                                      }
                                      alt="Author"
                                      className="h-14 w-14 rounded-full object-cover"
                                />
                                <p>{`${instructor.firstName} ${instructor.lastName}`}</p>
                            </div>
                            <p>
                                {instructor?.additionalDetails?.about}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default CourseDetails;

