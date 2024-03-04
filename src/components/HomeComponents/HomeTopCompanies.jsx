import React, { useEffect, useRef, useState } from "react";
import Carousel from 'react-elastic-carousel';
import '../../static/css/homepage_companies_carousel.css'

function HomeTopCompanies({ imageArray }) {
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

    const breakPoints = [
        { width: 1, itemsToShow: 2 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 6 },
    ]
    const carouselRef = useRef(null);
    let resetTimeout;

    return (
        <>
            <div className='relative flex items-center md:mx-5 mx-4'>
                <Carousel
                    showArrows={isMobile ? false : true}
                    easing="cubic-bezier(1,.15,.55,1.54)"
                    enableInfinite
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
                    itemPadding={[10, 0, 10, 0]}
                    enableAutoPlay
                    autoPlaySpeed={5000}
                    enableSwipe
                    ref={carouselRef}

                >
                    {imageArray.map((el, index) => (

                        < div
                            // onClick={() => window.open(el['link'], '_blank')}
                            key={index} className='inline-block p-2 cursor-pointer rounded-lg bg-light-color md:mx-4 mx-1 shadow-md' >
                            <img src={el['image']}
                                alt='company' className='w-60 h-32 md:w-60 md:h-36 rounded-lg' />
                        </div>
                    ))
                    }

                </Carousel >

            </div>
        </>
    );
}

export default HomeTopCompanies;