import React, { useEffect, useState } from "react";
import image from "../../static/images/Companies_Banner.png";
import "../../pages/customCss/marquee.css";

const HomeImageContinueScroll = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="marquee-container">
      <div
        className="marquee-content"
        style={{
          animationDuration: isMobile ? "120s" : "120s",
        }}
      >
        {[...Array(3)].map((_, index) => (
          <img
            key={index}
            src={image}
            className="marquee-image"
            alt="home_carousel_image"
          />
        ))}
      </div>
    </div>
  );
};

export default HomeImageContinueScroll;
