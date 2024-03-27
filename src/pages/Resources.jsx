import React from "react";
import PageBanner from "../components/PageBanner";
import banner from "../static/images/ResourcesBanner.jpg";
import "../static/css/about_parallax.css";

export default function Resources() {
  // scroll to top
  window.scrollTo(0, 0);
  document.title = "Resources";

  const handleDownloadResume = () => {
    window.open("https://bit.ly/Sample_Resume_Ignite");
  };

  const handleDownloadInterviewPrep = () => {
    window.open(
      "https://drive.google.com/drive/folders/1ARKlh9s1yMDThVG9TRL9ulVcoLnRQIPt?usp=share_link"
    );
  };

  return (
    <div className="md:mt-20 mt-[65px] flex flex-col items-center">
      <PageBanner image={banner} bannerText={"Resources"} />
      <div className="flex flex-col my-10 items-center justify-center gap-10">
        <div className="flex flex-col md:flex-row justify-center gap-5">
          <div className="flex flex-col items-center">
            <button
              className="text-2xl md:text-4xl font-semibold text-white border border-white rounded px-4 py-2 hover:bg-white hover:text-black transition duration-300 flex items-center"
              onClick={handleDownloadResume}
            >
              <svg
                className="fill-white mr-2"
                width="32"
                height="41"
                viewBox="0 0 32 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 28.5H24V32.5H8V28.5ZM8 20.5H24V24.5H8V20.5ZM20 0.5H4C1.8 0.5 0 2.3 0 4.5V36.5C0 38.7 1.78 40.5 3.98 40.5H28C30.2 40.5 32 38.7 32 36.5V12.5L20 0.5ZM28 36.5H4V4.5H18V14.5H28V36.5Z" />
              </svg>
              <span className="sansfont p-2 md:p-5">
                <span className="text-primary-color">RESUME</span> TEMPLATE
              </span>
            </button>
          </div>
          <div className="flex flex-col items-center mt-5 md:mt-0">
            <button
              className="text-2xl md:text-4xl font-semibold text-white border border-white rounded px-4 py-2 hover:bg-white hover:text-black transition duration-300 flex items-center"
              onClick={handleDownloadInterviewPrep}
            >
              <svg
                className="fill-white mr-2"
                width="32"
                height="41"
                viewBox="0 0 32 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 28.5H24V32.5H8V28.5ZM8 20.5H24V24.5H8V20.5ZM20 0.5H4C1.8 0.5 0 2.3 0 4.5V36.5C0 38.7 1.78 40.5 3.98 40.5H28C30.2 40.5 32 38.7 32 36.5V12.5L20 0.5ZM28 36.5H4V4.5H18V14.5H28V36.5Z" />
              </svg>
              <span className="sansfont p-2 md:p-5">
                <span className="text-primary-color">INTERVIEW</span>{" "}
                PREPARATION
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
