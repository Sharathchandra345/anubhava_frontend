import React, { useEffect, useRef, useState } from "react";
import ReactElasticCarousel from "react-elastic-carousel";
import BOD1 from "../../static/images/aboutpage24/Avleen Kaur_BOD.png";
import BOD2 from "../../static/images/aboutpage24/Drishti Khurana_BOD.png";
import BOD3 from "../../static/images/aboutpage24/Garima Sachar_BOD.png";
import BOD4 from "../../static/images/aboutpage24/Kunal Assudani_BOD.png";
import BOD5 from "../../static/images/aboutpage24/Mankaran Singh_BOD.png";
import BOD6 from "../../static/images/aboutpage24/Rishabh Khanna_BOD.png";
import BOD7 from "../../static/images/aboutpage24/Rishima Katyal_BOD.png";
import BOD8 from "../../static/images/aboutpage24/Supreet Kaur_BOD.png";
// import BOD9 from "../../static/images/aboutpage24/Vanshita Talreja_BOD.png";
import "../../static/css/parallax.css";
import { motion } from "framer-motion";

export default function AboutCoreCommittee() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageText, setImageText] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 700);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const Modal = () => {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen bg-dark-color bg-opacity-80 flex items-center justify-center z-50 sansfont">
        <div className="p-8 rounded-lg">
          <button
            className="absolute top-10 right-10 text-primary-color"
            onClick={() => setIsModalOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <img
            src={selectedImage}
            alt="Selected"
            className="mx-auto w-[740px] h-auto"
          />
          <p className="text-center text-2xl mt-4 text-primary-color">
            {selectedImage && `${imageText}`}
          </p>
        </div>
      </div>
    );
  };

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 4 },
  ];
  const carouselRef = useRef(null);
  let resetTimeout;
  return (
    <div className="flex flex-col mt-10">
      <div className="relative flex items-center md:mx-28 mx-12 mb-5">
        <h1 className="md:text-4xl text-3xl text-primary-color font-[500] z-10">
          The Board of Directors
        </h1>
      </div>
      <div className="relative flex items-center md:mx-10 mx-4"></div>
      <div className="relative flex items-center md:mx-10 mx-4">
        <ReactElasticCarousel
          showArrows={isMobile ? false : true}
          easing="cubic-bezier(1,.15,.55,1.54)"
          tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
          transitionMs={700}
          onNextEnd={({ index }) => {
            if (
              carouselRef?.current.state.activePage ===
              carouselRef?.current.state.pages.length - 1
            ) {
              const itemsPerPage = Math.floor(
                carouselRef?.current.props.children.length /
                  carouselRef?.current.getNumOfPages()
              );

              if (itemsPerPage === carouselRef?.current.state.activeIndex) {
                clearTimeout(resetTimeout);
                resetTimeout = setTimeout(() => {
                  carouselRef?.current?.goTo(0);
                }, 5000); // same time
              }
            }
          }}
          breakPoints={breakPoints}
          className="mt-0"
          itemPadding={[2, 0, 2, 0]}
          enableAutoPlay
          autoPlaySpeed={5000}
          enableSwipe
          ref={carouselRef}
        >
          <motion.button
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setSelectedImage(BOD1);
              setIsModalOpen(true);
              setImageText("Avleen Kaur");
            }}
          >
            <img
              src={BOD1}
              alt="BOD1"
              className="h-[190px] w-[320px] z-10 rounded-lg"
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setSelectedImage(BOD2);
              setIsModalOpen(true);
              setImageText("Drishti Khurana");
            }}
          >
            <img
              src={BOD2}
              alt="BOD2"
              className="h-[190px] w-[320px] z-10 rounded-lg"
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setSelectedImage(BOD3);
              setIsModalOpen(true);
              setImageText("Garima Sachar");
            }}
          >
            <img
              src={BOD3}
              alt="BOD3"
              className="h-[190px] w-[320px] z-10 rounded-lg"
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setSelectedImage(BOD4);
              setIsModalOpen(true);
              setImageText("Kunal Assudani");
            }}
          >
            <img
              src={BOD4}
              alt="BOD4"
              className="h-[190px] w-[320px] z-10 rounded-lg"
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setSelectedImage(BOD5);
              setIsModalOpen(true);
              setImageText("Mankaran Singh");
            }}
          >
            <img
              src={BOD5}
              alt="BOD5"
              className="h-[190px] w-[320px] z-10 rounded-lg"
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setSelectedImage(BOD6);
              setIsModalOpen(true);
              setImageText("Rishabh Khanna");
            }}
          >
            <img
              src={BOD6}
              alt="BOD6"
              className="h-[190px] w-[320px] z-10 rounded-lg"
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setSelectedImage(BOD7);
              setIsModalOpen(true);
              setImageText("Rishima Katyal");
            }}
          >
            <img
              src={BOD7}
              alt="BOD7"
              className="h-[190px] w-[320px] z-10 rounded-lg"
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setSelectedImage(BOD8);
              setIsModalOpen(true);
              setImageText("Supreet Kaur");
            }}
          >
            <img
              src={BOD8}
              alt="BOD8"
              className="h-[190px] w-[320px] z-10 rounded-lg"
            />
          </motion.button>

          {/* <motion.button
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setSelectedImage(BOD9);
              setIsModalOpen(true);
              setImageText("Vanshita Talreja");
            }}
          >
            <img
              src={BOD9}
              alt="BOD9"
              className="h-[190px] w-[320px] z-10 rounded-lg"
            />
          </motion.button> */}
        </ReactElasticCarousel>
        {isModalOpen && <Modal />}
      </div>
    </div>
  );
}
