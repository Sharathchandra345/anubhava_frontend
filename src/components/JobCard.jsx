import React from "react";

export default function JobCard({ title, duration, roles, requirements }) {
  return (
    <div className="bg-white rounded-lg p-4 md:p-10 w-full md:w-[740px] h-auto md:h-[880px] flex flex-col md:gap-4 gap-3 items-start justify-start border-2 border-black">
      <h1 className="font-bold text-3xl md:text-4xl text-black w-full">
        Job Description
      </h1>
      <h1 className="text-2xl md:text-3xl font-semibold text-primary-color underline">
        {title}
      </h1>
      <h1 className="text-base md:text-lg font-semibold text-primary-color">
        Duration: <span className="text-black">{duration}</span>
      </h1>
      <h1 className="text-lg md:text-xl font-semibold text-primary-color">
        Roles and Responsibilities
      </h1>
      <div className="md:pl-5 pl-2">
        {roles.map((role, index) => (
          <div className="flex flex-row gap-2 text-start" key={index}>
            <h1 className="text-sm md:text-base font-semibold text-black">
              • {role}
            </h1>
          </div>
        ))}
      </div>
      <h1 className="text-lg md:text-xl font-semibold text-primary-color">
        Skills Required
      </h1>
      <div className="md:pl-5 pl-2">
        {requirements.map((requirement, index) => (
          <div className="flex flex-row gap-2 text-start" key={index}>
            <h1 className="text-sm md:text-base font-semibold text-black">
              • {requirement}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
