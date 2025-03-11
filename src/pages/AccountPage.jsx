import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PageBanner from "../components/PageBanner";
import person from "../static/images/person.jpg";
import { motion } from "framer-motion";
import { UserAuth, getStorage, getDb } from "../context/AuthContext";
import { doc, getDoc, collection, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { DotLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";

export default function AccountPage() {
  const date = new Date("2024-04-23T00:30:00+05:30") > new Date();
  document.title = "Account";
  const [contactNumber, setContactNumber] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [college, setCollege] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(0);
  const { logOut, user } = UserAuth();
  const [Error, setError] = useState(false);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const [screenSize, setScreenSize] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize]);
  useEffect(() => {
    if (user.uid !== null && user.uid !== undefined) {
      // check if a key with the user's uid exists in the local storage
      // if it exists then copy it to the state
      const fetchUserData = async () => {
        console.log("func");
        if (user && user.uid) {
          try {
            const collectonRef2 = collection(getDb, "users");
            const docRef = doc(collectonRef2, user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              const userData = docSnap.data();
              localStorage.setItem(user.uid, JSON.stringify(userData));

              if (userData.contactNumber) {
                setContactNumber(userData.contactNumber);
              }
              if (userData.age) {
                setAge(userData.age);
              }
              if (userData.course) {
                setCourse(userData.course);
              }
              if (userData.yearOfStudy) {
                setYearOfStudy(userData.yearOfStudy);
              }
              if (userData.college) {
                setCollege(userData.college);
              }
              if (userData.city) {
                setCity(userData.city);
              }
              if (userData.applied) {
                setApplied(userData.applied.length);
              }
              setLoading(false);
            } else {
              console.log("No data found in firestore for user: ", user.uid);
              setError(true);
              setLoading(false);
            }
          } catch (error) {
            console.error("Error fetching user data: ", error);
            setError(true);
            setLoading(false);
          }
        }
      };

      fetchUserData();
      if (localStorage.getItem(user.uid) !== null) {
        setLoading(false);
        if (JSON.parse(localStorage.getItem(user.uid)).contactNumber) {
          setContactNumber(
            JSON.parse(localStorage.getItem(user.uid)).contactNumber
          );
        }
        if (JSON.parse(localStorage.getItem(user.uid)).age) {
          setAge(JSON.parse(localStorage.getItem(user.uid)).age);
        }
        if (JSON.parse(localStorage.getItem(user.uid)).course) {
          setCourse(JSON.parse(localStorage.getItem(user.uid)).course);
        }
        if (JSON.parse(localStorage.getItem(user.uid)).yearOfStudy) {
          setYearOfStudy(
            JSON.parse(localStorage.getItem(user.uid)).yearOfStudy
          );
        }
        if (JSON.parse(localStorage.getItem(user.uid)).college) {
          setCollege(JSON.parse(localStorage.getItem(user.uid)).college);
        }
        if (JSON.parse(localStorage.getItem(user.uid)).city) {
          setCity(JSON.parse(localStorage.getItem(user.uid)).city);
        }
        if (JSON.parse(localStorage.getItem(user.uid)).applied) {
          setApplied(JSON.parse(localStorage.getItem(user.uid)).applied.length);
        } else {
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
                setApplied(applied.length);
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
      }
      // if it doesn't exist then check if it exists in the firestore database
      else {
        console.log("checking firestore");
      }
    }
  }, [user]);
  // Function to upload file to firebase storage
  // file is the file to be uploaded,key is the key
  // in the firestore database where the download url is to be stored
  const upload = async (file, key) => {
    if (!date) {
      MySwal.fire({
        title: "Error!",
        text: "Registration is closed",
        icon: "error",
        confirmButtonColor: "#36528b", // primary-color
        confirmButtonText: "Ok",
      });
      return;
    }
    if (!file) {
      return;
    }
    const timeOut = timeout("uploadTime");
    if (timeOut) {
      return;
    }
    if (file.size > 1 * 1024 * 1024) {
      MySwal.fire({
        title: "Error!",
        text: "File size is too large",
        icon: "error",
        confirmButtonColor: "#36528b", // primary-color
        confirmButtonText: "Ok",
      });
      return;
    }
    setLoading(true);
    const name = new Date().getTime() + file.name;
    const storageRef = ref(getStorage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("File upload is " + progress + "% done");
    });

    await uploadTask;
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

    let updateObject = {};
    updateObject[key] = downloadURL;

    setDoc(doc(getDb, "users", user.uid), updateObject, { merge: true }).then(
      () => {
        console.log("Document successfully updated!");
      }
    );
    // copy the updated data to local storage
    let userData = JSON.parse(localStorage.getItem(user.uid));
    if (userData === null) {
      userData = {};
    }
    console.log(userData);
    userData[key] = downloadURL;
    localStorage.setItem(user.uid, JSON.stringify(userData));

    setLoading(false);
    MySwal.fire({
      title: "Success!",
      text: "Your Resume has been uploaded!",
      icon: "success",
      confirmButtonColor: "#36528b", // primary-color

      confirmButtonText: "Ok",
    }).then(() => {
      localStorage.setItem("uploadTime", JSON.stringify(new Date()));
      window.location.reload();
    });
  };

  const timeout = (val) => {
    const timeOut = JSON.parse(localStorage.getItem(val));
    if (timeOut !== null) {
      const timeOutDate = new Date(timeOut);
      const currentDate = new Date();
      const diff = Math.abs(currentDate - timeOutDate);
      const diffMinutes = Math.floor(diff / 1000 / 60);
      if (diffMinutes < 10) {
        MySwal.fire({
          title: "Error",
          html:
            "<div class='text-xl text-red-500 font-bold'>" +
            " ● You have already submitted the form. Please wait for 10 minutes before submitting again " +
            "</div>",
          icon: "error",
          confirmButtonColor: "#36528b", // primary-color
          confirmButtonText: "Ok",
        });
        return true;
      } else {
        localStorage.removeItem(val);
        return false;
      }
    }
  };
  const handleSubmit = () => {
    if (!date) {
      MySwal.fire({
        title: "Error!",
        text: "Registration is closed",
        icon: "error",
        confirmButtonColor: "#36528b", // primary-color
        confirmButtonText: "Ok",
      });
      return;
    }
    // Check if there is a timeOut from local storage only allow the user to submit the form if we exceed the timeOut by 5 minutes
    const timeOut = timeout("timeOut");
    if (timeOut) {
      return;
    }
    if (
      contactNumber === "" ||
      course === "" ||
      yearOfStudy === "" ||
      college === 0 ||
      college === "" ||
      age === 0 ||
      age === "" ||
      city === 0 ||
      city === ""
    ) {
      MySwal.fire({
        title: "Error",
        text: "Please fill all the fields",
        icon: "error",
        confirmButtonColor: "#36528b", // primary-color
        confirmButtonText: "Ok",
      });
      return;
    }
    // check if the user has uploaded a resume by checking if a key by user uid exists in the local storage
    const userData = JSON.parse(localStorage.getItem(user.uid));
    const hasresume = userData != undefined ? true : false;
    if (!hasresume) {
      MySwal.fire({
        title: "Error",
        text: "Please upload a resume first",
        icon: "error",
        confirmButtonColor: "#36528b", // primary-color
        confirmButtonText: "Ok",
      });
      return;
    }
    setLoading(true);
    const temp_arr = JSON.parse(localStorage.getItem(user.uid)).applied || [];
    console.log(temp_arr);
    setDoc(
      doc(getDb, "users", user.uid),
      {
        name: user.displayName,
        email: user.email,
        contactNumber: contactNumber,
        age: age,
        course: course,
        yearOfStudy: yearOfStudy,
        college: college,
        city: city,
        // check if key exists in local storage if it does then check if the user has applied or not if not then 0 else number of applications
        applied: temp_arr,
      },
      { merge: true }
    )
      .then(() => {
        console.log("Document successfully updated!");
      })
      .then(() => {
        localStorage.setItem(
          user.uid,
          JSON.stringify({
            name: user.displayName,
            email: user.email,
            resume: JSON.parse(localStorage.getItem(user.uid)).resume || "",
            contactNumber: contactNumber,
            age: age,
            course: course,
            yearOfStudy: yearOfStudy,
            college: college,
            city: city,
            applied: temp_arr,
          })
        );
        setLoading(false);
        MySwal.fire({
          title: "Success!",
          text: "Changes have been saved, Please proceed to apply for the internship",
          icon: "success",
          confirmButtonColor: "#36528b",
          confirmButtonText: "Ok",
        }).then(() => {
          localStorage.setItem("timeOut", JSON.stringify(new Date()));
          navigate("/companies");
        });
      });
  };
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const renderItems = () => {
    const [companiesData, setCompaniesData] = useState([]);
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(
          "https://anubhava-backend.vercel.app/companies"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCompaniesData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    useEffect(() => {
      fetchData();
    }, []);

    const desiredCompanyIds = [
      "660d869749e45047833d5d2e",
      "661ae4efc5c92aea4ddd9a91",
      "661ac11a6d6a6af31867d8e7",
      "66166281f869a71753bdebf5",
      "660d69261d95addd172066e1",
      "661a9465cd2e82a47dd88e34",
    ];

    // Filter companies based on desiredCompanyIds
    const filteredCompanies = companiesData.filter((company) =>
      desiredCompanyIds.includes(company._id)
    );

    return filteredCompanies;
  };

  // Function to change the value of the contact number if the user changes it
  const handleContactNumberChange = (val) => {
    setContactNumber(val);
  };
  const handleAgeChange = (val) => {
    setAge(val);
  };
  // Function to change the value of the course if the user changes it
  const handleCourseChange = (val) => {
    setCourse(val);
  };
  // Function to change the value of the year of study if the user changes it
  const handleYearOfStudyChange = (val) => {
    setYearOfStudy(val);
  };
  const handleCollegeChange = (val) => {
    setCollege(val);
  };
  const handleCityChange = (val) => {
    setCity(val);
  };

  const clickHandler = () => {
    MySwal.fire({
      icon: "success",
      title: "Success!",
      text: "Successfully Updated resume!",
      confirmButtonColor: "#36528b", // primary-color
      confirmButtonText: "Ok",
    });
  };
  const handleUploadClick = () => {
    if (loading || !user) {
      return;
    }
    const input = document.createElement("input");
    input.type = "file";
    input.accept =
      "application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    input.onchange = async (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = async () => {
        await upload(file, "resume");
      };
      reader.readAsArrayBuffer(file);
    };
    // trigger the click event
    input.click();
  };
  const handleViewResume = () => {
    // Retrieve the resume URL from local storage
    const userData = JSON.parse(localStorage.getItem(user.uid));
    const resumeURL = userData && userData.resume;

    // Check if the resumeURL exists
    if (resumeURL) {
      // Open the resume in a new tab
      window.open(resumeURL, "_blank");
    } else {
      // If resumeURL doesn't exist, show an error message
      MySwal.fire({
        title: "Error",
        text: "Resume not found",
        icon: "error",
        confirmButtonColor: "#36528b", // primary-color
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="md:mt-20 mt-[65px] flex flex-col items-center justify-center ">
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
        color="#36528b"
        className="text-primary-color"
        loading={loading}
      /> */}

      <Loader isLoading={loading} />

      {/* <PageBanner image={person} bannerText={`Welcome ${user.displayName}`} /> */}
      <div className="w-full flex justify-start">
        <div className="md:m-10 m-2 mt-5 h-20 w-1 bg-primary-color"></div>
        <h1 className="md:text-4xl text-3xl md:mt-10 mt-5 pt-5 text-black font-semibold ">
          Welcome,{" "}
          <span className="text-primary-color">{user.displayName}</span>
        </h1>
      </div>
      <div
        className={`${
          !loading ? "opacity-100 border-4 border-black " : "opacity-50"
        } flex flex-col gap-4 md:gap-8 md:px-10 px-4 m-4 items-center justify-center`}
      >
        <div className="p-4 w-76 md:w-[860px]">
          <h1 className="text-primary-color text-3xl font-semibold mb-4">
            Profile
          </h1>

          <div className="flex flex-row justify-start text-black mb-4">
            <h1 className="text-lg font-semibold">Number of applications: </h1>
            <h1 className="bg-transparent focus:outline-none focus:border-primary-color text-lg ml-1">
              {applied}
            </h1>
          </div>
          <div className="flex flex-row">
            {/* Left Column */}
            <div className="d1 flex justify-center items-center md:-ml-48 h-full md:w-full">
              <h2 className="text-black text-xl font-semibold mb-2 ">
                Basic Info
              </h2>
            </div>

            {/* Right Column */}
            <div className="d2 flex flex-col md:-ml-56 md:w-full md:pl-0 sm:pl-6 pl-6">
              <div className="flex flex-col text-black pl-4  ">
                {/* Age Input */}
                <input
                  disabled={loading}
                  value={age}
                  onChange={(e) => handleAgeChange(e.target.value)}
                  id="age"
                  type="number"
                  inputMode="numeric"
                  placeholder="Enter age here"
                  className="bg-transparent focus:outline-none w-200 focus:border-primary-color"
                />
              </div>
              <div className="flex flex-col text-black pl-4">
                {/* User Email */}
                <h1 className="bg-transparent focus:outline-none focus:border-primary-color">
                  {user ? user.email : "No applications yet"}
                </h1>
              </div>
              <div className="flex flex-col text-black pl-4">
                {/* Contact Number Input */}
                <input
                  disabled={loading}
                  value={contactNumber}
                  onChange={(e) => handleContactNumberChange(e.target.value)}
                  id="contact_number"
                  type="text"
                  placeholder="Enter contact number here"
                  className="bg-transparent focus:outline-none focus:border-primary-color"
                />
              </div>
              <div className="flex flex-col text-black pl-4">
                {/* City Input */}
                <input
                  disabled={loading}
                  value={city}
                  onChange={(e) => handleCityChange(e.target.value)}
                  id="city"
                  type="text"
                  placeholder="Enter city here"
                  className="bg-transparent focus:outline-none focus:border-primary-color mb-5"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="d1 flex justify-center items-center h-full md:-ml-48 md:w-full">
              <h2 className="text-black text-xl font-semibold mb-2">
                College Info
              </h2>
            </div>
            <div className="d2 flex flex-col md:w-full md:-ml-56">
              <div className="flex flex-col text-black pl-4">
                {/* <h1 className="text-lg font-semibold">College:</h1> */}
                <input
                  disabled={loading}
                  value={college}
                  onChange={(e) => handleCollegeChange(e.target.value)}
                  id="course"
                  type="text"
                  placeholder="Enter college here"
                  className="bg-transparent focus:outline-none focus:border-primary-color"
                />
              </div>
              <div className="flex flex-col text-black pl-4">
                {/* <h1 className="text-lg font-semibold">Course:</h1> */}
                <input
                  disabled={loading}
                  value={course}
                  onChange={(e) => handleCourseChange(e.target.value)}
                  id="course"
                  type="text"
                  placeholder="Enter course name here"
                  className="bg-transparent focus:outline-none focus:border-primary-color"
                />
              </div>
              <div className="flex flex-col text-black pl-4">
                {/* <h1 className="text-lg font-semibold">Year of Study:</h1> */}
                <input
                  disabled={loading}
                  value={yearOfStudy}
                  onChange={(e) => handleYearOfStudyChange(e.target.value)}
                  id="year_of_study"
                  type="number"
                  placeholder="Enter year of enrollment"
                  className="bg-transparent focus:outline-none focus:border-primary-color"
                />
              </div>
            </div>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSubmit}
          className={`${
            !loading ? "opacity-100 hover:bg-primary-light" : "opacity-50"
          } md:w-[200px] w-26 cursor-pointer h-12 rounded-lg bg-blue-800 text-white font-bold py-2 px-4 flex items-center justify-center flex-row `}
        >
          Submit
        </motion.button>
        <div className="flex flex-col w-full md:w-[860px] mb-4">
          <h1 className="text-primary-color text-3xl font-semibold mb-2">
            Resume
          </h1>
          <div className="flex justify-around w-full">
            <div className="flex flex-row space-x-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleViewResume}
                className={`${
                  loading ? "" : "hover:bg-primary-light"
                } cursor-pointer w-full md:w-[158px] h-12 bg-primary-color text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center flex-row`}
              >
                <i className="fa fa-eye text-white mr-2"></i>View Resume
              </motion.button>

              <motion.button
                disabled={loading}
                whileTap={{ scale: 0.9 }}
                onClick={handleUploadClick}
                className={`${
                  loading ? "" : "hover:bg-primary-light"
                } cursor-pointer w-full md:w-[180px] h-12 bg-primary-color text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center flex-row`}
              >
                <i className="fa fa-upload text-white mr-2"></i>Upload Resume
              </motion.button>
            </div>
          </div>
          <div className="w-full flex flex-row items-end justify-end text-red-500 mt-4">
            max file size: 1MB
          </div>
          <h1 className=" mt-5 text-black text-lg sm:text-sm">
            <span className="text-primary-color">Note:</span> Profile can only
            be updated once every 10 minutes
          </h1>
        </div>
      </div>

      {Error && (
        <h1 className="mt-10 text-red-500 text-xl font-semibold">
          No Data found! Please fill the form!{" "}
        </h1>
      )}
      {/* <div className="flex justify-start">
        <h1 className="text-3xl mt-10 pt-5 text-black font-semibold mb-10 ">
          TOP <span className="text-primary-color">COMPANIES</span>
        </h1>
      </div> */}
      {/* Displaying Company Cards */}
      {/* <div
        className={`${
          !loading ? `opacity-100` : `opacity-50`
        } grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 md:px-16 px-4 mb-10`}
      >
        {renderItems().map((company) => (
          <motion.button key={company._id}>
            <div
              onClick={() => window.open(`/companies/${company._id}`, "_blank")}
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
      </div> */}

      {/* Logout Button */}
      <motion.button
        onClick={handleLogOut}
        className={`${
          !loading ? "opacity-100 hover:bg-red-300" : "opacity-50"
        } md:mb-10 mb-5 md:w-[420px] w-36 cursor-pointer h-12 rounded-lg bg-red-500 text-light-color font-bold py-2 px-4 mt-5 flex items-center justify-center flex-row `}
      >
        Log Out
      </motion.button>
    </div>
  );
}
