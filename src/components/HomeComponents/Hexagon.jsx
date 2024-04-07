import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import hexagonSVG from "../../static/images/hexagon1.svg";

const Hexagon = ({ label, value }) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const HexagonVariants = {
    visible: {
      opacity: 1,
      transition: { ease: "easeInOut", duration: 0.5 },
    },
    hidden: {
      opacity: 0,
      transition: { ease: "easeInOut", duration: 0.5 },
    },
  };

  return (
    <motion.div
      ref={ref}
      animate={inView ? "visible" : "hidden"}
      variants={HexagonVariants}
      className="Hexagon"
    >
      <div className="Hexagon-content">
        <img src={hexagonSVG} className="Hexagon-svg" alt="Hexagon" />
        <div className="Hexagon-content-inner">
          <div className="Hexagon-value">{value}</div>
          <div className="Hexagon-header">{label}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hexagon;
