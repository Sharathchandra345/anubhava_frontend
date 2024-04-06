import React, { useEffect, useState } from "react";
import star from "../../static/logos/star2.svg";
import date from "../../static/logos/date.svg";
import "../../static/css/parallax.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

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
        <VerticalTimeline className="vertical-timeline-custom-line">
          <VerticalTimelineElement
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
            icon={formatDate(timelineArray[0]["date"])}
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
            }}
            connectorStyle={{
              stroke: "#000",
              strokeWidth: 3,
              strokeDasharray: "5, 5",
            }}
          >
            <div className="flex flex-row justify-center items-center gap-4">
              <div className="flex flex-col">
                <h4 className="text-2xl font-bold">
                  {timelineArray[0]["subheading"]}
                </h4>
                <p className="text-base">{timelineArray[0]["body"]}</p>
              </div>
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
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
            icon={formatDate(timelineArray[1]["date"])}
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
            }}
            connectorStyle={{
              stroke: "#000",
              strokeWidth: 3,
              strokeDasharray: "5, 5",
            }}
          >
            <div className="flex flex-row justify-center items-center gap-4">
              <div className="flex flex-col">
                <h4 className="text-2xl font-bold">
                  {timelineArray[1]["subheading"]}
                </h4>
                <p className="text-base">{timelineArray[1]["body"]}</p>
              </div>
            </div>
          </VerticalTimelineElement>

          <VerticalTimelineElement
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
            icon={formatDate(timelineArray[2]["date"])}
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
            }}
            connectorStyle={{
              stroke: "#000",
              strokeWidth: 3,
              strokeDasharray: "5, 5",
            }}
          >
            <div className="flex flex-row justify-center items-center gap-4">
              <div className="flex flex-col">
                <h4 className="text-2xl font-bold">
                  {timelineArray[2]["subheading"]}
                </h4>
                <p className="text-base">{timelineArray[2]["body"]}</p>
              </div>
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
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
            icon={formatDate(timelineArray[3]["date"])}
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
            }}
            connectorStyle={{
              stroke: "#000",
              strokeWidth: 3,
              strokeDasharray: "5, 5",
            }}
          >
            <div className="flex flex-row justify-center items-center gap-4">
              <div className="flex flex-col">
                <h4 className="text-2xl font-bold">
                  {timelineArray[3]["subheading"]}
                </h4>
                <p className="text-base">{timelineArray[3]["body"]}</p>
              </div>
            </div>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}
