import React from "react";
export default function YouTubeBanner({ image, link }) {
    return (
        <div className="flex flex-row md:gap-10 gap-2 px-3 md:px-10 justify-center items-center md:h-[521.88px] h-[350px] bg-primary-lighter">
            <div className='md:w-[310px] md:h-[153px] font-semibold md:text-4xl text-2xl md:leading-[51px] leading-2 '>
                <span className='text-primary-color'>Check out this </span>video for a better understanding
            </div>
            <div className=' md:w-[750px] cursor-pointer'
                onClick={() => window.open(link, "_blank")}
            >
                <img className=' rounded-xl' src={image} alt="youtube" />
            </div>
        </div>
    )
}