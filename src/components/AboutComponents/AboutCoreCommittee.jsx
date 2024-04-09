import React, { useEffect, useRef, useState } from "react";
import ReactElasticCarousel from "react-elastic-carousel";
import CC_1 from "../../static/images/aboutpage24/Aashman Rawat.png";
import CC_2 from "../../static/images/aboutpage24/Achint Kaur.png";
import CC_3 from "../../static/images/aboutpage24/Amandeep Singh Chadha.png";
import CC_4 from "../../static/images/aboutpage24/Dhruv Sachdeva.png";
import CC_5 from "../../static/images/aboutpage24/Divneet Kaur.png";
import CC_6 from "../../static/images/aboutpage24/Parv Arora.png";
import CC_7 from "../../static/images/aboutpage24/Sachleen Kaur Batra.png";
import CC_8 from "../../static/images/aboutpage24/Sameeksha Srivastava.png";
import CC_9 from "../../static/images/aboutpage24/Sanskaar Kulshreshtha.png";
import CC_10 from "../../static/images/aboutpage24/Shourya Raheja.png";

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

  const coreCommitteeMembers = [
    { image: CC_1, name: "Aashman Rawat" },
    { image: CC_2, name: "Achint Kaur" },
    { image: CC_3, name: "Amandeep Singh Chadha" },
    { image: CC_4, name: "Dhruv Sachdeva" },
    { image: CC_5, name: "Divneet Kaur" },
    { image: CC_6, name: "Parv Arora" },
    { image: CC_7, name: "Sachleen Kaur Batra" },
    { image: CC_8, name: "Sameeksha Srivastava" },
    { image: CC_9, name: "Sanskaar Kulshreshtha" },
    { image: CC_10, name: "Shourya Raheja" },
  ];

  return (
    <div className="flex flex-col mt-10">
      <div className="relative flex items-center md:mx-28 mx-12 mb-5">
        <h1 className="md:text-4xl text-3xl text-primary-color font-[500] z-10">
          The Core
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
          {coreCommitteeMembers.map((member, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 0.9 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setSelectedImage(member.image);
                setIsModalOpen(true);
                setImageText(member.name);
              }}
            >
              <img
                src={member.image}
                alt={`CC_${index + 1}`}
                className="h-[190px] w-[320px] z-10 rounded-lg"
              />
            </motion.button>
          ))}
        </ReactElasticCarousel>
        {isModalOpen && <Modal />}
      </div>
    </div>
  );
}
