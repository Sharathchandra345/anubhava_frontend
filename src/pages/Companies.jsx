import React, { useState, useEffect } from "react";
import company from "../static/images/HowToApplyProcess.png";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./customCss/company.css";
import Loader from "../components/Loader/Loader";

function Companies() {
  window.scrollTo(0, 0);
  document.title = "Companies";

  const MySwal = withReactContent(Swal);

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [usersearched, setUserSearched] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [limit, setLimit] = useState(32); // Track the current limit

  useEffect(() => {
    fetchData();
    function handleResize() {
      setScreenSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://anubhava-backend.vercel.app/companies?limit=${limit}`
      );
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    // Store the current scroll position
    const scrollY = window.scrollY;

    // Update the state to increase the limit
    setLimit((prevLimit) => prevLimit + 32);

    // Restore the scroll position after the state has been updated
    setTimeout(() => {
      window.scrollTo({
        top: scrollY,
        behavior: "smooth",
      });
    }, 0);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    MySwal.fire({
      icon: "info",
      title: "Filter by Profile Type",
      html:
        '<div class="swal2-radio-container flex flex-col items-start">' +
        '<div class="swal2-radio flex flex-row">' +
        '<input type="radio" id="radio-marketing" name="radio" class="swal2-input" value="Marketing">' +
        '<label for="radio-marketing">Marketing</label>' +
        "</div>" +
        '<div class="swal2-radio flex flex-row">' +
        '<input type="radio" id="radio-sales" name="radio" class="swal2-input" value="Sales">' +
        '<label for="radio-sales">Sales</label>' +
        "</div>" +
        '<div class="swal2-radio flex flex-row">' +
        '<input type="radio" id="radio-finance" name="radio" class="swal2-input" value="Finance">' +
        '<label for="radio-finance">Finance</label>' +
        "</div>" +
        '<div class="swal2-radio flex flex-row">' +
        '<input type="radio" id="radio-hr" name="radio" class="swal2-input" value="HR">' +
        '<label for="radio-hr">HR</label>' +
        "</div>" +
        '<div class="swal2-radio flex flex-row">' +
        '<input type="radio" id="radio-others" name="radio" class="swal2-input" value="Others">' +
        '<label for="radio-others">Others</label>' +
        "</div>" +
        "</div>",
      focusConfirm: false,
      showCloseButton: true,
      preConfirm: () => {
        const selectedValue = document.querySelector(
          'input[name="radio"]:checked'
        ).value;
        handleSearch(selectedValue);
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonColor: "#36528b",
      allowEnterKey: false,
    });
  };

  const handleSearch = (val) => {
    setSearchString(val);

    fetch(`https://anubhava-backend.vercel.app/search/${val}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No results found!",
            confirmButtonColor: "#36528b",
          });
          setCompanies([]);
        } else {
          setCompanies(data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const clearSearch = () => {
    setSearchString("");
    fetchData();
  };

  const renderCompanies = () => {
    return companies
      .map((company, index) => (
        <motion.button key={company._id}>
          <div className="max-h-50 w-full flex flex-col overflow-hidden companycard">
            <div
              onClick={() => window.open(`/companies/${company._id}`, "_blank")}
              className="w-full h-40 bg-light-color overflow-hidden flex items-center justify-center company-image-container"
            >
              <img
                className="object-cover h-full w-auto"
                src={company.image}
                alt={company.name}
              />
            </div>
            <div className="w-full h-1/5 flex items-center justify-center companyName">
              <h1 className="text-xl text-light-color font-medium text-center cnamediv">
                {screenSize < 768
                  ? company.name.length > 10
                    ? company.name.substring(0, 10) + "..."
                    : company.name
                  : company.name}
              </h1>
            </div>
          </div>
        </motion.button>
      ))
      .slice(0, limit); // Slice the companies array to show only up to the limit
  };

  return (
    <div className="md:mt-11 mt-[65px] flex flex-col relative h-full w-full">
      <div
        className={`${
          !loading ? `opacity-100` : `opacity-50`
        } overflow-hidden flex flex-col bg-primary-new  mx-0 h-80 w-full`}
      >
        <img src={company} alt="Process" className="mt-5" />
        <div className="h-80 z-1">
          <div className="flex items-center justify-center w-full h-full">
            {/* <h1 className="md:text-5xl font-bold text-4xl text-light-color md:font-medium text-center">
              Find your favourite company!
            </h1> */}
          </div>
        </div>
        <div className="w-full justify-center items-center flex ">
          <div className="shadow-md absolute top-64 bottom-0 flex m-10 items-center bg-light-color h-20 w-11/12 rounded-lg mx-8 my-6 px-10">
            <div className="flex flex-col w-full md:pr-10 pr-5">
              <div className="flex justify-between items-center w-12/12">
                <input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(e.target.value);
                    }
                  }}
                  id="searchbox"
                  disabled={loading}
                  className="bg-light-color  text-sm outline-none w-full"
                  type="text"
                  placeholder="COMPANIES OR PROFILES"
                />
                <svg
                  className={`${
                    usersearched ? "hidden" : "visible"
                  } cursor-pointer fill-primary-color`}
                  onClick={() => handleSearch("")}
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" />
                </svg>
                <svg
                  onClick={clearSearch}
                  className={`${
                    usersearched ? "visible" : "hidden"
                  } cursor-pointer fill-primary-color`}
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L14 1.41Z" />
                </svg>
              </div>
              <div className="h-px w-12/12 bg-primary-color my-0 mx-2"></div>
            </div>
            <button
              onClick={handleFilter}
              disabled={loading}
              className="md:h-[62px] md:w-[200px] flex font-bold justify-center items-center px-4 py-2 bg-primary-color text-light-color hover:bg-primary-color rounded-lg text-sm"
            >
              <svg
                className="mr-2"
                width="18"
                height="12"
                viewBox="0 0 18 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 12H11V10H7V12ZM0 0V2H18V0H0ZM3 7H15V5H3V7Z"
                  fill="#FEFEFE"
                />
              </svg>
              Filter
            </button>
          </div>
        </div>
      </div>
      <Loader isLoading={loading} />
      <div className="grid grid-cols-2 md:grid-cols-4 mt-20 md:gap-4 gap-2 md:px-16 px-4 mb-10">
        {renderCompanies()}
      </div>
      {limit < 160 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleShowMore}
            className="bg-primary-color text-light-color font-bold px-4 py-2 m-10 rounded-lg hover:bg-primary-dark transition-colors duration-300"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}

export default Companies;
