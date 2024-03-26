import "../../pages/customCss/homeStatistics.css";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const diamondVariants = {
  visible: {
    opacity: 1,
    rotate: 45,
    transition: { ease: "easeInOut", duration: 0.5 },
  },
  hidden: {
    opacity: 0,
    rotate: 45,
    transition: { ease: "easeInOut", duration: 0.5 },
  },
};

const Diamond = ({ label, value }) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      animate={inView ? "visible" : "hidden"}
      variants={diamondVariants}
      className="diamond"
    >
      <div className="diamond-content">
        <div className="diamond-value">{value}</div>
        <div className="diamond-header">{label}</div>
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
      <div className="diamond-container">
        <div className="top-diamonds">
          <Diamond label="Applications" value={applications} />
          <Diamond label="Registrations" value={registrations} />
          <Diamond label="Companies" value={Companies} />
        </div>
        <div className="bottom-diamonds">
          <Diamond label="Job Profiles" value={job_profiles} />
          <Diamond label="Highest Stipend" value={highest_stipend} />
          <Diamond label="Average Stipend" value={average_stipend} />
          <Diamond label="States" value={states} />
        </div>
      </div>
    </div>
  );
};

export default HomeStatistics;
