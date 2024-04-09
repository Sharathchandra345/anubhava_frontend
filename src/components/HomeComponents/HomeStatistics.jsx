import React from "react";
import HexagonWithContent from "./HexagonWithContent";

const HomeStatistics = () => {
  // Hardcoded positions for each HexagonWithContent component
  const hexagonPositions = [
    { top: "100px", left: "-380px" },
    { top: "-435px", left: "-180px" },
    { top: "-1310px", left: "-180px" },
    { top: "-1850px", left: "20px" },
    { top: "-2610px", left: "220px" },
    { top: "-3035px", left: "220px" },
    { top: "-3800px", left: "420px" },
  ];

  return (
    <div style={{ position: "relative" }} className="-mt-3 -mb-4096">
      {hexagonPositions.map((position, index) => (
        <HexagonWithContent
          key={index}
          content={getContentByIndex(index)}
          size="650px"
          position={position} // Pass position prop
        />
      ))}
    </div>
  );
};

// Function to get content based on index
const getContentByIndex = (index) => {
  switch (index) {
    case 0:
      return "Companies\n150+";
    case 1:
      return "Applications\n17k+";
    case 2:
      return "Registrations\n3.5k+";
    case 3:
      return "States: 25+";
    case 4:
      return "Job Profiles\n 100+";
    case 5:
      return "Highest Stipend\n₹80K";
    case 6:
      return "Average Stipend\n₹12K";
    default:
      return "";
  }
};

export default HomeStatistics;
