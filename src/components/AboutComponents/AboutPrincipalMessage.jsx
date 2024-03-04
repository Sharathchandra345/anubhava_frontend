import React, { useRef, useState } from "react";
import ReactElasticCarousel from "react-elastic-carousel";

export default function AboutPrincipalMessage({ campusPic, principal, message, principal2, message2 }) {
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 1 },
        { width: 768, itemsToShow: 1 },
        { width: 1200, itemsToShow: 1 },
    ]
    const carouselRef = useRef(null);
    let resetTimeout;
    return (
        <>
            {/* {Message from Principle} */}
            <div className="relative ">
                <img src={campusPic} alt="campus_pic" className="w-full md:h-[400px] object-cover object-center " />

                <div className="absolute inset-0 bg-dark-color opacity-50 "></div>
                <ReactElasticCarousel
                    showArrows={false}
                    easing="cubic-bezier(1,.15,.55,1.54)"
                    tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
                    transitionMs={700}
                    onNextEnd={({ index }) => {
                        if (
                            carouselRef?.current.state.activePage ===
                            carouselRef?.current.state.pages.length - 1
                        ) {
                            const itemsPerPage = Math.floor(
                                carouselRef?.current.props.children.length /
                                carouselRef?.current.getNumOfPages()
                            );

                            if (itemsPerPage === carouselRef?.current.state.activeIndex) {
                                clearTimeout(resetTimeout);
                                resetTimeout = setTimeout(() => {
                                    carouselRef?.current?.goTo(0);
                                }, 5000); // same time
                            }
                        }
                    }}
                    breakPoints={breakPoints}
                    className="inset-0 absolute items-center flex justify-center"
                    itemPadding={[2, 0, 2, 0]}
                    enableAutoPlay
                    autoPlaySpeed={5000}
                    enableSwipe
                    ref={carouselRef}
                >
                    <div className="flex items-center">
                        <div className="parent mx-auto flex items-center md:px-20 px-3">
                            <img src={principal} alt="principle" className="md:h-56 h-[350px] flex-grow md:w-32 w-20 object-contain object-center rounded-l-xl" />
                            <div className=" flex-grow ml-4 md:px-4 md:py-5 py-2 px-2 flex flex-col md:gap-8 gap-5 text-light-color bg-dark-color opacity-70 rounded-r-xl md:h-56 h-[310px]">
                                <h1 className='md:text-4xl text-2xl' >Message from <span className='text-warning-color'>Principal</span></h1>
                                <h1>{message}</h1>
                                <div className="flex flex-row justify-between">
                                    <h1 className="font-bold text-xl text-light-color">- Dr Jaswinder Singh</h1>
                                    <i className="fa fa-quote-right text-warning-color text-xl" aria-hidden="true"></i>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className=" flex items-center md:px-20 px-3">
                            <img src={principal2} alt="principle2" className="md:h-56 h-[350px] flex-grow md:w-32 w-20 object-contain object-center rounded-l-xl" />
                            <div className=" flex-grow ml-4 md:px-4 md:py-5 py-2 px-2 flex flex-col md:gap-8 gap-5 text-light-color bg-dark-color opacity-70 rounded-r-xl md:h-56 h-[310px]">
                                <h1 className='md:text-4xl text-2xl' >Message from <span className='text-warning-color'>Convenor</span></h1>
                                <h1>{message2}</h1>
                                <div className="flex flex-row justify-between">
                                    <h1 className="font-bold text-xl text-light-color">- Dr Bibhu Prasad Sahoo </h1>
                                    <i className="fa fa-quote-right text-warning-color text-xl" aria-hidden="true"></i>
                                </div>

                            </div>
                        </div>
                    </div>
                </ReactElasticCarousel>
            </div>
        </>
    )
}

