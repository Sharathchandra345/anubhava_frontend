import React from "react";
export default function AboutTopCards({ logo1, logo2 }) {

    return (
        <>
            <div className="flex flex-col m-5 md:flex-row md:gap-8 gap-4 md:mt-10 items-center justify-center">
                <div className="flex flex-col md:w-1/12 w-4/12">
                    <img src={logo1} alt="" className="md:relative z-10" />
                </div>
                <div className="flex flex-col md:w-10/12 md:gap-8 gap-4 p-8 rounded-xl" style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)' }} >
                    <h1 className='md:text-4xl text-3xl font-semibold'>About <span className='text-primary-color'>Ignite - The Placement Cell,</span> <br /><span className='text-3xl'>Sri Guru Tegh Bahadur Khalsa College</span></h1>
                    <h1>Ignite is a full fledged training and placement cell which periodically liaises and interacts with the corporate world in order to explore the possibility of training and job placement for the students. Apart from bringing a varied list of recruiters to the campus, it organizes talks,study abroad seminars, internship opportunities and workshops for the collective student body.</h1>
                </div>
            </div>

            <div className="flex m-5 flex-col md:flex-row  md:mb-10 md:gap-8 gap-4 items-center justify-center">

                <div className="flex flex-col md:w-1/12 w-4/12">
                    <img src={logo2} alt="" className="md:relative z-10" />
                </div>

                <div className="md:order-first flex flex-col md:w-10/12 md:gap-8 gap-4 p-8 rounded-xl" style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)' }} >
                    <h1 className='md:text-4xl text-3xl font-semibold'>About <span className='text-primary-color'>Anubhava - The Online Internship Fair</span></h1>
                    <h1>Ignite is a full fledged training and placement cell which periodically liaises and interacts with the corporate world in order to explore the possibility of training and job placement for the students. Apart from bringing a varied list of recruiters to the campus, it organizes talks,study abroad seminars, internship opportunities and workshops for the collective student body.</h1>
                </div>

            </div>
        </>
    )
}