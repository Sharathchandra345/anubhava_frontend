import React from "react";

const NewHomeTimeline = () => {
  const timelineData = [
    {
      title: "Registrations Open",
      description:
        "Visit our website to register for the fair. Once registered, you will receive more information about the fair and participating companies.",
    },
    {
      title: "Big Reveal",
      description:
        "Discover and research each company and their unique internship profiles that cater to various interests and skill sets.",
    },
    {
      title: "Applications Out!",
      description:
        "Registered students can now apply for internships in multiple companies for various profiles.",
    },
    {
      title: "Final Selection",
      description:
        "The hiring criteria of every organization is different and will be disclosed to the students as the procedure follows.",
    },
  ];

  return (
    <div className="timeline-bg text-white py-10 px-10 relative">
      <div className="timeline-line absolute top-0 left-1/2 bg-white h-full w-0.5 hidden md:block"></div>
      <div className="flex flex-col">
        {timelineData.map((item, index) => (
          <div
            className={`timeline-item bg-gray-400 rounded-lg p-5 mb-8 relative ${
              index % 2 === 1 ? "ml-auto" : ""
            }`}
            key={index}
          >
            <div className="flex items-center justify-between">
              <h2 className={`text-black font-bold text-lg`}>{item.title}</h2>
            </div>
            <p className={`text-black mt-2`}>{item.description}</p>
            {index !== timelineData.length - 1 && (
              <div className="timeline-connector bg-red h-0.5 w-20 absolute top-0 left-1/2 transform -translate-x-1/2 z-10"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewHomeTimeline;
