import React from "react";
export default function PageBanner({ image, bannerText }) {
    return (
        <div className='flex flex-col h-full w-full'>
            <div
                style={{
                    // backgroundImage: `linear-gradient(0deg, rgba(15, 111, 123, 0.7), rgba(15, 111, 123, 0.7)), url(${image})`, // default
                    // backgroundImage: `linear-gradient(0deg, rgba(48, 153, 117, 0.7), rgba(48, 153, 117, 0.7)), url(${image})`, // 1
                    // backgroundImage: `linear-gradient(0deg, rgba(13, 27, 42, 0.7), rgba(13, 27, 42, 0.7)), url(${image})`, // 2 // BLACK
                    backgroundImage: `linear-gradient(0deg, rgba(15, 37, 80, 0.7), rgba(15, 37, 80, 0.7)), url(${image})`,

                }}
                className='opacity-100 bg-center bg-cover overflow-visible bg-primary-light mx-0 h-80 w-full'>
                <div className='h-80 z-1'>
                    <div className='flex items-center justify-center w-full h-full'>
                        <h1 className='md:text-5xl font-bold text-4xl text-white md:font-medium text-center'>{bannerText}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}