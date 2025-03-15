import { motion } from "framer-motion";
import React, { useState } from "react";

export default function Dropdown({ body, onNameChange }) {
  const newBody = {};
  for (const key in body) {
    if (Object.hasOwnProperty.call(body, key)) {
      newBody[key] = body[key][0][0];
    }
  }
  body = Object.entries(newBody).map((el) => {
    return { number: el[0], name: el[1] }; // Store both number & name properly
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  function handleRadioClick(profileName) {
    setSelectedProfile(profileName);
  }

  function handleSubmitClick() {
    if (selectedProfile) {
      onNameChange([selectedProfile]);
      setShowDropdown(false);
    }
  }

  return (
    <div className="relative z-10">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-primary-newdarkblue text-dark-color font-medium hover:bg-gray-100 focus:outline-none focus:shadow-outline"
      >
        <div className="flex flex-col w-[280px] min-w-[300px] h-20 p-auto shadow-lg p-4 bg-primary-newdarkblue">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col items-center">
              <i className="fa fa-suitcase font-bold text-3xl mt-2 text-white"></i>
            </div>
            <div className="flex flex-col items-start justify-around">
              <h1 className="text-white text-lg font-bold">Profile included</h1>
              <h1 className="text-white font-bold text-md truncate overflow-ellipsis max-w-[220px]">
                {selectedProfile
                  ? `Selected: ${selectedProfile}`
                  : "Please select a profile"}
              </h1>
            </div>
          </div>
        </div>
      </motion.button>
      {showDropdown && (
        <div className="origin-top-right absolute right-0 mt-2 w-[350px] rounded-md shadow-lg">
          <div className="bg-light-color rounded-md shadow-xs">
            <div className="py-1">
              <h1 className="text-gray-500 font-semibold text-lg px-4 py-2">
                Select profile
              </h1>
              {body.map((el, index) => (
                <a
                  key={index}
                  className="cursor-pointer flex flex-row gap-2 px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-200 focus:outline-none focus:bg-gray-100"
                >
                  <input
                    type="radio"
                    name="profile"
                    onChange={() => handleRadioClick(el.name)}
                    className="cursor-pointer form-radio h-5 w-5 text-gray-600"
                    checked={selectedProfile === el.name}
                  />
                  {el.name}
                </a>
              ))}
              <div className="flex flex-row gap-2 py-2 px-4">
                <button
                  className="bg-primary-color hover:bg-primary-light text-white font-bold py-1 px-4 rounded-lg"
                  onClick={handleSubmitClick}
                  disabled={!selectedProfile}
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
