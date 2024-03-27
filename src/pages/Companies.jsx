import React, { useState, useEffect } from "react";
import { DotLoader } from "react-spinners";
import desk from "../static/images/desk.jpg";
import company from "../static/images/testimages/How to Apply (4).png";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./customCss/company.css";

function Companies() {
  window.scrollTo(0, 0);
  document.title = "Companies";

  const MySwal = withReactContent(Swal);

  const [screenSize, setScreenSize] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize]);

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [usersearched, setUserSearched] = useState(false);

  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("companiesPaginationIndex")) || 1
  );
  const itemsPerPage = 12;
  let pagination = [];

  const pagesCount = Math.ceil(companies.length / itemsPerPage);

  if (pagesCount <= 3) {
    pagination = Array.from({ length: pagesCount }, (_, i) => i + 1);
  } else if (currentPage === 1 || currentPage === 2) {
    pagination = [1, 2, 3];
  } else if (currentPage === pagesCount || currentPage === pagesCount - 1) {
    pagination = [pagesCount - 2, pagesCount - 1, pagesCount];
  } else {
    pagination = [currentPage - 1, currentPage, currentPage + 1];
  }

  const handleClick = (e, index) => {
    e.preventDefault();
    if (index !== currentPage && index > 0 && index <= pagesCount) {
      setCurrentPage(index);
      localStorage.setItem("companiesPaginationIndex", index);
    }
  };

  const renderItems = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    if (currentPage === pagesCount) {
      return companies.slice(start);
    } else {
      return companies.slice(start, end);
    }
  };

  async function fetchData() {
    setLoading(true);

    const response = await fetch(
      "https://anubhava-backend.vercel.app/companies"
    );
    const data = await response.json();
    setCompanies(data);
    setLoading(false);
  }

  const handleFilter = (e) => {
    e.preventDefault();
    localStorage.setItem("companiesPaginationIndex", 1);
    setCurrentPage(1);
    pagination = [];
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
    localStorage.setItem("companiesPaginationIndex", 1);
    setCurrentPage(1);
    setCompanies([]);
    let search;
    if (val == "") {
      search = document.getElementById("searchbox").value;
      if (search == "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a search term!",
          confirmButtonColor: "#36528b",
        });
        return;
      }
    } else {
      search = val;
    }
    setSearchString(search);
    setUserSearched(true);
    setLoading(true);
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      "https://anubhava-backend.vercel.app/companies/search/" + search,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        if (result == "[]") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No results found!",
            confirmButtonColor: "#36528b",
          });
          setCompanies([]);
        } else {
          setCompanies(JSON.parse(result));
        }
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
    search = "";
  };

  const clearSearch = () => {
    setSearchString("");
    document.getElementById("searchbox").value = "";
    fetchData();
    setUserSearched(false);
  };

  const override = {
    display: "block",
    margin: "0 auto",
    padding: "0",
    opacity: 1,
  };

  useEffect(() => {
    fetchData();
    if (localStorage.getItem("companiesPaginationIndex") === null) {
      localStorage.setItem("companiesPaginationIndex", 0);
    }
  }, []);

  return (
    <div className="md:mt-20 mt-[65px] flex flex-col relative h-full w-full">
      <div
        // style={{
        //   backgroundImage: `linear-gradient(0deg, rgba(15, 37, 80, 0.7), rgba(15, 37, 80, 0.7)), url(${desk})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
        className={`${
          !loading ? `opacity-100` : `opacity-50`
        } overflow-hidden flex flex-col bg-primary-new  mx-0 h-80 w-full`}
      >
        <img src={company} alt="Process" />
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
      <DotLoader
        cssOverride={override}
        size={150}
        className="text-yellow-400"
        color="#36528b"
        loading={loading}
      />
      {!usersearched ? (
        <div className={`${!usersearched ? `visible` : `hidden`}`}>
          <h1 className="text-2xl md:text-4xl text-yellow-400 font-medium content-center md:mt-16 md:mb-8 md:mx-16 mt-16 mb-6 mx-4">
            Our top recruiters!
          </h1>
          <div
            className={`${
              !loading ? `opacity-100` : `opacity-50`
            } grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 md:px-16 px-4 mb-10`}
          >
            {renderItems().map((company) => (
              <motion.button key={company._id}>
                <div
                  onClick={() =>
                    window.open(`/companies/${company._id}`, "_blank")
                  }
                  className="max-h-50 w-full flex flex-col overflow-hidden companycard"
                  style={{ backgroundColor: "#0B0F1B" }}
                >
                  <div className="w-full h-40 bg-light-color overflow-hidden flex items-center justify-center">
                    {company.image ? (
                      <img
                        className="object-cover h-full w-auto"
                        src={company.image}
                        alt={company.name}
                      />
                    ) : (
                      <img
                        className="object-cover h-full w-auto"
                        src="https://th.bing.com/th/id/R.ea54db5822a3b2fdbd590b49c57d8033?rik=h7e4LIz%2bY8DMwg&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fyio%2f69M%2fyio69MBoT.jpg&ehk=XuNU9Y%2fhF72ZA3cHcWcAlucA5DA0wl1zzkrLCOAL8%2bs%3d&risl=&pid=ImgRaw&r=0"
                        alt="No Image Available"
                      />
                    )}
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
            ))}
          </div>
        </div>
      ) : (
        <div
          className={`${
            !usersearched ? `visible` : `hidden`
          } grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 md:px-16 px-4 mb-10`}
        >
          {renderItems().map((company) => (
            <motion.button key={company._id}>
              <div className="max-h-50 w-full flex flex-col overflow-hidden companycard">
                <div
                  onClick={() =>
                    window.open(`/companies/${company._id}`, "_blank")
                  }
                  className="w-full h-40 bg-light-color overflow-hidden flex items-center justify-center company-image-container"
                >
                  <img
                    className="object-cover h-full w-auto"
                    src={company.image}
                    alt={company.name}
                  />
                  {/* Show paragraph on hover */}
                  <div className="company-description">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  </div>
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
          ))}
        </div>
      )}
      <div className="w-full justify-center items-center flex my-10">
        <div className="flex flex-row items-center justify-center">
          {pagination.map((page, index) => (
            <button
              key={index}
              onClick={(e) => handleClick(e, page)}
              className={`${
                page === currentPage ? "bg-primary-color text-light-color" : ""
              } hover:bg-primary-color hover:text-light-color text-primary-color font-bold py-1 px-4 mx-1 border border-primary-color rounded`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Companies;
