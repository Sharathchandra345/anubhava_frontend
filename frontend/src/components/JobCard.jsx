import React from "react";
export default function JobCard({ title, duration, roles, requirements }) {
    return (
        <div className="bg-primary-color rounded-lg md:p-10 px-2 py-4 w-[440px] md:w-[550px] h-[880px] flex flex-col md:gap-4 gap-3 items-start justify-start">
            <h1 className="md:text-3xl text-2xl font-semibold text-light-color">{title}</h1>
            <h1 className="text-base font-semibold text-light-color">Duration: <span className="text-warning-color">{duration}</span></h1>
            <h1 className="md:text-xl text-lg font-semibold text-warning-color">Roles and Responsibilites</h1>
            <div className="row row-col gap-2 md:pl-5 pl-2">
                {roles.map((role, index) => {
                    return (
                        <div className="flex flex-row md:gap-4 gap-2 text-start" key={index}>
                            <h1 className="md:text-base text-sm font-semibold text-light-color">• </h1>
                            <h1 className="md:text-base text-sm font-semibold text-light-color">{role}</h1>
                        </div>

                    )
                })}
            </div>
            <h1 className="md:text-xl text-lg font-semibold text-warning-color">Skills Required</h1>
            <div className="row row-col gap-2 md:pl-5 pl-2">
                {requirements.map((requirement, index) => {
                    return (
                        <div className="flex flex-row md:gap-4 gap-2 text-start" key={index}>
                            <h1 className="md:text-base text-sm font-semibold text-light-color">• </h1>
                            <h1 className="md:text-base text-sm font-semibold text-light-color">{requirement}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}