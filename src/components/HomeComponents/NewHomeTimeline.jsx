import React from "react";
import "../../pages/customCss/NewHomeTimeline.css";

const NewHomeTimeline = () => {
  return (
    <div className="timeline-bg timeline-outer text-white py-12 px-12 relative">
      <div className="vertical-line"></div>
      <div className="relative">
        {/* First Step */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 circle1 circle-done w-16 h-16 text-center border-2 bg-primary-color flex items-center justify-center rounded-full z-10">
          <span className="text-black">Step 1</span>
        </div>
        <div className="timeline-item timeline-item-done bg-1D2233 bg-white text-black rounded-lg p-6 mb-10 relative border border-primary-color">
          <div className="flex items-center justify-start">
            <h2
              className="text-black font-bold text-2xl"
              style={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.2)" }}
            >
              Register for Opportunities
            </h2>
          </div>
          <div className="justify-center items-center w-full">
            <p
              className="mt-6 text-md w-full"
              style={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.5)" }}
            >
              Sign up on our platform to explore job and internship
              opportunities tailored to your skills and interests.
            </p>
          </div>
          <div className="timeline-connector1 left-connector"></div>
        </div>

        {/* Second Step */}
        <div className="absolute top-0 left-1/2 transform circle-done bg-primary-color -translate-x-1/2 circle2 w-16 h-16 text-center border-2 border-black flex items-center justify-center rounded-full z-10">
          <span className="text-black">Step 2</span>
        </div>
        <div className="timeline-item timeline-item-done bg-1D2233 rounded-lg p-6 mb-10 relative border border-primary-color ml-auto">
          <div className="flex items-center justify-start">
            <h2
              className="text-black font-bold text-2xl"
              style={{ textShadow: "2px 2px 4px rgba(255,255, 255, 0.5)" }}
            >
              Explore Open Roles
            </h2>
          </div>
          <div className="justify-center items-center w-full">
            <p
              className="text-black mt-6 text-md w-full"
              style={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.5)" }}
            >
              Browse through a variety of job and internship listings from top
              companies and find opportunities that suit your goals.
            </p>
          </div>
          <div className="timeline-connector2 right-connector"></div>
        </div>

        {/* Third Step */}
        <div className="absolute top-0 left-1/2 transform circle-done -translate-x-1/2 circle3 w-16 h-16 text-center border-2 border-black flex items-center justify-center bg-primary-color rounded-full z-10">
          <span className="text-black">Step 3</span>
        </div>
        <div className="timeline-item bg-1D2233 timeline-item-done rounded-lg p-6 mb-10 relative border border-primary-color">
          <div className="flex items-center justify-start">
            <h2
              className="text-black font-bold text-2xl"
              style={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.5)" }}
            >
              Apply for Positions
            </h2>
          </div>
          <div className="justify-center items-center w-full">
            <p
              className="text-black mt-6 text-md w-full"
              style={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.5)" }}
            >
              Submit your application to multiple companies and take the next
              step towards your future career.
            </p>
          </div>
          <div className="timeline-connector1 left-connector"></div>
        </div>

        {/* Fourth Step */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 circle4 circle-done w-16 h-16 text-center flex items-center justify-center bg-primary-color rounded-full z-10 border border-primary-color">
          <span className="text-black">Step 4</span>
        </div>
        <div className="timeline-item timeline-item-done rounded-lg p-6 mb-10 relative border border-primary-color ml-auto">
          <div className="flex items-center justify-start">
            <h2 className="text-black font-bold text-2xl">Final Selections</h2>
          </div>
          <div className="justify-center items-center w-full">
            <p className="text-black mt-6 text-md w-full">
              Companies will review applications and invite candidates for
              interviews based on their profiles and fit for the role.
            </p>
          </div>
          <div className="timeline-connector2 right-connector"></div>
        </div>
      </div>
    </div>
  );
};

export default NewHomeTimeline;
