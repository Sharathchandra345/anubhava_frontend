import React, { useState } from 'react';


const Accordion = ({ title, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="border rounded-lg">
            <div
                className={`flex items-center justify-between px-4 py-6 cursor-pointer select-none bg-primary-color ${!isExpanded ? 'rounded-xl' : 'rounded-t-xl'}`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <h2 className="md:text-lg w-11/12 text-base font-medium text-light-color">{title}</h2>
                <svg
                    className={` h-6 w-0/12 ${isExpanded ? 'transform rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M19 9l-7 7-7-7" stroke="#fff" fill="none" />
                </svg>
            </div>
            {isExpanded && (
                <div className="px-4 py-4 bg-primary-lighter rounded-b-xl text-dark-color font-bold">{children}</div>
            )}
        </div>
    );
};

export default Accordion;
