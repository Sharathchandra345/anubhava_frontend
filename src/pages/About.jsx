import React, { useEffect, useState } from "react";
import person from "../static/images/person.jpg";
import logo1 from "../static/logos/about_page_logo.png";
import logow from "../static/logos/logowhite.jpg";
import logo2 from "..//static/logos/about_page_logo2.png";
import logo3 from "../static/logos/anubhavalogo2.png";
import logo4 from "../static/logos/ignitelogo2.png";

import campusPic from "../static/images/testimages/college_campus.jpg";
import principal1 from "../static/images/principal1.jpg";
import principal2 from "../static/images/principal2.jpg";
import "../static/css/about_parallax.css";
import AboutPrincipalMessage from "../components/AboutComponents/AboutPrincipalMessage";
import AboutTopCards from "../components/AboutComponents/AboutTopCards";
import PageBanner from "../components/PageBanner";
import AboutBoardOfAdvisors from "../components/AboutComponents/AboutBoardOfAdvisors";
import AboutCoreCommittee from "../components/AboutComponents/AboutCoreCommittee";
import AboutCoreCommitteeBOD from "../components/AboutComponents/AboutCoreCommitteeBOD";

import img1 from "../static/images/executivesphotos/Agampreet Singh.png";
import img2 from "../static/images/executivesphotos/Akshat Badhwar.png";
import img3 from "../static/images/executivesphotos/Angad Singh.png";
import img4 from "../static/images/executivesphotos/Daksh Maheshwari.png";
import img5 from "../static/images/executivesphotos/Devanshi Wadhwa.png";
import img6 from "../static/images/executivesphotos/Dhruv Singhal.png";
import img7 from "../static/images/executivesphotos/Drshika Gautam.png";
import img8 from "../static/images/executivesphotos/Dushleen Kaur.png";
import img9 from "../static/images/executivesphotos/Ekam Singh.png";
import img10 from "../static/images/executivesphotos/Guneet Kaur.png";
import img11 from "../static/images/executivesphotos/Harnoor Kaur.png";
import img12 from "../static/images/executivesphotos/Jasmeet Kaur.png";
import img13 from "../static/images/executivesphotos/Kushagra.png";
import img14 from "../static/images/executivesphotos/LakshayChhabra.png";
import img15 from "../static/images/executivesphotos/Paladh Kukreja.png";
import img16 from "../static/images/executivesphotos/Rochit Handa.png";
import img17 from "../static/images/executivesphotos/Tavleen Kaur Sachdev.png";
import img18 from "../static/images/executivesphotos/Tavleen Kaur.png";

import akars from "../static/images/aboutpage/akars.jpg";
import sharath from "../static/images/aboutpage/sharath.jpg";
import UI_ux from "../static/images/aboutpage/Suvra Shaw.jpg";
const dev = [
  {
    img: sharath,
    first: "Sharath",
    last: "Chandra",
    linkedin: "https://www.linkedin.com/in/csharath-chandra/",
    special: "Sharath Chandra - (Full Stack Developer)",
  },
];
const images2 = [
  {
    img: img1,
    first: "Agampreet",
    last: "Singh",
  },
  {
    img: img2,
    first: "Akshat",
    last: "Badhwar",
  },
  {
    img: img3,
    first: "Angad",
    last: "Singh",
  },
  {
    img: img4,
    first: "Daksh",
    last: "Maheshwari",
  },
  {
    img: img5,
    first: "Devanshi",
    last: "Wadhwa",
  },
  {
    img: img6,
    first: "Dhruv",
    last: "Singhal",
  },
  {
    img: img7,
    first: "Drshika",
    last: "Gautam",
  },
  {
    img: img8,
    first: "Dushleen",
    last: "Kaur",
  },
  {
    img: img9,
    first: "Ekam",
    last: "Singh",
  },
  {
    img: img10,
    first: "Guneet",
    last: "Kaur",
  },
  {
    img: img11,
    first: "Harnoor",
    last: "Kaur",
  },
  {
    img: img12,
    first: "Jasmeet",
    last: "Kaur",
  },
  {
    img: img13,
    first: "Kushagra",
    last: "\u00A0",
  },
  {
    img: img14,
    first: "Lakshay",
    last: "Chhabra",
  },
  {
    img: img15,
    first: "Paladh",
    last: "Kukreja",
  },
  {
    img: img16,
    first: "Rochit",
    last: "Handa",
  },
  {
    img: img17,
    first: "Tavleen",
    last: "Sachdev",
  },
  {
    img: img18,
    first: "Tavleen",
    last: "Kaur",
  },
];

// import { HashLoader } from 'react-spinners'

function About() {
  // scroll to top
  window.scrollTo(0, 0);
  document.title = "About Us";
  // TEMPORARY LOADING SCREEN
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000); // set the timeout for 3 seconds, you can adjust it according to your needs
  // }, []);
  return (
    <div className="md:mt-20 mt-[65px] flex flex-col text-black">
      {/* <HashLoader cssOverride={{
        display: "block",
        margin: "auto",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "0",
        opacity: 1,
      }} size={150} color={"#0f766e"} loading={isLoading} />
      <div className={`${!isLoading ? `opacity-100` : `opacity-50`}`}> */}
      <div>
        <PageBanner image={person} bannerText={"ABOUT US"} />
        {/* CONTENT */}
        <div className="flex flex-col">
          <AboutTopCards logo1={logo4} logo2={logo3} />

          <AboutPrincipalMessage
            campusPic={campusPic}
            principal={principal1}
            message={
              "The college has a longstanding reputation for quality education and boasts well-equipped facilities, including a library, labs, auditorium, seminar halls, and sports amenities. With a committed faculty and staff, it offers an excellent start to your career."
            }
            principal2={principal2}
            message2={
              "Our placement cell began in 2006-07, thanks to the Principal and student Dashmeet Kaur. Initially, few BPOs and KPOs visited, but now banks, consultancies, media, pharmaceuticals, and NGOs inquire about recruitment."
            }
          />

          <div className="about_parallax">
            <div className="about_parallax_overlay"></div>
            <div className="h-full w-full my-10 text-primary-color sansfont ">
              <AboutCoreCommitteeBOD />
              <AboutCoreCommittee />

              <AboutBoardOfAdvisors text="Executive Members" images={images2} />

              <AboutBoardOfAdvisors text="Development Team" images={dev} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
