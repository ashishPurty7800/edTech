import React from 'react';

import {Swiper, SwiperSlide} from 'swiper/react';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import Course_Card from './Course_Card';

const CourseSlider = ({Courses}) => {
    return (
        <>
            {
                Courses?.length
                ? (
                    <div>
                        <Swiper
                            slidesPerView={1}
                            loop={true}
                            spaceBetween={50}
                            modules={[Pagination, Autoplay]}
                            pagination={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                1024:{slidesPerView: 3}
                            }}
                            className="max-h-[30rem]"
                        >
                            {
                                Courses?.map((course, index) => (
                                    <SwiperSlide key={index} >
                                            <Course_Card course={course} Height={"h-[250px]"} />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                )
                : (<p className='text-xl text-richblack-5'>No Course Found</p>)
            }
        </>
    )
}

export default CourseSlider;

