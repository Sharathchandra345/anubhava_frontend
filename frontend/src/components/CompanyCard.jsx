import React from "react";

export default function CompanyCard({ title, icon, body }) {
    return (
        <div className="flex flex-col w-[350px] h-20 bg-light-color rounded-lg shadow-lg p-4">
            <div className="flex flex-row gap-4">
                <div className="flex flex-col items-center">
                    <i className={`${icon} font-bold text-3xl mt-2 text-primary-color`}></i>

                </div>
                <div className="flex flex-col items-start justify-around">
                    <h1 className="text-primary-color text-lg font-bold"> {title}</h1>
                    <h1 className="text-dark-color text-md"> {body}</h1>
                </div>
            </div>
        </div>

    )
}