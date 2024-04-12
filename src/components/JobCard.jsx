import React from "react";

export default function JobCard({ title, duration, roles, requirements }) {
  return (
    <div className="bg-white p-6 md:p-12 w-full min-w-[240px] md:w-[800px] min-h-[1200px] flex flex-col md:gap-6 gap-4 items-start justify-start border-2 border-black text-left">
      <h1 className="font-bold text-2xl md:text-4xl text-black w-full">
        Job Description
      </h1>
      <h1 className="text-xl md:text-3xl font-semibold text-primary-color underline">
        {title}
      </h1>
      <h1 className="text-lg md:text-xl font-semibold text-primary-color">
        Duration: <span className="text-black">{duration}</span>
      </h1>
      <h1 className="text-lg md:text-xl font-semibold text-primary-color">
        Roles and Responsibilities
      </h1>
      <div className="md:pl-6 pl-3">
        {roles.map((role, index) => (
          <div className="flex flex-row gap-3 text-start" key={index}>
            <h1 className="text-sm md:text-base font-semibold text-black">
              • {role}
            </h1>
          </div>
        ))}
      </div>
      <h1 className="text-lg md:text-xl font-semibold text-primary-color">
        Skills Required
      </h1>
      <div className="md:pl-6 pl-3">
        {requirements.map((requirement, index) => (
          <div className="flex flex-row gap-3 text-start" key={index}>
            <h1 className="text-sm md:text-base font-semibold text-black">
              • {requirement}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
