import React, { useEffect, useRef, useState } from "react";
import ReactElasticCarousel from "react-elastic-carousel";
import CC_1 from '../../static/images/aboutpage/CC_1.png';
import CC_2 from '../../static/images/aboutpage/CC_2.png';
import CC_3 from '../../static/images/aboutpage/CC_3.png';
import CC_4 from '../../static/images/aboutpage/CC_4.png';
import CC_5 from '../../static/images/aboutpage/CC_5.png';
import CC_6 from '../../static/images/aboutpage/CC_6.png';
import CC_7 from '../../static/images/aboutpage/CC_7.png';
import CC_8 from '../../static/images/aboutpage/CC_8.png';
import CC_9 from '../../static/images/aboutpage/CC_9.png';

import { motion } from 'framer-motion';

export default function AboutCoreCommittee() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageText, setImageText] = useState(null);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 700);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const Modal = () => {
        return (
            <div className="fixed top-0 left-0 w-screen h-screen bg-dark-color bg-opacity-80 flex items-center justify-center z-50">
                <div className="p-8 rounded-lg">
                    <button className="absolute top-10 right-10 text-light-color" onClick={() => setIsModalOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <img src={selectedImage} alt="Selected" className="mx-auto w-[740px] h-auto" />
                    <p className="text-center text-2xl mt-4 text-light-color">{selectedImage && `${imageText}`}</p>
                </div>
            </div>
        );
    };
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 1 },
        { width: 768, itemsToShow: 2 },
        { width: 1200, itemsToShow: 4 },
    ]
    const carouselRef = useRef(null);
    let resetTimeout;
    return (
        <div className="flex flex-col mt-10">
            <div className='relative flex items-center md:mx-28 mx-12 mb-5'>
                <h1 className='md:text-4xl text-3xl text-dark-color font-[500] z-10'>The Core Committee</h1>
            </div>
            <div className='relative flex items-center md:mx-10 mx-4'></div>
            <div className='relative flex items-center md:mx-10 mx-4'>
                <ReactElasticCarousel
                    showArrows={isMobile ? false : true}
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
                    className="mt-0"
                    itemPadding={[2, 0, 2, 0]}
                    enableAutoPlay
                    autoPlaySpeed={5000}
                    enableSwipe
                    ref={carouselRef}
                >
                    <motion.button
                        whileHover={{ scale: 0.9 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            setSelectedImage(CC_1);
                            setIsModalOpen(true);
                            setImageText("Drishti Khurana");
                        }}>
                        <img src={CC_1} alt="BOD1" className="h-[190px] w-[320px] z-10 rounded-lg" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 0.9 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            setSelectedImage(CC_2);
                            setIsModalOpen(true);
                            setImageText("Kunal Assudani");
                        }}>
                        <img src={CC_2} alt="BOD1" className="h-[190px] w-[320px] z-10 rounded-lg" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 0.9 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            setSelectedImage(CC_3);
                            setIsModalOpen(true);
                            setImageText("Rishabh Khanna");
                        }}>
                        <img src={CC_3} alt="BOD1" className="h-[190px]  w-[320px] z-10 rounded-lg" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 0.9 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            setSelectedImage(CC_4);
                            setIsModalOpen(true);
                            setImageText("Avleen Kaur");
                        }}>
                        <img src={CC_4} alt="BOD1" className="h-[190px]  w-[320px] z-10 rounded-lg" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 0.9 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            setSelectedImage(CC_5);
                            setIsModalOpen(true);
                            setImageText("Garima Sachar");
                        }}>
                        <img src={CC_5} alt="BOD1" className="h-[190px]  w-[320px] z-10 rounded-lg" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 0.9 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            setSelectedImage(CC_6);
                            setIsModalOpen(true);
                            setImageText("Mankaran Singh");
                        }}>
                        <img src={CC_6} alt="BOD1" className="h-[190px]  w-[320px] z-10 rounded-lg" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 0.9 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            setSelectedImage(CC_7);
                            setIsModalOpen(true);
                            setImageText("Rishima Katyal");
                        }}>
                        <img src={CC_7} alt="BOD1" className="h-[190px]  w-[320px] z-10 rounded-lg" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 0.9 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            setSelectedImage(CC_8);
                            setIsModalOpen(true);
                            setImageText("Supreet Kaur");
                        }}>
                        <img src={CC_8} alt="BOD1" className="h-[190px]  w-[320px] z-10 rounded-lg" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 0.9 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            setSelectedImage(CC_9);
                            setIsModalOpen(true);
                            setImageText("Vanshita Yalreja");
                        }}>
                        <img src={CC_9} alt="BOD1" className="h-[190px]  w-[320px] z-10 rounded-lg" />
                    </motion.button>
                </ReactElasticCarousel>
                {isModalOpen && <Modal />}


            </div>
        </div>
    );
}