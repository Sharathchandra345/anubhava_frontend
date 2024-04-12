import React from "react";
import QueryCards from "../components/ContactUsCards/QueryCards";
import PageBanner from "../components/PageBanner";
import banner from "../static/images/contact_us.png";
import Accordion from "../components/HowToApplyComponents/AccordionComponent";
import "../pages/customCss/contact.css";

function ContactUs() {
  document.title = "Contact Us";
  window.scrollTo(0, 0);
  return (
    <div className="md:mt-20 mt-[65px] flex flex-col">
      <PageBanner bannerText={"CONTACT US"} image={banner} />

      <div className="flex flex-col justify-center items-center mt-10 mb-12">
        <div className="flex flex-col gap-4 my-10 mx-2 md:flex-row md:justify-between">
          <div
            className="cursor-pointer rounded-lg text-white flex-row flex gap-2 py-2 md:py-4 md:px-8 md:w-[480px] overflow-hidden"
            onClick={() => {
              window.open("mailto:" + "ignitepcinfo@gmail.com");
            }}
          >
            <div className="rounded-full w-[28px] flex-row flex items-center justify-center ">
              <svg
                className="fill-black"
                width="24"
                height="24"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.3332 1.99998C17.3332 1.08331 16.5832 0.333313 15.6665 0.333313H2.33317C1.4165 0.333313 0.666504 1.08331 0.666504 1.99998V12C0.666504 12.9166 1.4165 13.6666 2.33317 13.6666H15.6665C16.5832 13.6666 17.3332 12.9166 17.3332 12V1.99998ZM15.6665 1.99998L8.99984 6.16665L2.33317 1.99998H15.6665ZM15.6665 12H2.33317V3.66665L8.99984 7.83331L15.6665 3.66665V12Z" />
              </svg>
            </div>

            <div className="flex flex-row items-center">
              <h1 className="font-semibold text-xs sm:text-lg md:text-2xl  text-primary-color">
                E-mail:
              </h1>
              <h1 className="font-semibold text-xs sm:text-lg md:text-2xl  text-black">
                ignitepcinfo@gmail.com
              </h1>
            </div>
          </div>
          <div className="rounded-lg text-white flex-row flex gap-2 py-2 px-2 md:py-4 md:px-2 md:w-[480px] overflow-hidden">
            <div className="rounded-full h-[28px] w-[28px] flex-row flex items-center justify-center">
              <svg
                className="fill-black"
                width="24"
                height="24"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.8752 3.09169C13.3168 1.52502 11.2418 0.666687 9.0335 0.666687C4.4835 0.666687 0.775163 4.37502 0.775163 8.92502C0.775163 10.3834 1.1585 11.8 1.87516 13.05L0.708496 17.3334L5.0835 16.1834C6.29183 16.8417 7.65016 17.1917 9.0335 17.1917C13.5835 17.1917 17.2918 13.4834 17.2918 8.93335C17.2918 6.72502 16.4335 4.65002 14.8752 3.09169ZM9.0335 15.7917C7.80016 15.7917 6.59183 15.4584 5.5335 14.8334L5.2835 14.6834L2.6835 15.3667L3.37516 12.8334L3.2085 12.575C2.52516 11.4834 2.1585 10.2167 2.1585 8.92502C2.1585 5.14169 5.24183 2.05835 9.02516 2.05835C10.8585 2.05835 12.5835 2.77502 13.8752 4.07502C15.1752 5.37502 15.8835 7.10002 15.8835 8.93335C15.9002 12.7167 12.8168 15.7917 9.0335 15.7917ZM12.8002 10.6584C12.5918 10.5584 11.5752 10.0584 11.3918 9.98335C11.2002 9.91669 11.0668 9.88335 10.9252 10.0834C10.7835 10.2917 10.3918 10.7584 10.2752 10.8917C10.1585 11.0334 10.0335 11.05 9.82516 10.9417C9.61683 10.8417 8.95016 10.6167 8.16683 9.91669C7.55016 9.36669 7.14183 8.69169 7.01683 8.48335C6.90016 8.27502 7.00016 8.16669 7.1085 8.05835C7.20016 7.96669 7.31683 7.81669 7.41683 7.70002C7.51683 7.58335 7.5585 7.49169 7.62516 7.35835C7.69183 7.21669 7.6585 7.10002 7.6085 7.00002C7.5585 6.90002 7.14183 5.88335 6.97516 5.46669C6.8085 5.06669 6.6335 5.11669 6.5085 5.10835C6.3835 5.10835 6.25016 5.10835 6.1085 5.10835C5.96683 5.10835 5.75016 5.15835 5.5585 5.36669C5.37516 5.57502 4.84183 6.07502 4.84183 7.09169C4.84183 8.10835 5.5835 9.09169 5.6835 9.22502C5.7835 9.36669 7.14183 11.45 9.2085 12.3417C9.70016 12.5584 10.0835 12.6834 10.3835 12.775C10.8752 12.9334 11.3252 12.9084 11.6835 12.8584C12.0835 12.8 12.9085 12.3584 13.0752 11.875C13.2502 11.3917 13.2502 10.9834 13.1918 10.8917C13.1335 10.8 13.0085 10.7584 12.8002 10.6584Z" />
              </svg>
            </div>

            <div className="flex flex-row">
              <h1 className="font-semibold text-xs sm:text-lg md:text-2xl text-primary-color">
                Phone:
              </h1>
              <h1 className="font-semibold text-xs sm:text-lg md:text-2xl text-black">
                (+91) 7807417341
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-primary-dark2-color p-10 bg-dark-color">
        <h1 className="text-xl md:text-4xl font-semibold text-center text-white">
          For further queries,{" "}
          <span className="text-primary-color">contact</span>
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:w-1/8">
            <div className="rounded-md p-4 flex flex-col gap-2 ">
              <h1 className="font-semibold text-md md:text-lg text-primary-color text-center">
                Devanshi Wadhwa
              </h1>
              <h1 className="text-sm md:text-base text-white text-center">
                +91 9050865102
              </h1>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:w-1/8">
            <div className="rounded-md p-4 flex flex-col gap-2 ">
              <h1 className="font-semibold text-md md:text-lg text-primary-color text-center">
                Paladh Kukreja
              </h1>
              <h1 className="text-sm md:text-base text-white text-center">
                +91 7267920107
              </h1>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:w-1/8">
            <div className="rounded-md p-4 flex flex-col gap-2 ">
              <h1 className="font-semibold text-md md:text-lg text-primary-color text-center">
                Tavleen Kaur
              </h1>
              <h1 className="text-sm md:text-base text-white text-center">
                +91 9625269494
              </h1>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:w-1/8">
            <div className="rounded-md p-4 flex flex-col gap-2 ">
              <h1 className="font-semibold text-md md:text-lg text-primary-color text-center">
                Akshat Badhwar
              </h1>
              <h1 className="text-sm md:text-base text-white text-center">
                +91 9372685856
              </h1>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:w-1/8">
            <div className="rounded-md p-4 flex flex-col gap-2 ">
              <h1 className="font-semibold text-md md:text-lg text-primary-color text-center">
                Daksh Maheshwari
              </h1>
              <h1 className="text-sm md:text-base text-white text-center">
                +91 87557739963
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 md:px-10 px-5 my-5 md:my-10">
        <div className="flex flex-row items-center gap-2 mb-3">
          <svg
            className="fill-white"
            width="40"
            height="41"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 8.375H0V36.375C0 38.575 1.8 40.375 4 40.375H32V36.375H4V8.375ZM36 0.375H12C9.8 0.375 8 2.175 8 4.375V28.375C8 30.575 9.8 32.375 12 32.375H36C38.2 32.375 40 30.575 40 28.375V4.375C40 2.175 38.2 0.375 36 0.375ZM36 28.375H12V4.375H36V28.375ZM23.02 16.695C23.84 15.235 25.38 14.375 26.28 13.095C27.24 11.735 26.7 9.215 24 9.215C22.24 9.215 21.36 10.555 21 11.675L18.26 10.535C19.02 8.295 21.04 6.375 23.98 6.375C26.44 6.375 28.14 7.495 29 8.895C29.74 10.095 30.16 12.355 29.02 14.035C27.76 15.895 26.56 16.455 25.9 17.655C25.64 18.135 25.54 18.455 25.54 20.015H22.5C22.52 19.195 22.38 17.855 23.02 16.695ZM21.9 24.275C21.9 23.095 22.84 22.195 24 22.195C25.18 22.195 26.08 23.095 26.08 24.275C26.08 25.435 25.2 26.375 24 26.375C22.84 26.375 21.9 25.435 21.9 24.275Z" />
          </svg>
          <h1 className="text-xl md:text-4xl font-bold text-primary-color">
            FREQUENTLY <span className="text-black">ASKED QUESTIONS</span>
          </h1>
        </div>
        <Accordion
          title="Can an applicant withdraw from the recruitment process of a particular company after applying ?"
          children="Once applied, a student can not withdraw from the recruitment process. Not showing up for further stages will lead to blacklisting from further drives."
        />
        <Accordion
          title="Can an applicant modify his/her CV while applying for two distinct opportunities ?"
          children="Yes, applicants can modify their CVs while applying for different opportunities but they are advised to use 1 CV for all applications."
        />
        <Accordion
          title="Are the students expected to upload their CVs in any particular format ?"
          children="No, the students are not required to adhere to a specific CV format."
        />
        <Accordion
          title="What sort of profiles can an applicant expect to see in the internship fair ?"
          children="A candidate can choose from a wide range of profiles in the fields of finance, consulting, HR, fashion, marketing and many others."
        />
        <div className="dropfaq border-b-2 border-primary-gray2"></div>
      </div>
    </div>
  );
}

export default ContactUs;
