import React from "react";
import Loadergif from "../../static/images/newloader.gif";

const Loader = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-white bg-opacity-10 z-50">
          <img src={Loadergif} alt="Anubhava" className="w-224 h-auto" />
        </div>
      )}
    </>
  );
};

export default Loader;
