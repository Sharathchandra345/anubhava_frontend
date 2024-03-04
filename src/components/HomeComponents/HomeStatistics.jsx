import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
const squareVariants = {
    visible: { opacity: 1, scale: 1, transition: { ease: "easeIn", duration: 0.4 }, x: [-500, 0] },
    hidden: {
        opacity: 0, scale: 1, transition: { ease: "easeIn", duration: 0.4, x: [-500, 0] }
    }
};

const leftVariants = {
    visible: { opacity: 1, scale: 1, transition: { ease: "easeIn", duration: 1 }, x: [-500, 0] },
    hidden: {
        opacity: 0, scale: 1, transition: { ease: "easeIn", duration: 1, x: [-500, 0] }
    }
};

const rightVariants = {
    visible: { opacity: 1, scale: 1, transition: { ease: "easeIn", duration: 1 }, x: [500, 0] },
    hidden: {
        opacity: 0, scale: 1, transition: { ease: "easeIn", duration: 1, x: [500, 0] }
    }
};
export default function HomeStatistics({ Companies, applications, registrations, colleges, states, job_profiles, highest_stipend, average_stipend }) {
    const [ref, inView] = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });
    return (
        <motion.div
            ref={ref}
            animate={inView ? "visible" : "hidden"}
            variants={squareVariants}
        >

            <div className=" flex-col gap-8 mx-20 hidden md:flex">
                <div className="FIRST flex flex-row basis-1/2 gap-8">
                    <div className="bg-primary-color rounded-lg shadow-lg basis-1/6 h-28 flex flex-col gap-2 items-center justify-center">
                        <h1 className="text-3xl text-light-color font-semibold">{Companies}</h1>
                        <h1 className="text-2xl text-light-color font-semibold">Companies</h1>
                    </div>
                    <div className="bg-primary-color rounded-lg shadow-lg basis-1/6 h-28 flex flex-col gap-2 items-center justify-center">
                        <h1 className="text-3xl text-light-color font-semibold">{applications}</h1>
                        <h1 className="text-2xl text-light-color font-semibold">Applications</h1>
                    </div>
                    <div className="bg-primary-color rounded-lg shadow-lg basis-1/6 h-28 flex flex-col gap-2 items-center justify-center">
                        <h1 className="text-3xl text-light-color font-semibold">{registrations}</h1>
                        <h1 className="text-2xl text-light-color font-semibold">Registrations</h1>
                    </div>
                    <div className="bg-primary-color rounded-lg shadow-lg basis-1/6 h-28 flex flex-col gap-2 items-center justify-center">
                        <h1 className="text-3xl text-light-color font-semibold">{colleges}</h1>
                        <h1 className="text-2xl text-light-color font-semibold">Colleges</h1>
                    </div>
                    <div className="bg-primary-color rounded-lg shadow-lg basis-1/6 h-28 flex flex-col gap-2 items-center justify-center">
                        <h1 className="text-3xl text-light-color font-semibold">{states}</h1>
                        <h1 className="text-2xl text-light-color font-semibold">States</h1>
                    </div>
                    <div className="bg-primary-color rounded-lg shadow-lg basis-1/6 h-28 flex flex-col gap-2 items-center justify-center">
                        <h1 className="text-3xl text-light-color font-semibold">{job_profiles}</h1>
                        <h1 className="text-2xl text-light-color font-semibold">Job Profiles</h1>
                    </div>



                </div>
                <div className="SECOND flex flex-row basis-1/2 gap-8">
                    <div className="bg-white basis-1/6 h-28"></div>
                    <div className="bg-primary-color rounded-lg shadow-lg flex flex-col gap-2 items-center justify-center basis-2/6 h-28">
                        <h1 className="text-3xl text-light-color font-semibold">{highest_stipend}</h1>
                        <h1 className="text-2xl text-light-color font-semibold">Highest Stipend</h1>
                    </div>
                    <div className="bg-primary-color rounded-lg shadow-lg flex flex-col gap-2 items-center justify-center basis-2/6 h-28">
                        <h1 className="text-3xl text-light-color font-semibold">{average_stipend}</h1>
                        <h1 className="text-2xl text-light-color font-semibold">Average Stipend</h1>
                    </div>                <div className="bg-white basis-1/6 h-28"></div>
                </div>
            </div>

            <div className="md:hidden flex flex-col gap-4 mx-12">

                <motion.div
                    ref={ref}
                    animate={inView ? "visible" : "hidden"}
                    variants={leftVariants}
                    className="flex flex-row gap-4 items-center justify-center">

                    <div className="bg-primary-color rounded-lg shadow-lg basis-1/2 h-24 flex flex-col gap-2 items-center justify-center">
                        <h1 className="text-2xl text-light-color font-semibold">{Companies}</h1>
                        <h1 className="text-xl text-light-color font-semibold">Companies</h1>
                    </div>
                    <div className="bg-primary-color rounded-lg shadow-lg basis-1/2 h-24 flex flex-col gap-2 items-center justify-center">
                        <h1 className="text-2xl text-light-color font-semibold">{applications}</h1>
                        <h1 className="text-xl text-light-color font-semibold">Applications</h1>
                    </div>

                </motion.div>

                <div className="bg-primary-color rounded-lg shadow-lg flex flex-col gap-2 items-center justify-center h-24">
                    <h1 className="text-2xl text-light-color font-semibold">{highest_stipend}</h1>
                    <h1 className="text-xl text-light-color font-semibold">Highest Stipend</h1>
                </div>
                <div className="flex flex-row gap-4 items-center justify-center">
                    <div className="bg-primary-color rounded-lg shadow-lg basis-1/2 h-24 flex flex-col gap-2 items-center justify-center">
                        <h1 className="text-2xl text-light-color font-semibold">{registrations}</h1>
                        <h1 className="text-xl text-light-color font-semibold">Registrations</h1>

                    </div>
                    <motion.div
                        ref={ref}
                        animate={inView ? "visible" : "hidden"}
                        variants={rightVariants}
                        className="bg-primary-color rounded-lg shadow-lg basis-1/2 h-24 flex flex-col gap-2 items-center justify-center">
                        <h1 className="text-2xl text-light-color font-semibold">{colleges}</h1>
                        <h1 className="text-xl text-light-color font-semibold">Colleges</h1>

                    </motion.div>

                </div>

                <motion.div
                    ref={ref}
                    animate={inView ? "visible" : "hidden"}
                    variants={rightVariants}
                    className="bg-primary-color rounded-lg shadow-lg flex flex-col gap-2 items-center justify-center h-24">
                    <h1 className="text-2xl text-light-color font-semibold">{average_stipend}</h1>
                    <h1 className="text-xl text-light-color font-semibold">Average Stipend</h1>
                </motion.div>
            </div>


        </motion.div>
    )
}