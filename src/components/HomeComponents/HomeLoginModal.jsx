import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeLoginModal() {
    // create a key in localStorage to check if the moddal has been closed
    if (!localStorage.getItem("modalClosed")) {
        localStorage.setItem("modalClosed", false);
    }
    const [modalClosed, setModalClosed] = useState(localStorage.getItem("modalClosed") === "true");

    const closeModal = () => {
        localStorage.setItem("modalClosed", true);
        setModalClosed(true);
    };

    return (
        <AnimatePresence>
            {!modalClosed && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    transition={{ duration: 1 }}
                    style={{
                        boxShadow: '0px 1px 2px rgba(7, 32, 51, 0.4), 0px 2px 6px 2px rgba(7, 32, 51, 0.2)'
                    }}
                    className="bg-light-color md:pb-[20px]  p-4 w-full fixed bottom-0 right-0 z-10 flex flex-col md:flex-row justify-center md:justify-between md:items-center px-4"
                >
                    <div className="flex-col md:gap-8 flex items-start justify-center gap-3 md:w-1/2">
                        <h1 className="text-xl md:text-3xl font-bold text-gray-600">Take the next step in your career 💼</h1>
                        <p className="text-base md:text-lg text-gray-600">Looking for your dream internship? Unlock job opportunities today - log in and apply now 🚀!</p>
                    </div>
                    <div className="md:w-1/2 flex flex-col md:gap-8 ">
                        <p onClick={closeModal} className="md:text-xl underline text-primary-color cursor-pointer font-bold md:text-center md:mt-0 mt-3">
                            Close{" "}
                        </p>
                        <div className="flex flex-row items-center">
                            <button
                                onClick={() => (window.location.href = "/login")}
                                className="bg-primary-color md:text-xl text-primary-lighter font-bold px-4 py-2 rounded-md mt-2 w-full"
                            >
                                Login now!
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}