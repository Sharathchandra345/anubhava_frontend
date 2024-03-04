import React from "react";
export default function PerkAndEligibleCard({ texts, titleTeal, titleBlack }) {
    return (
        <div className="bg-light-color rounded-lg p-10 w-full h-auto flex flex-col md:gap-4 gap-2"
            style={{ boxShadow: '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)' }}
        >
            <h1 className="md:text-4xl text-start text-3xl font-bold text-primary-color">{titleTeal} <span className="text-dark-color">{titleBlack}</span> </h1>
            <div className="row row-col gap-2 md:pl-5 pl-2">
                {texts.map((role, index) => {
                    return (
                        <div className="flex flex-row md:gap-4 gap-2 text-start" key={index}>
                            <h1 className="text-base font-semibold text-dark-color">• </h1>
                            <h1 className="text-base font-semibold text-dark-color">{role}</h1>
                        </div>

                    )
                })}
            </div>
        </div>
    )
}