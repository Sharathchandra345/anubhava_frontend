import React from "react";
import "../../pages/customCss/NewHomeTimeline.css";

const NewHomeTimeline = () => {
  const timelineData = [
    {
      title: "Registrations Open!",
      description:
        "Visit our website to register for the fair. Once registered, you will receive more information about the fair and participating companies.",
      position: "left",
      date: "01 Jan",
    },
    {
      title: "Big Reveal!",
      description:
        "Discover and research each company and their unique internship profiles that cater to various interests and skill sets.",
      position: "right",
      date: "15 Jan",
    },
    {
      title: "Applications Out!",
      description:
        "Registered students can now apply for internships in multiple companies for various profile.",
      position: "left",
      date: "01 Feb",
    },
    {
      title: "Final Selection!",
      description:
        "The hiring criteria of every organization is different and will be disclosed to the students as the procedure follows.",
      position: "right",
      date: "15 Feb",
    },
  ];
  return (
    <div className="timeline-bg timeline-outer text-black py-12 px-12 relative">
      <div className="timeline-line absolute top-0 left-1/2 bg-black h-full w-1 hidden sm:block z-10"></div>
      <div className="flex flex-col">
        {timelineData.map((item, index) => (
          <div
            className={`timeline-item bg-1D2233 rounded-lg p-6 mb-10 relative border border-primary-color ${
              item.position === "right" ? "ml-auto" : ""
            }`}
            key={index}
          >
            <div className="flex items-center justify-start items-center ">
              <h2
                className={`text-white font-bold text-2xl`}
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
              >
                {item.title}
              </h2>
            </div>
            {/* Display the date as a circle */}
            <div className="date-circle">{item.date}</div>
            <div className="justify-center items-center w-full">
              <p
                className={`text-white mt-6 text-md w-full`}
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
              >
                {item.description}
              </p>
            </div>
            {/* Manually hardcode connector positions */}
            {index !== timelineData.length && (
              <div
                className={`timeline-connector ${
                  item.position === "right"
                    ? "right-connector"
                    : "left-connector"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewHomeTimeline;
