import React, { useEffect, useRef, useState } from "react";
import ReactElasticCarousel from "react-elastic-carousel";
import { motion } from 'framer-motion';

export default function AboutBoardOfAdvisors({ images, text, special }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageText, setImageText] = useState(null);
    const [linkedIn, setLinkedIn] = useState(null);

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

                    <img
                        onClick={() => {
                            if (linkedIn) {
                                window.open(linkedIn, '_blank');
                            }
                        }}
                        src={selectedImage} alt="Selected" className="cursor-pointer mx-auto w-[512px] h-auto" />
                    <p
                        onClick={() => {
                            if (linkedIn) {
                                window.open(linkedIn, '_blank');
                            }
                        }}
                        className={`${linkedIn ? 'hover:underline cursor-pointer' : ''} text-center text-2xl mt-4 text-light-color`}>{selectedImage && `${imageText}`}</p>
                </div>
            </div>
        );
    };
    const breakPoints = [
        { width: 1, itemsToShow: 2 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 4 },
        { width: 1200, itemsToShow: 6 },
    ]
    const carouselRef = useRef(null);
    let resetTimeout;
    return (
        <div className="flex flex-col mt-10">
            <div className='relative flex items-center md:mx-28 mx-12 mb-5'>
                <h1 className='md:text-4xl text-3xl text-off-black font-[500] z-10'>{text}</h1>
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
                    {images.map((image, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 0.9 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                setSelectedImage(image['img']);
                                setIsModalOpen(true);
                                setImageText(image['special'] ? image['special'] : image['first'] + ' ' + image['last']);
                                setLinkedIn(image['linkedin']);
                            }}
                        >
                            <div className='overflow-hidden md:w-[200px] md:h-[276px] 
                            bg-light-color flex flex-col justify-center items-center p-2 md:p-8 gap-4 mx-4 md:mx-8' style={{
                                    backdropFilter: 'blur(45px)',
                                    borderRadius: '12px',
                                }}>

                                <img src={image['img']} alt="image" className='w-[144px] h-[144px] rounded-xl' />
                                <div>
                                    <h1 className='md:text-xl text-lg text-primary-color font-bold'> {image['first']} </h1>
                                    <h1 className='md:text-xl text-lg text-primary-color font-bold'> {image['last']} </h1>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                    {/* <img src={BOD1} alt="BOD1" className="h-[150px] md:h-[180px] md:w-[180px] w-[150px] z-10 rounded-lg" /></motion.button> */}
                </ReactElasticCarousel>
                {isModalOpen && <Modal />}
            </div>
        </div>
    );
}