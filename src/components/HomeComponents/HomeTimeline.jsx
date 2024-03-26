import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import React, { useEffect, useState } from "react";
import star from "../../static/logos/star2.svg";
import date from "../../static/logos/date.svg";
import "../../static/css/parallax.css";
import "../../pages/customCss/homeTimeline.css";

export default function HomeTimeline({ timelineArray }) {
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
  const backgroundColor = isMobile ? "" : { backgroundColor: "#131424" };

  return (
    <div className={` ${backgroundColor}`}>
      <div className={isMobile ? "" : "parallax-overlay"}>
        <VerticalTimeline className="vertical-timeline-custom-line">
          {timelineArray &&
            timelineArray.map((item, index) => (
              <VerticalTimelineElement
                key={index}
                className="vertical-timeline-element--work border-r-7 border-primary-color md:block flex"
                date={item["date"]}
              >
                <div className="flex flex-row justify-center items-center gap-4 text-black">
                  <div className="flex flex-col">
                    <div className="rounded-lg flex items-center justify-center bg-primary-color custom-circle">
                      {index < 9 ? `0${index + 1}` : index + 1}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-primary-color text-lg font-bold">
                      {item["heading"]}
                    </h3>
                    <h4>{item["subheading"]}</h4>
                    <p className="text-base">{item["body"]}</p>
                  </div>
                </div>
              </VerticalTimelineElement>
            ))}
        </VerticalTimeline>
      </div>
    </div>
  );
}
