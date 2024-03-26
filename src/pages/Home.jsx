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
import banner from "../static/images/banner_1.png";
import phoneBanner from "../static/images/Phone_banner_1.png";
import HomeTimeline from "../components/HomeComponents/HomeTimeline";
import HomeTimer from "../components/HomeComponents/HomeTimer";
import HomeImageContinueScroll from "../components/HomeComponents/HomeImageContinueScroll";
import "./customCss/home.css";
import NewHomeTimeline from "../components/HomeComponents/NewHomeTimeline";
import banner2 from "../components/ComingSoonPoster/CS.jpg";
function Home() {
  // scroll to top
  window.scrollTo(0, 0);
  document.title = "Anubhava";

  return (
    <div className="md:mt-20 mt-[65px] flex flex-col md:gap-8 gap-4">
      <HomeBanner imageArray={[banner2]} phoneImages={[banner2]} />
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
        <h1 className="text-3xl md:my-5 my-3 md:text-4xl font-bold">
          <span class="text-white">OUR</span>{" "}
          <span class="text-yellow-400">PROMINENT</span>{" "}
          <span class="text-white">RECRUITERS</span>
        </h1>
      </div>
      <HomeImageContinueScroll />

      <div className="flex items-center justify-center">
        <h1 className="text-3xl md:my-5 my-3 md:text-4xl font-bold">
          <span class="text-yellow-400">MEDIA</span>{" "}
          <span class="text-white">SPONSERS</span>
        </h1>
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
      />
      {/* <HomeJoingCommunity /> */}

      <div className="flex items-center justify-center">
        <h1 className="text-3xl md:my-5 my-3 md:text-4xl font-bold">
          <span class="text-yellow-400">PAST</span>{" "}
          <span class="text-white">STASTICS</span>
        </h1>
      </div>

      <HomeStatistics
        Companies={"100+"}
        applications={"11,000+"}
        registrations={"3,700+"}
        colleges={"1000+"}
        states={"25+"}
        job_profiles={"50+"}
        highest_stipend={"₹ 80,000"}
        average_stipend={"₹ 12,000"}
      />
      {/* <HomeTimer /> */}

      <div className="flex items-center justify-center">
        <h1 className="text-3xl md:my-5 my-3 md:text-4xl font-bold">
          <span class="text-yellow-400">TIMELINE</span>
        </h1>
      </div>

      {/* <HomeTimeline
        timelineArray={[
          {
            date: "12 April 2023",
            heading: "Registration",
            subheading: "Registration Opens!",
            body: "Visit our website to register for the fair. Once registered, you will receive more information about the fair and participating companies.",
          },
          {
            date: "18 April 2023",
            heading: "Companies",
            subheading: "Companies shortlisted!",
            body: "Research each company and their unique internship profiles that cater to various interests and skill sets.",
          },
          {
            date: "21 April 2023",
            heading: "Applications OUT",
            subheading: "Start applying!",
            body: "Registered students can now apply for internships in multiple companies for various profiles.",
          },
          {
            date: "23 April 2023",
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
