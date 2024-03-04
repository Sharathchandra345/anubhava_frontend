import React, { useRef } from "react";
import { motion } from 'framer-motion';
import Carousel from 'react-elastic-carousel';

function QueryCards({ dataArray }) {
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 6 },
    ]
    const carouselRef = useRef(null);
    let resetTimeout;
    return (
        <div className="flex flex-col">
            <div className='relative flex items-center md:mx-10 mx-4'>
                <Carousel
                    showArrows={true}
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
                    itemPadding={[5, 0, 5, 0]}
                    enableAutoPlay
                    autoPlaySpeed={5000}
                    enableSwipe
                    ref={carouselRef}

                >
                    {dataArray.map((el, index) => (
                        <motion.button key={index}
                            whileHover={{ scale: 0.9 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                // open whatsapp link in dataArray[index]['link']
                                window.open(dataArray[index]['link'], '_blank');
                            }}

                        >
                            <div className='overflow-hidden w-[200px] h-[200px] gap-2 bg-light-color
                            bg-off-white flex flex-col justify-center items-center p-2 md:p-4 mx-4 md:mx-8' style={{
                                    boxShadow: "0px 1px 2px rgba(7, 32, 51, 0.4), 0px 2px 6px 2px rgba(7, 32, 51, 0.2)",
                                    borderRadius: '12px',
                                }}>
                                <div className="flex flex-row items-center px-1 gap-2">
                                    <div className='bg-primary-color rounded-full h-[36px] w-[36px] flex-row flex items-center justify-center'>
                                        <svg className='fill-light-color' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.8752 3.09169C13.3168 1.52502 11.2418 0.666687 9.0335 0.666687C4.4835 0.666687 0.775163 4.37502 0.775163 8.92502C0.775163 10.3834 1.1585 11.8 1.87516 13.05L0.708496 17.3334L5.0835 16.1834C6.29183 16.8417 7.65016 17.1917 9.0335 17.1917C13.5835 17.1917 17.2918 13.4834 17.2918 8.93335C17.2918 6.72502 16.4335 4.65002 14.8752 3.09169ZM9.0335 15.7917C7.80016 15.7917 6.59183 15.4584 5.5335 14.8334L5.2835 14.6834L2.6835 15.3667L3.37516 12.8334L3.2085 12.575C2.52516 11.4834 2.1585 10.2167 2.1585 8.92502C2.1585 5.14169 5.24183 2.05835 9.02516 2.05835C10.8585 2.05835 12.5835 2.77502 13.8752 4.07502C15.1752 5.37502 15.8835 7.10002 15.8835 8.93335C15.9002 12.7167 12.8168 15.7917 9.0335 15.7917ZM12.8002 10.6584C12.5918 10.5584 11.5752 10.0584 11.3918 9.98335C11.2002 9.91669 11.0668 9.88335 10.9252 10.0834C10.7835 10.2917 10.3918 10.7584 10.2752 10.8917C10.1585 11.0334 10.0335 11.05 9.82516 10.9417C9.61683 10.8417 8.95016 10.6167 8.16683 9.91669C7.55016 9.36669 7.14183 8.69169 7.01683 8.48335C6.90016 8.27502 7.00016 8.16669 7.1085 8.05835C7.20016 7.96669 7.31683 7.81669 7.41683 7.70002C7.51683 7.58335 7.5585 7.49169 7.62516 7.35835C7.69183 7.21669 7.6585 7.10002 7.6085 7.00002C7.5585 6.90002 7.14183 5.88335 6.97516 5.46669C6.8085 5.06669 6.6335 5.11669 6.5085 5.10835C6.3835 5.10835 6.25016 5.10835 6.1085 5.10835C5.96683 5.10835 5.75016 5.15835 5.5585 5.36669C5.37516 5.57502 4.84183 6.07502 4.84183 7.09169C4.84183 8.10835 5.5835 9.09169 5.6835 9.22502C5.7835 9.36669 7.14183 11.45 9.2085 12.3417C9.70016 12.5584 10.0835 12.6834 10.3835 12.775C10.8752 12.9334 11.3252 12.9084 11.6835 12.8584C12.0835 12.8 12.9085 12.3584 13.0752 11.875C13.2502 11.3917 13.2502 10.9834 13.1918 10.8917C13.1335 10.8 13.0085 10.7584 12.8002 10.6584Z" />
                                        </svg>

                                    </div>
                                    <h1
                                        style={{
                                            whiteSpace: 'normal',
                                            overflowWrap: 'break-word',
                                            textAlign: 'start'
                                        }}
                                        className="text-2xl font-bold" >WhatsApp
                                    </h1>
                                </div>

                                <div className="flex flex-row items-center px-1 gap-2">
                                    {/* <div className='bg-primary-color rounded-full h-[36px] w-[36px] flex-row flex items-center justify-center'>
                                        <svg className='fill-light-color' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.8752 3.09169C13.3168 1.52502 11.2418 0.666687 9.0335 0.666687C4.4835 0.666687 0.775163 4.37502 0.775163 8.92502C0.775163 10.3834 1.1585 11.8 1.87516 13.05L0.708496 17.3334L5.0835 16.1834C6.29183 16.8417 7.65016 17.1917 9.0335 17.1917C13.5835 17.1917 17.2918 13.4834 17.2918 8.93335C17.2918 6.72502 16.4335 4.65002 14.8752 3.09169ZM9.0335 15.7917C7.80016 15.7917 6.59183 15.4584 5.5335 14.8334L5.2835 14.6834L2.6835 15.3667L3.37516 12.8334L3.2085 12.575C2.52516 11.4834 2.1585 10.2167 2.1585 8.92502C2.1585 5.14169 5.24183 2.05835 9.02516 2.05835C10.8585 2.05835 12.5835 2.77502 13.8752 4.07502C15.1752 5.37502 15.8835 7.10002 15.8835 8.93335C15.9002 12.7167 12.8168 15.7917 9.0335 15.7917ZM12.8002 10.6584C12.5918 10.5584 11.5752 10.0584 11.3918 9.98335C11.2002 9.91669 11.0668 9.88335 10.9252 10.0834C10.7835 10.2917 10.3918 10.7584 10.2752 10.8917C10.1585 11.0334 10.0335 11.05 9.82516 10.9417C9.61683 10.8417 8.95016 10.6167 8.16683 9.91669C7.55016 9.36669 7.14183 8.69169 7.01683 8.48335C6.90016 8.27502 7.00016 8.16669 7.1085 8.05835C7.20016 7.96669 7.31683 7.81669 7.41683 7.70002C7.51683 7.58335 7.5585 7.49169 7.62516 7.35835C7.69183 7.21669 7.6585 7.10002 7.6085 7.00002C7.5585 6.90002 7.14183 5.88335 6.97516 5.46669C6.8085 5.06669 6.6335 5.11669 6.5085 5.10835C6.3835 5.10835 6.25016 5.10835 6.1085 5.10835C5.96683 5.10835 5.75016 5.15835 5.5585 5.36669C5.37516 5.57502 4.84183 6.07502 4.84183 7.09169C4.84183 8.10835 5.5835 9.09169 5.6835 9.22502C5.7835 9.36669 7.14183 11.45 9.2085 12.3417C9.70016 12.5584 10.0835 12.6834 10.3835 12.775C10.8752 12.9334 11.3252 12.9084 11.6835 12.8584C12.0835 12.8 12.9085 12.3584 13.0752 11.875C13.2502 11.3917 13.2502 10.9834 13.1918 10.8917C13.1335 10.8 13.0085 10.7584 12.8002 10.6584Z" />
                                        </svg>

                                    </div> */}
                                    <h1
                                        style={{
                                            whiteSpace: 'normal',
                                            overflowWrap: 'break-word',
                                            textAlign: 'start'
                                        }}
                                        className="text-lg font-semibold" >{dataArray[index]['name']}
                                    </h1>
                                </div>
                                <h1 className="text-primary-dark font-semibold">
                                    {dataArray[index]['number']}
                                </h1>
                            </div>

                        </motion.button>
                    ))
                    }
                </Carousel>




            </div>
        </div>
    );
}

export default QueryCards;