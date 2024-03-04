import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

export default function Dropdown({ body, onNameChange }) {
    const newBody = {};
    for (const key in body) {
        if (Object.hasOwnProperty.call(body, key)) {
            newBody[key] = body[key][0][0];
        }
    }
    body = Object.entries(newBody).map((el) => {
        return { [el[0]]: el[1] };
    });
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedProfiles, setSelectedProfiles] = useState([]);

    function handleCheckboxClick(profileName) {
        // Remove profile from selectedProfiles if it is already selected
        if (selectedProfiles.includes(profileName)) {
            setSelectedProfiles(selectedProfiles.filter(name => name !== profileName));
            // Else add it
        } else {
            setSelectedProfiles([...selectedProfiles, profileName]);
        }
    }

    function handleCancelClick() {
        setSelectedProfiles([]);
        setShowDropdown(false);
    }

    function handleSubmitClick() {
        onNameChange(selectedProfiles);
        setShowDropdown(false);
    }

    return (
        <div className="relative z-10">
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-light-color text-dark-color font-medium rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline"
            >
                <div className="flex flex-col w-[350px] h-20 bg-light-color rounded-lg shadow-lg p-4">
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col items-center">
                            <i className='fa fa-suitcase font-bold text-3xl mt-2 text-primary-color'></i>
                        </div>
                        <div className="flex flex-col items-start justify-around">
                            <h1 className="text-primary-color text-lg font-bold">Profile(s) included</h1>
                            <h1 className="text-dark-color font-bold text-md">{selectedProfiles.length > 0 ? 'You have selected ' + selectedProfiles.length + ' profiles' : 'Please select a profile'}</h1>
                        </div>
                    </div>
                </div>
            </motion.button >
            {showDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-[350px] rounded-md shadow-lg">
                    <div className="bg-light-color rounded-md shadow-xs">
                        <div className="py-1">
                            <h1 className="text-gray-500 font-semibold text-lg px-4 py-2">Select profiles</h1>
                            {body.map((el, index) => (
                                <a
                                    key={index}
                                    className="cursor-pointer flex flex-row gap-2 px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-200 focus:outline-none focus:bg-gray-100"
                                >

                                    <input
                                        type="checkbox"
                                        onChange={() => handleCheckboxClick(Object.keys(el)[0])}
                                        className="cursor-pointer form-checkbox h-5 w-5 text-gray-600"
                                        checked={selectedProfiles.includes(Object.keys(el)[0])}
                                    />
                                    {Object.values(el)[0]}
                                </a>
                            ))}

                            <div className="flex flex-row gap-2 py-2 px-4">
                                <button
                                    className="bg-primary-color hover:bg-primary-light text-white font-bold py-1 px-4 rounded-lg"
                                    onClick={handleSubmitClick}
                                >
                                    Select ({selectedProfiles.length})
                                </button>
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-
                                2 px-4 rounded-lg"
                                    onClick={handleCancelClick}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
}

