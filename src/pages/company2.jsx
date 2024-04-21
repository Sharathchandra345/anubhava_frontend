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

import PerkAndEligibleCard from "../components/PerkAndEligibleCard";
import Dropdown from "../components/Dropdown";
import ReactElasticCarousel from "react-elastic-carousel";
import { DotLoader } from "react-spinners";
import { RWebShare } from "react-web-share";

function Company() {
  const date = new Date("2024-04-23T00:00:00+05:30") > new Date();
  window.scrollTo(0, 0);
  const carouselRef = useRef(null);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];
  const MySwal = withReactContent(Swal);
  const [data, setData] = useState({});
  const [count, setCount] = useState(0); // State variable for count
  const [loading, setLoading] = useState(true);
  const [applyText, setApplyText] = useState("");

  const [keys, setKeys] = useState([]);
  const [hasResume, setHasResume] = useState("");
  const [applied, setApplied] = useState(false);

  const navigate = useNavigate();
  const backToCompanies = useCallback(() => {
    navigate("/companies");
  }, [navigate]);

  const handleNameChange = (newKey) => {
    setKeys(newKey);
  };
  const { id } = useParams();
  const { user, logOut } = UserAuth();

  async function fetchData() {
    try {
      const companyRef = doc(collection(getDb(), "companies"), id);
      const companySnap = await getDoc(companyRef);
      if (companySnap.exists()) {
        const companyData = companySnap.data();
        setData(companyData);
        setCount(companyData.count || 0);
        setLoading(false);
        document.title = `${companyData.name} | Anubhava`;
        if (user && user.uid) {
          const userCache = JSON.parse(localStorage.getItem(user.uid));
          if (!userCache) {
            MySwal.fire({
              icon: "error",
              title: "Error!",
              html:
                "<div class='flex flex-col items-start gap-2 font-bold text-xl text-red-500'>" +
                "Please fill your details." +
                "</div>",
              confirmButtonColor: "#36528b",
              confirmButtonText: "Ok",
            }).then(() => {
              navigate("/account");
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  }

  useEffect(() => {
    setApplyText("");
    checkResume();
    fetchData();
  }, [user]);

  const checkResume = async () => {
    try {
      if (user && user.uid) {
        const userCache = JSON.parse(localStorage.getItem(user.uid));
        if (userCache) {
          if (userCache.resume) {
            setHasResume(userCache.resume);
          }
        } else {
          const collectonRef2 = collection(getDb(), "users");
          const docRef = doc(collectonRef2, user.uid);
          const docSnap = await getDoc(docRef);
          const resume = docSnap.data().resume;
          if (resume) {
            setHasResume(resume);
          }
        }
      }
    } catch (error) {
      setHasResume("");
      console.log(error);
    }
  };

  const handleApply = async () => {
    if (date) {
      let alreadyApplied = false;
      let applyTextUpdated = "";
      setLoading(true);

      if (user && user.uid) {
        const userCache = JSON.parse(localStorage.getItem(user.uid));
        if (!userCache || userCache.applied === undefined) {
          MySwal.fire({
            icon: "error",
            title: "Error!",
            html:
              "<div class='flex flex-col items-start gap-2 font-bold text-xl text-red-500'>" +
              "Please fill your details." +
              "</div>",
            confirmButtonColor: "#36528b",
            confirmButtonText: "Ok",
          }).then(() => {
            navigate("/account");
          });
          setLoading(false);
          return;
        }
        if (
          keys.length > 20 ||
          (userCache.applied && userCache.applied.length > 20)
        ) {
          MySwal.fire({
            icon: "error",
            title: "Error!",
            html:
              "<div class='flex flex-col items-start gap-2 font-bold text-xl text-red-500'>" +
              "Maximum 20 jobs can be applied at a time." +
              "</div>",
            confirmButtonColor: "#36528b",
            confirmButtonText: "Ok",
          });
          setLoading(false);
          return;
        }

        const companiesCollectionRef = collection(getDb(), "companies");
        const companyId = id;
        const companyDocRef = doc(companiesCollectionRef, companyId);
        const docSnap2 = await getDoc(companyDocRef);

        const getCompanyDoc = async () => {
          try {
            const docSnap = await getDoc(companyDocRef);
            if (docSnap.exists()) {
              const batch = writeBatch(getDb());
              batch.update(companyDocRef, { count: docSnap.data().count + 1 });
              await batch.commit();
            } else {
              await setDoc(companyDocRef, { count: 1, companyName: data.name });
            }
          } catch (error) {
            console.error("Error getting document:", error);
          }
        };

        if (userCache.applied.length === 0) {
          const collectonRef = collection(getDb(), "users");
          const docRef = doc(collectonRef, user.uid);
          const batch = writeBatch(getDb());
          batch.update(docRef, { applied: arrayUnion(...keys) });
          await batch.commit();
          userCache.applied = [...userCache.applied, ...keys];
          localStorage.setItem(user.uid, JSON.stringify(userCache));
        } else {
          for (const key of keys) {
            if (userCache.applied.includes(key)) {
              alreadyApplied = true;
              applyTextUpdated +=
                data.job_profile_description[key][0][0] + ", ";
            }
          }
          if (!alreadyApplied) {
            const collectonRef = collection(getDb(), "users");
            const docRef = doc(collectonRef, user.uid);
            const batch = writeBatch(getDb());
            batch.update(docRef, { applied: arrayUnion(...keys) });
            await batch.commit();
            userCache.applied = [...userCache.applied, ...keys];
            localStorage.setItem(user.uid, JSON.stringify(userCache));
            getCompanyDoc();
          }
        }
      } else {
        MySwal.fire({
          icon: "error",
          title: "Error!",
          html:
            "<div class='flex flex-col items-start gap-2 font-bold text-xl text-red-500'>" +
            "Please fill details on Accounts page!" +
            "</div>",
          confirmButtonColor: "#36528b",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/account");
        });
      }
      setLoading(false);
      if (
        !user ||
        alreadyApplied ||
        applyTextUpdated ||
        keys.length === 0 ||
        !hasResume
      ) {
        let errorString = "";
        if (!user) {
          errorString += "<h1> ● Please Login!";
        }
        if (keys.length === 0) {
          errorString += "<h1> ● Please select a Job!";
        }
        if (applyText) {
          errorString += "<h1> ● Already applied!";
        }
        if (!hasResume) {
          errorString += "<h1> ● Missing resume!";
        }
        if (applyTextUpdated) {
          errorString += "<h1> ● Already applied for " + applyTextUpdated;
        }
        MySwal.fire({
          icon: "error",
          title: "Error!",
          html:
            "<div class='flex flex-col items-start gap-2 font-bold text-xl text-red-500'>" +
            errorString +
            "</div>",
          confirmButtonColor: "#36528b",
          confirmButtonText: "Ok",
        }).then(() => {
          setApplyText("");
          return;
        });
      } else {
        backToCompanies();
      }
    } else {
      MySwal.fire({
        icon: "error",
        title: "Error!",
        html:
          "<div class='text-xl text-red-500 font-bold'>" +
          " ● We don't accept applications after 24th April 2023." +
          "</div>",
        confirmButtonColor: "#36528b",
        confirmButtonText: "Ok",
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
  return (
    <div>
      <div className="relative overflow-x-hidden md:mt-20 mt-[65px] flex flex-col md:gap-8 gap-4">
        {/*TEAL COLOR*/}
        <div
          style={{
            // backgroundImage: `linear-gradient(0deg, rgba(15, 111, 123, 0.7), rgba(15, 111, 123, 0.7)), url(${desk})`, // default
            // backgroundImage: `linear-gradient(0deg, rgba(48, 153, 117, 0.7), rgba(48, 153, 117, 0.7)) , url(${desk})`, // 1
            // backgroundImage: `linear-gradient(0deg, rgba(13, 27, 42, 0.7), rgba(13, 27, 42, 0.7)), url(${desk})`, // 2 // BLACK
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
              <div className="w-[150px] h-[150px] mt-4 bg-light-color rounded-md items-center justify-center flex overflow-hidden">
                <img
                  className="object-contain h-full w-full"
                  src={data.image}
                ></img>
                {/* <img
                  className="object-contain h-full w-full"
                  src="https://th.bing.com/th/id/R.ea54db5822a3b2fdbd590b49c57d8033?rik=h7e4LIz%2bY8DMwg&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fyio%2f69M%2fyio69MBoT.jpg&ehk=XuNU9Y%2fhF72ZA3cHcWcAlucA5DA0wl1zzkrLCOAL8%2bs%3d&risl=&pid=ImgRaw&r=0"
                ></img> */}
              </div>
            </div>
          </div>

          <DotLoader
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
          />
        </div>
        <div
          className={`flex flex-col md:my-16 md:mx-16 mx-4 my-8 gap-4 md:gap-10`}
        >
          <div className="flex flex-col md:flex-row items-center md:gap-0 gap-2 md:justify-between">
            <div className="basis-6/12 w-30">
              <h1 className="text-dark-color md:text-4xl text-start md:mb-0 mb-3 text-3xl font-bold">
                {" "}
                About the<span className="text-white"> Company</span>{" "}
              </h1>
            </div>
            <div className="flex flex-row w-full md:basis-6/12 auto md:w-64 justify-between">
              <div className="flex flex-col w-full gap-4 mr-4">
                <button
                  id="apply_button"
                  // disable this button till 12 April 2023 IST
                  disabled={loading}
                  onClick={() => handleApply()}
                  className={`
                            flex flex-col h-12 w-full items-center px-4 py-2 shadow-lg bg-primary-color text-light-color hover:bg-primary-light
                          mr-10 font-semibold rounded-lg text-sm`}
                >
                  <i className="fa fa-check text-light-color mx-2 "></i> Apply
                  now!
                </button>
                <h1 className="text-red-500 font-semibold text-base ">
                  *Applicants can apply to maximum 20 companies!
                </h1>
              </div>
              {/* TO EDIT SHARE BUTTON AND DOWNLOAD BUTTON */}
              <div className="flex flex-col w-full gap-4">
                <button
                  onClick={handleDownload}
                  className="flex flex-col h-12 w-full items-center px-4 py-2 shadow-lg  bg-light-color text-white font-semibold hover:bg-gray-300 rounded-lg text-sm"
                >
                  <i className="fa fa-download text-white mx-2"></i>{" "}
                  <span className="hidden md:block">
                    {" "}
                    Download Job Description{" "}
                  </span>
                  <span className="block md:hidden">Description </span>
                </button>
                <RWebShare
                  data={{
                    text: "Hey! Check out this internship opportunity at Anubhava- the internship fair!",
                    url: window.location.href,
                    title: "Job",
                  }}
                  onClick={() => console.log(window.location.href)}
                >
                  <button className="flex flex-col h-12 w-full items-center px-4 py-2 shadow-lg  bg-light-color text-white font-semibold hover:bg-gray-300 rounded-lg text-sm">
                    <i className="fa fa-share text-white mx-2"></i>{" "}
                    <span className="hidden md:block"> Share </span>
                    <span className="block md:hidden">Share </span>
                  </button>
                </RWebShare>
              </div>
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
          {/* Display the count here */}
          <CompanyCard
            title={"Count"}
            icon={"fa fa-building"}
            body={count}
          ></CompanyCard>

          {/* {NEED TO COMPLETE THE ONE BELOW} */}
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
        } flex flex-col md:mx-16 md:my-16 mx-3 my-8 md:gap-10 gap-0 text-center`}
      >
        <h1 className="font-bold md:text-4xl text-3xl text-white">
          Job Profiles <span className="text-white">and their description</span>
        </h1>
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
          // enableAutoPlay
          autoPlaySpeed={5000}
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

        {data.perks && data.eligibility ? (
          <div className="flex md:flex-row flex-col justify-end md:gap-10 gap-5 mt-5">
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
