import React from "react";
import Hexagon1 from "../../static/images/hexagon1.svg";

const HexagonWithContent = ({ content, size, position }) => {
  const { top, left } = position;

  return (
    <div style={{ position: "relative", height: size, top, left }}>
      <img
        src={Hexagon1}
        alt="Hexagon"
        style={{ width: "100%", height: "100%" }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          width: "100%",
        }}
        className="text-white shadow-sm text-3xl leading-tight"
      >
        <div style={{ whiteSpace: "pre-wrap" }}>{content}</div>
      </div>
    </div>
  );
};

export default HexagonWithContent;
