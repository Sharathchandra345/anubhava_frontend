import React, { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import desk from "../static/images/desk.jpg";
import CompanyCard from "../components/CompanyCard";
import JobCard from "../components/JobCard";
import { UserAuth, getDb } from "../context/AuthContext";
import {
  doc,
  getDocs,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  writeBatch,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";

import "../static/css/job_profile_carousel.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../static/css/job_profile_carousel.css";
import PerkAndEligibleCard from "../components/PerkAndEligibleCard";
import Dropdown from "../components/Dropdown";
import ReactElasticCarousel from "react-elastic-carousel";
import { DotLoader } from "react-spinners";
import { RWebShare } from "react-web-share";
import Loader from "../components/Loader/Loader";
function Company() {
  const date = new Date("2024-04-22T00:00:00+05:30") > new Date();
  // scroll to top
  window.scrollTo(0, 0);
  const carouselRef = useRef(null);

  // const hardReload = (

  // ) => {};

  // hardReload();
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 },
  ];
  const MySwal = withReactContent(Swal);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [applyText, setApplyText] = useState("");

  const [keys, setKeys] = useState([]);
  const [hasResume, setHasResume] = useState("");
  const [applied, setApplied] = useState(false);

  const [count, setCount] = useState(0);
  const countFunc = async () => {
    const companiesCollectionRef = collection(getDb, "companies");
    const companyId = id;
    const companyDocRef = doc(companiesCollectionRef, companyId);
    const docSnap2 = await getDoc(companyDocRef);
    // console.log(docSnap2);
    console.log("Getting company document...");
    try {
      const docSnap = await getDoc(companyDocRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        const batch = writeBatch(getDb);
        setCount(docSnap.data().count);
        console.log(count);
        // batch.update(companyDocRef, { count: docSnap.data().count + 1 });
        // // console.log(batch);
        // await batch.commit();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const navigate = useNavigate();
  const backToCompanies = useCallback(() => {
    navigate("/companies");
  }, [navigate]);

  // USE THIS HOOK and HANDLER TO GET DATA BACK FROM CHILD

  const handleNameChange = (newKey) => {
    setKeys(newKey);
  };
  const { id } = useParams();
  const { user, logOut } = UserAuth();

  async function fetchData() {
    const response = await fetch(
      "https://anubhava-backend.vercel.app/companies/" + id
    );
    const data = await response.json();
    if (data != null) {
      setLoading(false);
    }
    setData(data);
    // set page title to company name
    document.title = `${data.name} | Anubhava`;
    // Check if user is logged in
    if (user != null && user != undefined && user.uid) {
      // Check if the localStorage has user data
      const userCache = JSON.parse(localStorage.getItem(user.uid));
      // If it does not then logout the user
      if (userCache == null) {
        // navigate to account page
        MySwal.fire({
          icon: "error",
          title: "Error!",
          html:
            "<div class='flex flex-col items-start gap-2 font-bold text-xl text-red-500'>" +
            "Please fill your details." +
            "</div>",
          confirmButtonColor: "#36528b", // primary-color
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/account");
        });
      }
    }
  }
  const checkResume = async () => {
    try {
      if (user.uid != undefined) {
        const userCache = JSON.parse(localStorage.getItem(user.uid));
        if (userCache != null) {
          if (userCache.resume != undefined) {
            setHasResume(userCache.resume);
          }
        } else {
          // if there is no cache then get the data from firestore READ_ONLY
          const collectonRef2 = collection(getDb, "users");
          const docRef = doc(collectonRef2, user.uid);
          const docSnap = await getDoc(docRef);
          const resume = docSnap.data().resume;
          if (resume != undefined) {
            setHasResume(resume);
          }
        }
      }
    } catch (error) {
      setHasResume("");
      console.log(error);
    }
  };
  // This useEffect is used to fetch data from the backend
  useEffect(() => {
    setApplyText("");
    checkResume();
    fetchData();
  }, [user]);

  const handleApply = async () => {
    // Check if the date is after 21st April 2023
    if (date == true) {
      let alreadyApplied = false;
      let applyTextUpdated = "";
      setLoading(true);

      {
        console.log("checking firestore");
        const collectonRef2 = collection(getDb, "users");
        const docRef = doc(collectonRef2, user.uid);
        const docSnap = getDoc(docRef).then((doc) => {
          if (doc.exists()) {
            // if doc exists then copy it to local storage
            localStorage.setItem(user.uid, JSON.stringify(doc.data()));
            if (doc.data().contactNumber) {
              setContactNumber(doc.data().contactNumber);
            }
            if (doc.data().age) {
              setAge(doc.data().age);
            }
            if (doc.data().course) {
              setCourse(doc.data().course);
            }
            if (doc.data().yearOfStudy) {
              setYearOfStudy(doc.data().yearOfStudy);
            }
            if (doc.data().college) {
              setCollege(doc.data().college);
            }
            if (doc.data().city) {
              setCity(doc.data().city);
            }
            // applied is an array of strings which contains the id of the job the user has applied to
            if (doc.data().applied) {
            }
            setLoading(false);
          } else {
            // make a new document in firestore database and copy it to local storage
            console.log("nothing in firestore and localstorage");
            setError(true);
            setLoading(false);
          }
        });
      }
      if (user != null && user != undefined && user.uid != undefined) {
        const userCache = JSON.parse(localStorage.getItem(user.uid));
        if (userCache == null || userCache.applied == undefined) {
          // If there is no cache then send the user back to account page and ask him to fill the details
          MySwal.fire({
            icon: "error",
            title: "Error!",
            html:
              "<div class='flex flex-col items-start gap-2 font-bold text-xl text-red-500'>" +
              "Please fill your details." +
              "</div>",
            confirmButtonColor: "#36528b", // primary-color
            confirmButtonText: "Ok",
          }).then(() => {
            navigate("/account");
          });
          setLoading(false);
          return;
        }
        // Check if the localStorage applied array length is more than 20
        if (
          keys.length >= 20 ||
          (userCache.applied != undefined && userCache.applied.length >= 20)
        ) {
          MySwal.fire({
            icon: "error",
            title: "Error!",
            html:
              "<div class='flex flex-col items-start gap-2 font-bold text-xl text-red-500'>" +
              "Maximum 20 jobs can be applied at a time." +
              "</div>",
            confirmButtonColor: "#36528b", // primary-color
            confirmButtonText: "Ok",
          });
          setLoading(false);
          return;
        }

        // Assuming getDb is your Firestore instance
        const companiesCollectionRef = collection(getDb, "companies");
        const companyId = id;
        const companyDocRef = doc(companiesCollectionRef, companyId);
        const docSnap2 = await getDoc(companyDocRef);
        // console.log(docSnap2);
        const getCompanyDoc = async () => {
          console.log("Getting company document...");
          try {
            const docSnap = await getDoc(companyDocRef);
            if (docSnap.exists()) {
              // console.log("Document data:", docSnap.data());
              const batch = writeBatch(getDb);
              batch.update(companyDocRef, { count: docSnap.data().count + 1 });
              // console.log(batch);
              await batch.commit();
            } else {
              await setDoc(companyDocRef, { count: 1, companyName: data.name });
            }
          } catch (error) {
            console.error("Error getting document:", error);
          }
        };

        // If userCache applied is empty then write the elements of keys to firestore WRITE * KEYS
        if (userCache.applied.length == 0) {
          const collectonRef = collection(getDb, "users");
          const docRef = doc(collectonRef, user.uid);
          const batch = writeBatch(getDb);
          batch.update(docRef, { applied: arrayUnion(...keys) });
          // Commit the batch
          // console.log(collectonRef, docRef, batch, keys);
          await batch.commit();
          // Update the cache
          userCache.applied = [...userCache.applied, ...keys];
          // Update the localStorage
          localStorage.setItem(user.uid, JSON.stringify(userCache));

          // check if the user has already applied for the job in cache
        } else {
          for (const key of keys) {
            if (userCache.applied.includes(key)) {
              alreadyApplied = true;
              applyTextUpdated +=
                data.job_profile_description[key][0][0] + ", ";
            }
          }
          if (alreadyApplied) {
            // Do not write to firestore
          } else {
            const collectonRef = collection(getDb, "users");
            const docRef = doc(collectonRef, user.uid);
            const batch = writeBatch(getDb);
            batch.update(docRef, { applied: arrayUnion(...keys) });
            // Commit the batch
            await batch.commit();
            // Update the cache
            userCache.applied = [...userCache.applied, ...keys];
            // Update the localStorage
            localStorage.setItem(user.uid, JSON.stringify(userCache));
            getCompanyDoc();
          }
        }
      } else {
        // If user is not logged in
        MySwal.fire({
          icon: "error",
          title: "Error!",
          html:
            "<div class='flex flex-col items-start gap-2 font-bold text-xl text-red-500'>" +
            "Please fill details on Accounts page!" +
            "</div>",
          confirmButtonColor: "#36528b", // primary-color
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/account");
        });
      }
      setLoading(false);
      // Handle error messages
      if (
        user == undefined ||
        alreadyApplied == true ||
        applyTextUpdated != "" ||
        keys.length == 0 ||
        hasResume == ""
      ) {
        let errorString = "";
        if (user == undefined) {
          errorString += "<h1> ● Please Login!";
        }
        if (keys.length == 0) {
          errorString += "<h1> ● Please select a Job!";
        }
        if (applyText == true) {
          errorString += "<h1> ● Already applied!";
        }
        if (hasResume == "") {
          errorString += "<h1> ● Missing resume!";
        }
        if (applyTextUpdated != "") {
          errorString += "<h1> ● Already applied for " + applyTextUpdated;
        }
        MySwal.fire({
          icon: "error",
          title: "Error!",
          html:
            "<div class='flex flex-col items-start gap-2 font-bold text-xl text-red-500'>" +
            errorString +
            "</div>",
          confirmButtonColor: "#36528b", // primary-color
          confirmButtonText: "Ok",
        }).then(() => {
          setApplyText("");
          return;
        });
      } else {
        // Success message
        MySwal.fire({
          icon: "success",
          title: "Application Successful!",
          text: "Your application has been submitted successfully.",
          confirmButtonColor: "#36528b", // primary-color
          confirmButtonText: "Ok",
        }).then(() => {
          // Optionally, you can perform any additional actions after the user acknowledges the success message.
          // For example, navigate to another page.
          // navigate('/another-page');
        });

        // if there are no errors, go
        backToCompanies();
      }
    } else {
      // This error depends on the date, change the < or > accordingly to display error for before / after different dates
      MySwal.fire({
        // icon: "error",
        // title: "Error!",
        html:
          "<div class='text-xl text-primary-dark2 font-bold'>" +
          " ● We don't accept applications after 21st April 2023." +
          "</div>",
        confirmButtonColor: "#36528b",
        confirmButtonText: "OK",
      }).then(() => {
        return;
      });
    }
  };

  const handleDownload = () => {
    let linkText = data.pdfDescription;
    const link = document.createElement("a");
    link.href = linkText;
    link.download = "file.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  let resetTimeout;
  const website = data.about?.website;
  const work_location = data.about?.work_location;
  const about_comp = data.about?.about_comp;
  countFunc();
  return (
    <div>
      <div className="relative overflow-x-hidden md:mt-20 mt-[65px] flex flex-col md:gap-8 gap-4">
        {/*TEAL COLOR*/}
        <div
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(15, 37, 80, 0.7), rgba(15, 37, 80, 0.7)), url(${desk})`, // 3
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className={`${
            !loading ? "opacity-100" : "opacity-50"
          } overflow-clip bg-primary-color mx-0 h-80 w-full`}
        >
          <div className="h-80 z-1 overflow-clip justify-center items-center flex-col flex">
            <div className="flex flex-col items-center justify-center mb-10 h-full mt-[3%]">
              <h1 className="text-4xl text-light-color font-medium content-center">
                {" "}
                {data.name}{" "}
              </h1>
              <div className="w-[150px] h-[150px] mt-4 bg-light-color -md items-center justify-center flex overflow-hidden">
                <img
                  className="object-contain h-full w-full"
                  src={data.image}
                ></img>
              </div>
            </div>
          </div>

          {/* <DotLoader
            cssOverride={{
              display: "block",
              margin: "auto",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "0",
              opacity: 1,
            }}
            size={150}
            className="text-white"
            color="#36528b"
            loading={loading}
          /> */}

          <Loader isLoading={loading} />
        </div>
        <div className={`flex flex-col md:my-8 md:mx-8 mx-0 my-0 `}>
          <div className="relative overflow-x-hidden md:mt-0 mt-[65px] flex flex-col md:gap-2 gap-">
            <div className="md:flex justify-between items-center md:mx-2 mx-0 my-0 gap-2 md:gap-0">
              {/* ABOUT THE COMPANY TEXT (40% width) */}
              <div className="md:w-2/5">
                <h1 className="text-4xl md:text-4xl text-center md:text-left text-dark-color font-bold">
                  {" "}
                  ABOUT THE
                  <span className="text-primary-newblue"> COMPANY</span>{" "}
                </h1>
                <div className="text-lg mt-4 text-center md:text-left">
                  <p>{about_comp}</p>
                </div>
              </div>
              {/* APPLY NOW, DOWNLOAD, AND SHARE BUTTONS (50% width) */}
              <div className="md:w-1/2 flex flex-col md:gap-4 gap-4 ">
                {/* Apply Now Button */}
                <button
                  id="apply_button"
                  disabled={loading}
                  onClick={() => handleApply()}
                  className={`flex h-12 w-full items-center px-4 py-4 text-black font-bold hover:bg-gray-300  text-lg`}
                >
                  APPLY&nbsp;
                  <span className="text-primary-color"> NOW!</span>
                  <span className="ml-auto">
                    <i className="fa fa-check text-black ml-2"></i>
                  </span>
                </button>
                <div className="w-full h-0.5 bg-[#0A0F22]"></div>
                {/* Download Job Description Button */}
                <button
                  onClick={handleDownload}
                  className="flex h-12 w-full items-center px-4 py-4 text-black font-bold hover:bg-gray-300  text-lg"
                >
                  <span className="hidden md:block font-bold">
                    DOWNLOAD JOB{" "}
                    <span className="text-primary-color">DESCRIPTION</span>
                  </span>
                  <span className="block md:hidden">DESCRIPTION</span>
                  <span className="ml-auto">
                    <i className="fa fa-download text-black ml-2"></i>
                  </span>
                </button>
                <div className="w-full h-0.5 bg-[#0A0F22]"></div>
                {/* Share Button */}
                <RWebShare
                  data={{
                    text: "Hey! Check out this internship opportunity at Anubhava- the internship fair!",
                    url: window.location.href,
                    title: "Job",
                  }}
                  onClick={() => console.log(window.location.href)}
                >
                  <button className="flex h-12 w-full items-center px-4 py-2 text-primary-color font-bold hover:bg-gray-300  text-lg">
                    <span className="hidden md:block">SHARE</span>
                    <span className="block md:hidden">SHARE</span>
                    <span className="ml-auto">
                      <i className="fa fa-share text-black ml-2"></i>
                    </span>
                  </button>
                </RWebShare>
              </div>
            </div>
            {/* ABOUT COMPANY TEXT */}
            <div className="flex">
              <h1 className="text-lg">{data.about_comp}</h1>
            </div>
          </div>
        </div>
        <div
          className={`${
            !loading ? "opacity-100" : "opacity-50"
          } p-5 bg-primary-lighter w-full`}
        >
          <div className="flex items-center md:flex-row flex-col md:gap-0 gap-4 justify-between md:mx-16 mx-4 my-10">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.location.href = about.website;
              }}
            >
              <CompanyCard
                title={"Website"}
                icon={"fa fa-globe"}
                body={website}
              ></CompanyCard>
            </div>
            <CompanyCard
              title={"Work Location"}
              icon={"fa fa-building"}
              body={work_location}
            ></CompanyCard>
            <CompanyCard
              title={"Count"}
              icon={"fa fa-user-plus"}
              body={count}
            ></CompanyCard>

            {data.job_profile_description ? (
              <Dropdown
                onNameChange={handleNameChange}
                body={data.job_profile_description}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div
          className={`${
            !loading ? "opacity-100" : "opacity-50"
          } flex flex-col md:mx-16 md:my-16 mx-3 my-8 md:gap-10 gap-0 text-center p-8 `}
        >
          <ReactElasticCarousel
            easing="cubic-bezier(1,.15,.55,1.54)"
            tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
            transitionMs={700}
            onNextEnd={({ index }) => {
              if (
                carouselRef?.current.state.activePage ===
                carouselRef?.current.state.pages.length - 1
              ) {
                const itemsPerPage = Math.floor(
                  carouselRef?.current.props.children.length /
                    carouselRef?.current.getNumOfPages()
                );
                if (itemsPerPage === carouselRef?.current.state.activeIndex) {
                  clearTimeout(resetTimeout);
                  resetTimeout = setTimeout(() => {
                    carouselRef?.current?.goTo(0);
                  }, 5000); // same time
                }
              }
            }}
            breakPoints={breakPoints}
            className="mt-10 "
            itemPadding={[10, 10]}
            enableSwipe
            ref={carouselRef}
          >
            {data.job_profile_description ? (
              Object.keys(data.job_profile_description).map((key) => {
                const job = data.job_profile_description[key][0];
                return (
                  <JobCard
                    key={key}
                    title={job[0]}
                    duration={job[1]}
                    roles={job[2]}
                    requirements={job[3]}
                  />
                );
              })
            ) : (
              <></>
            )}
          </ReactElasticCarousel>
        </div>
        {data.perks && data.eligibility ? (
          <div className="flex md:flex-row flex-col justify-end md:gap-10 gap-5 px-10 pb-10">
            <PerkAndEligibleCard
              titleTeal="Perks"
              titleBlack="about the internship"
              texts={data.perks}
            />
            <PerkAndEligibleCard
              titleTeal="Eligibility"
              titleBlack="criteria"
              texts={data.eligibility}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Company;
