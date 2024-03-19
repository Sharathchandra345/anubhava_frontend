import React from "react";
import Poster from "./CS.jpg";

const ComingSoon = () => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ width: "100vw", height: "100vh", background: "#131424" }}
    >
      <img src={Poster} alt="Coming Soon" className="max-w-full max-h-full" />
    </div>
  );
};

export default ComingSoon;
