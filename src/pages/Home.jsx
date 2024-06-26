import React from "react";
import HomeBanner from "../components/HomeComponents/HomeBanner";
import img1 from "../static/images/Sponsors/1.jpg";
import img2 from "../static/images/Sponsors/2.jpg";
import img3 from "../static/images/Sponsors/3.jpg";
import img4 from "../static/images/Sponsors/4.jpg";
import img5 from "../static/images/Sponsors/5.jpg";
import img6 from "../static/images/Sponsors/6.jpg";
import HomeJoingCommunity from "../components/HomeComponents/HomeJoinCommunity";
import HomeLoginModal from "../components/HomeComponents/HomeLoginModal";
import HomeTopCompanies from "../components/HomeComponents/HomeTopCompanies";
import HomeStatistics from "../components/HomeComponents/HomeStatistics";
import banner2 from "../components/ComingSoonPoster/CS.jpg";
import HomeTimeline from "../components/HomeComponents/HomeTimeline";
import NewHomeTimeline from "../components/HomeComponents/NewHomeTimeline";
import HomeImageContinueScroll from "../components/HomeComponents/HomeImageContinueScroll";
import "./customCss/home.css";
import instagram from "../static/logos/instagram.png";
import email from "../static/logos/email.jpeg";
import whatsapp from "../static/logos/whatsapp.png";
import linkedin from "../static/logos/linkedin.png";
import banner24 from "../static/images/banner24.png";
import banner24m from "../static/images/Mobile_Banner.png";

function Home() {
  window.scrollTo(0, 0);
  document.title = "Anubhava";

  return (
    <div className="md:mt-20 mt-[65px] flex flex-col md:gap-8 gap-4">
      <HomeBanner imageArray={[banner24]} phoneImages={[banner24m]} />
      <HomeLoginModal />
      <div className="center">
        <h1 className="main-heading">ANUBHAVA 6.0</h1>
      </div>
      <p className="main-paragraph">
        Welcome to Anubhava where opportunity meets ambition! With over 150
        companies offering a myriad of profiles and an average stipend of __, we
        provide a gateway to lucrative and fulfilling internship experiences. We
        are thrilled to announce our esteemed roster of prominent recruiters,
        poised to guide and inspire the next generation of talent on their
        career journey.
      </p>
      <div className="flex items-center justify-center">
        <h1 className="md:text-3xl text-xl md:my-5 my-3 md:text-4xl font-bold">
          <span className="text-black">OUR</span>{" "}
          <span className="text-primary-color">PROMINENT</span>{" "}
          <span className="text-black">RECRUITERS</span>
        </h1>
      </div>
      <HomeImageContinueScroll />

      {/* <div className="flex items-center justify-center">
        <h1 className="text-3xl md:my-5 my-3 md:text-4xl font-bold">
          <span className="text-primary-color">MEDIA</span>{" "}
          <span className="text-black">SPONSORS</span>
        </h1>
      </div>
      <div className="hidden md:flex fixed right-0 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-50 bg-gray-600 p-4 rounded-lg">
        <a
          href="https://api.whatsapp.com/send?phone=917807417341"
          target="_blank"
          className="flex items-center justify-center gap-2"
        >
          <img
            src={whatsapp}
            alt="WhatsApp"
            className="w-6 h-6 object-contain"
          />
        </a>
        <hr className="border-t border-white w-full my-2" />
        <a
          href="https://www.linkedin.com/school/the-placement-cell-sgtb-khalsa-college/"
          target="_blank"
          className="flex items-center justify-center gap-2"
        >
          <img
            src={linkedin}
            alt="LinkedIn"
            className="w-8 h-8 object-contain"
          />
        </a>
        <hr className="border-t border-white w-full my-2" />
        <a
          href="mailto:Ignitepc.info@gmail.com"
          target="_blank"
          className="flex items-center justify-center gap-2"
        >
          <img src={email} alt="Email" className="w-6 h-6 object-contain" />
        </a>

        <hr className="border-t border-white w-full my-2" />
        <a
          href="https://www.instagram.com/placementcell.sgtbkhalsa?igsh=MThrMjNjZW9yMGZ4"
          target="_blank"
          className="flex items-center justify-center gap-2"
        >
          <img
            src={instagram}
            alt="Instagram"
            className="w-8 h-8 object-contain"
          />
        </a>
      </div>

      <HomeTopCompanies
        imageArray={[
          { image: img1, link: "https://www.google.com/" },
          { image: img2, link: "https://www.google.com/" },
          { image: img3, link: "https://www.google.com/" },
          { image: img4, link: "https://www.google.com/" },
          { image: img5, link: "https://www.google.com/" },
          { image: img6, link: "https://www.google.com/" },
        ]}
      /> */}
      {/* <HomeJoingCommunity /> */}

      <div className="flex items-center justify-center">
        <h1 className="text-3xl md:my-5 my-3 md:text-4xl font-bold">
          <span className="text-primary-color">PAST</span>{" "}
          <span className="text-black">STATISTICS</span>
        </h1>
      </div>

      <HomeStatistics />
      {/* <HomeTimer /> */}

      <div className="flex items-center justify-center">
        <h1 className="text-3xl md:my-5 my-3 md:text-4xl font-bold">
          <span className="text-primary-color">TIMELINE</span>
        </h1>
      </div>

      {/* <HomeTimeline
        timelineArray={[
          {
            date: "12th April",
            heading: "Registration",
            subheading: "Registration Opens!",
            body: "Visit our website to register for the fair. Once registered, you will receive more information about the fair and participating companies.",
          },
          {
            date: "18th April",
            heading: "Companies",
            subheading: "Companies shortlisted!",
            body: "Research each company and their unique internship profiles that cater to various interests and skill sets.",
          },
          {
            date: "21st April",
            heading: "Applications OUT",
            subheading: "Start applying!",
            body: "Registered students can now apply for internships in multiple companies for various profiles.",
          },
          {
            date: "23rd April",
            heading: "Final Selection",
            subheading: "Final Selection and offer letters!",
            body: "The hiring criteria of every organization is different and will be disclosed to the students as the procedure follows.",
          },
        ]}
      /> */}
      <NewHomeTimeline />
    </div>
  );
}

export default Home;
