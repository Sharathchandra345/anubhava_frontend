import React, { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import image from '../../static/images/home_carousel_image.png';

const HomeImageContinueScroll = () => {
    // make a useEffect for window resize and change the speed of the marquee
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth < 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        });
    }, []);


    return (
        <Marquee
            speed={isMobile ? 7 : 20}
            gradient={isMobile ? false : true}
            pauseOnHover={true}

        >
            <img src={image} className='h-[300px] md:h-[350px] object-cover mx-[28px]' alt="home_carousel_image" />
            <img src={image} className='h-[300px] md:h-[350px] object-cover mx-[28px]' alt="home_carousel_image" />
            <img src={image} className='h-[300px] md:h-[350px] object-cover mx-[28px]' alt="home_carousel_image" />

        </Marquee>
    );
};

export default HomeImageContinueScroll;
