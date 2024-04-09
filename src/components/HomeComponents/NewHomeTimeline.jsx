import React from "react";
import "../../pages/customCss/NewHomeTimeline.css";

const NewHomeTimeline = () => {
  return (
    <div className="timeline-bg timeline-outer text-white py-12 px-12 relative">
      {/* <div className="timeline-line absolute top-0 left-1/2 bg-black h-full w-1 hidden sm:block z-10"></div> */}
      <div className="vertical-line"></div>
      <div className="relative">
        {/* Circle 1*/}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 circle1 w-16 h-16 text-center border-2 border-black flex items-center justify-center bg-white rounded-full z-10">
          <span className="text-black">
            10th
            <br />
            April
          </span>
        </div>

        {/* First Item */}

        <div className="timeline-item bg-1D2233 rounded-lg p-6 mb-10 relative border border-primary-color">
          <div className="flex items-center justify-start items-center ">
            <h2
              className="text-white font-bold text-2xl"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              Registrations Open!
            </h2>
          </div>

          {/* <div className="date-circle">01 Jan</div> */}
          <div className="justify-center items-center w-full">
            <p
              className="text-white mt-6 text-md w-full"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              Visit our website to register for the fair. Once registered, you
              will receive more information about the fair and participating
              companies.
            </p>
          </div>
          <div className="timeline-connector1 left-connector"></div>
        </div>
        {/* Circle 2*/}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 circle2 w-16 h-16 text-center border-2 border-black flex items-center justify-center bg-white rounded-full z-10">
          <span className="text-black">
            12th
            <br />
            April
          </span>
        </div>

        {/* Second item */}
        <div className="timeline-item bg-1D2233 rounded-lg p-6 mb-10 relative border border-primary-color ml-auto">
          <div className="flex items-center justify-start items-center ">
            <h2
              className="text-white font-bold text-2xl"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              Big Reveal!
            </h2>
          </div>
          {/* <div className="date-circle">15 Jan</div> */}
          <div className="justify-center items-center w-full">
            <p
              className="text-white mt-6 text-md w-full"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              Discover and research each company and their unique internship
              profiles that cater to various interests and skill sets.
            </p>
          </div>
          <div className="timeline-connector2 right-connector"></div>
        </div>

        {/* Circle 3*/}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 circle3 w-16 h-16 text-center border-2 border-black flex items-center justify-center bg-white rounded-full z-10">
          <span className="text-black">
            19th
            <br />
            April
          </span>
        </div>
        {/* Third item */}
        <div className="timeline-item bg-1D2233 rounded-lg p-6 mb-10 relative border border-primary-color">
          <div className="flex items-center justify-start items-center ">
            <h2
              className="text-white font-bold text-2xl"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              Applications Out!
            </h2>
          </div>
          {/* <div className="date-circle">01 Feb</div> */}
          <div className="justify-center items-center w-full">
            <p
              className="text-white mt-6 text-md w-full"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              Registered students can now apply for internships in multiple
              companies for various profiles.
            </p>
          </div>
          <div className="timeline-connector1 left-connector"></div>
        </div>

        {/* Circle 4  */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 circle4 w-16 h-16 text-center border-2 border-black flex items-center justify-center bg-white rounded-full z-10">
          <span className="text-black">
            21st
            <br />
            April
          </span>
        </div>

        {/* Fourth item */}
        <div className="timeline-item bg-1D2233 rounded-lg p-6 mb-10 relative border border-primary-color ml-auto">
          <div className="flex items-center justify-start items-center ">
            <h2
              className="text-white font-bold text-2xl"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              Final Selection!
            </h2>
          </div>
          {/* <div className="date-circle">15 Feb</div> */}
          <div className="justify-center items-center w-full">
            <p
              className="text-white mt-6 text-md w-full"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              The hiring criteria of every organization is different and will be
              disclosed to the students as the procedure follows.
            </p>
          </div>
          <div className="timeline-connector2 right-connector"></div>
        </div>
      </div>
    </div>
  );
};

export default NewHomeTimeline;
