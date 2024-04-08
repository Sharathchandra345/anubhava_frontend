import React, { useState } from "react";

const Accordion = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-t-2 border-primary-gray2">
      <div
        className={`flex items-center justify-between px-4 py-6 cursor-pointer select-none bg-white`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="md:text-lg w-11/12 text-base font-medium text-primary-dark2">
          {title}
        </h2>
        <svg
          className={` h-6 w-0/12 ${isExpanded ? "transform rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 9l-7 7-7-7" stroke="#000" fill="none" />
        </svg>
      </div>
      {isExpanded && (
        <div className="px-4 py-4 bg-white rounded-b-xl text-primary-color font-bold">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
