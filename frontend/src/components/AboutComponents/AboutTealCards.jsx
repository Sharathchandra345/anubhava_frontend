import React from "react";
import { motion } from 'framer-motion';

function AboutTealCards({ dataArray, text }) {
    const slideLeft = () => {
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500
    }
    const slideRight = () => {
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500
    }
    return (
        <div className="flex flex-col">
            <div className='relative flex items-center md:mx-28 mx-12 mb-5'>
                <h1 className='md:text-4xl text-3xl text-off-black font-[500] z-10'>{text}</h1>
            </div>
            <div className='relative flex items-center md:mx-10 mx-4'>

                <motion.button
                    whileHover={{ scale: 2.1 }}
                    whileTap={{ scale: 0.9 }}

                ><i className='md:mr-5 mr-1 fa fa-angle-left font-bold text-3xl mt-2 text-teal-600' onClick={slideLeft} /></motion.button>


                <div id='slider' className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                    {dataArray.map((el, index) => (
                        <motion.button key={index}
                            whileHover={{ scale: 0.9 }}
                            whileTap={{ scale: 0.9 }}

                        >
                            <div className='overflow-hidden md:w-[420px] md:h-[240px] w-[350px] h-[200px] 
                            bg-dark-teal flex flex-row justify-center items-center p-4 md:p-8 gap-4 mx-4 md:mx-8' style={{
                                    boxShadow: "0px 1px 2px rgba(7, 32, 51, 0.4), 0px 2px 6px 2px rgba(7, 32, 51, 0.2)",
                                    borderRadius: '12px',
                                }}>
                                <img src={dataArray[index]['image']} className='md:w-[144px] md:h-[144px] w-[120px] h-[120px] rounded-xl' />
                                <div className='flex flex-col justify-center items-start gap-2 w-[190px] h-[190px]'>
                                    <h1 className='text-white text-lg font-medium'>{dataArray[index]['heading']}</h1>
                                    <h1 className='text-base-yellow text-md'>{dataArray[index]['subheading']}</h1>
                                    <div className="container mx-auto text-start">
                                        <div className="w-[150px]">
                                            <p className="text-white text-md " style={{ whiteSpace: 'normal' }}>
                                                {dataArray[index]['body']}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </motion.button>
                    ))
                    }


                </div>
                <motion.button
                    whileHover={{ scale: 2.1 }}
                    whileTap={{ scale: 0.9 }}

                >
                    <i className='fa fa-angle-right font-bold text-3xl md:ml-5 ml-2 mt-2 text-teal-600' onClick={slideRight} />
                </motion.button>
            </div>
        </div>
    );
}

export default AboutTealCards;