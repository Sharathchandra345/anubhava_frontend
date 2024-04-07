import React, { useEffect, useState } from "react";
import star from "../../static/logos/star2.svg";
import date from "../../static/logos/date.svg";
import "../../static/css/parallax.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./HomeTimeline.css";

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

  const formatDate = (dateStr) => {
    const dateParts = dateStr.split(" ");
    return (
      <div>
        <span className="day text-lg">{dateParts[0]}</span>
        <br />
        <div className="flex justify-center">
          <span className="month text-lg -mt-2 ">{dateParts[1]}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={isMobile ? "" : "parallax"}>
      <div className={isMobile ? "" : "parallax-overlay"}>
        {/* Main vertical line */}
        <div className="vertical-line" />

        {/* Horizontal lines */}
        {timelineArray.map((item, index) => (
          <div className="horizontal-line" key={index} />
        ))}

        <VerticalTimeline className="vertical-timeline-custom-line">
          {/* Center connector line */}
          <div className="center-connector-line" />

          {timelineArray.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work border-r-7 border-primary-color md:block flex"
              contentStyle={{
                background: "#1D2233",
                color: "#fff",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                maxWidth: "400px",
                border: "4px solid #56B2BB",
                borderRadius: "40px",
              }}
              contentArrowStyle={{ display: "none" }}
              icon={formatDate(item.date)}
              iconStyle={{
                background: "#fff",
                height: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                fontSize: "8px",
                fontWeight: "semibold",
                boxShadow: "none",
                border: "3px solid #1D2233",
                zIndex: "2",
              }}
              connectorStyle={{
                stroke: "#000",
                strokeWidth: 3,
                strokeDasharray: "5, 5",
              }}
            >
              <div className="flex flex-row justify-center items-center gap-4">
                <div className="flex flex-col">
                  <h4 className="text-2xl font-bold">{item.subheading}</h4>
                  <p className="text-base">{item.body}</p>
                </div>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
}
