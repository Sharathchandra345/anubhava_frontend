import React from "react";
import Poster from "./comingsoon.png";

const ComingSoon = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <img src={Poster} alt="Coming Soon" className="max-w-full max-h-full" />
    </div>
  );
};

export default ComingSoon;
