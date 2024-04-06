import "../../pages/customCss/homeStatistics.css";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const HexagonVariants = {
  visible: {
    opacity: 1,
    // rotate: 45, // Remove this line to disable rotation
    transition: { ease: "easeInOut", duration: 0.5 },
  },
  hidden: {
    opacity: 0,
    // rotate: 45, // Remove this line to disable rotation
    transition: { ease: "easeInOut", duration: 0.5 },
  },
};

const Hexagon = ({ label, value }) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      animate={inView ? "visible" : "hidden"}
      variants={HexagonVariants}
      className="Hexagon"
    >
      <div className="Hexagon-content">
        <div className="Hexagon-value">{value}</div>
        <div className="Hexagon-header">{label}</div>
      </div>
    </motion.div>
  );
};

const HomeStatistics = ({
  applications,
  registrations,
  Companies,
  job_profiles,
  highest_stipend,
  average_stipend,
  states,
}) => {
  return (
    <div className="center">
      <div className="Hexagon-container">
        <div className="top-Hexagons">
          <Hexagon label="Applications" value={applications} />
          <Hexagon label="Registrations" value={registrations} />
          <Hexagon label="Companies" value={Companies} />
        </div>
        <div className="bottom-Hexagons">
          <Hexagon label="Job Profiles" value={job_profiles} />
          <Hexagon label="Highest Stipend" value={highest_stipend} />
          <Hexagon label="Average Stipend" value={average_stipend} />
          <Hexagon label="States" value={states} />
        </div>
      </div>
    </div>
  );
};

export default HomeStatistics;
