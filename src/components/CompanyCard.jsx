import React from "react";

export default function CompanyCard({ title, icon, body }) {
  return (
    <div className="flex flex-col max-w-[350px] min-w-[300px] shadow-lg p-4 bg-primary-newdarkblue">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col items-center">
          <i className={`${icon} font-bold text-3xl mt-2 text-white`}></i>
        </div>
        <div className="flex flex-col items-start justify-around overflow-hidden">
          <h1 className="text-white text-lg font-bold">{title}</h1>
          <p className="text-white text-md overflow-hidden">{body}</p>
        </div>
      </div>
    </div>
  );
}
