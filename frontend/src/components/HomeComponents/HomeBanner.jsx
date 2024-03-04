import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import "../../static/css/homebanner.css";


function HomeBanner({ imageArray, phoneImages }) {

    const [screenSize, setScreenSize] = useState(window.innerWidth);
    useEffect(() => {
        function handleResize() {
            setScreenSize(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [screenSize]);

    if (screenSize > 768) {
        imageArray = imageArray;
    } else {
        imageArray = phoneImages;
    }


    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet',
                    bulletActiveClass: 'swiper-pagination-bullet-active',
                }}
                navigation={{
                    prevEl: ".swiper-prev",
                    nextEl: ".swiper-next",
                }}
                modules={[Autoplay, Pagination, Navigation]}
            >


                {imageArray.map((image, index) => {
                    return (
                        <SwiperSlide key={index} className="text-center  md:h-full h-80 flex justify-center items-center">
                            <img className="object-cover w-full md:h-full h-auto block" src={image} />
                        </SwiperSlide>
                    )
                })}

                <div className="absolute inset-y-1/2 left-0 z-50">
                    <button className="swiper-prev bg-light-color border border-dark-color rounded-full w-6 h-6 md:w-8 md:h-8 ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        <span className="sr-only">Previous</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="w-6 h-6 md:w-8 md:h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                className="stroke-primary-color"
                                d="M13 18.5l-7-7 7-7"
                            />
                        </svg>
                    </button>
                </div>
                <div className="absolute inset-y-1/2 right-0 z-50">
                    <button className="swiper-next bg-light-color border border-dark-color rounded-full w-6 h-6 md:w-8 md:h-8 mr-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        <span className="sr-only">Next</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"

                            className="w-6 h-6 md:w-8 md:h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="stroke-primary-color"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </Swiper>
        </div>
    );
}

export default HomeBanner;