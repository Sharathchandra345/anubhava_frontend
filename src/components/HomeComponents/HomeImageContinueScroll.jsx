import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Marquee from "react-fast-marquee";
import image from "../../static/images/Companies_Banner.png";

const HomeImageContinueScroll = () => {
  // make a useEffect for window resize and change the speed of the marquee
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
  }, []);

  return (
    <Marquee
      speed={isMobile ? 12 : 12}
      gradient={isMobile ? false : true}
      pauseOnHover={true}
    >
      {/* Wrap each image inside an anchor tag */}
      {/* <Link to="/companies"> */}
      <img
        src={image}
        className="h-[100px] md:h-[150px] object-cover mx-[28px]"
        alt="home_carousel_image"
      />
      {/* </Link> */}
      {/* <Link to="/companies"> */}
      <img
        src={image}
        className="h-[100px] md:h-[150px] object-cover mx-[28px]"
        alt="home_carousel_image"
      />
      {/* </Link> */}
      {/* <Link to="/companies"> */}
      <img
        src={image}
        className="h-[100px] md:h-[150px] object-cover mx-[28px]"
        alt="home_carousel_image"
      />
      {/* </Link> */}
    </Marquee>
  );
};

export default HomeImageContinueScroll;
