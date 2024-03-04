import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import PageBanner from "../components/PageBanner";
import person from '../static/images/person.jpg'
import { motion } from "framer-motion";
import { UserAuth, getStorage, getDb } from "../context/AuthContext";
import { doc, getDoc, collection, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { DotLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";


export default function AccountPage() {
    const date = new Date('2023-04-21T00:00:00+05:30') > new Date();
    document.title = "Account"
    const [contactNumber, setContactNumber] = useState("");
    const [course, setCourse] = useState("");
    const [yearOfStudy, setYearOfStudy] = useState("");
    const [college, setCollege] = useState("");
    const [loading, setLoading] = useState(true);
    const [applied, setApplied] = useState(0);
    const { logOut, user } = UserAuth();
    const [Error, setError] = useState(false);
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate();


    useEffect(() => {
        if (user.uid !== null && user.uid !== undefined) {
            // check if a key with the user's uid exists in the local storage
            // if it exists then copy it to the state

            if (localStorage.getItem(user.uid) !== null) {
                setLoading(false);
                if (JSON.parse(localStorage.getItem(user.uid)).contactNumber) {
                    setContactNumber(JSON.parse(localStorage.getItem(user.uid)).contactNumber);
                }
                if (JSON.parse(localStorage.getItem(user.uid)).course) {
                    setCourse(JSON.parse(localStorage.getItem(user.uid)).course);
                }
                if (JSON.parse(localStorage.getItem(user.uid)).yearOfStudy) {
                    setYearOfStudy(JSON.parse(localStorage.getItem(user.uid)).yearOfStudy);
                }
                if (JSON.parse(localStorage.getItem(user.uid)).college) {
                    setCollege(JSON.parse(localStorage.getItem(user.uid)).college);
                }
                if (JSON.parse(localStorage.getItem(user.uid)).applied) {
                    setApplied(JSON.parse(localStorage.getItem(user.uid)).applied.length);
                }


            }
            // if it doesn't exist then check if it exists in the firestore database
            else {
                console.log("checking firestore")
                const collectonRef2 = collection(getDb, 'users');
                const docRef = doc(collectonRef2, user.uid);
                const docSnap = getDoc(docRef).then((doc) => {
                    if (doc.exists()) {
                        // if doc exists then copy it to local storage
                        localStorage.setItem(user.uid, JSON.stringify(doc.data()));
                        if (doc.data().contactNumber) {
                            setContactNumber(doc.data().contactNumber);
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
                        // applied is an array of strings which contains the id of the job the user has applied to
                        if (doc.data().applied) {
                        }
                        setLoading(false);
                    } else {
                        // make a new document in firestore database and copy it to local storage
                        console.log("nothing in firestore and localstorage")
                        setError(true);
                        setLoading(false);

                    }
                });

            }
        }
    }, [user]);
    // Function to upload file to firebase storage
    // file is the file to be uploaded,key is the key 
    // in the firestore database where the download url is to be stored
    const upload = async (file, key) => {
        if (!date) {
            MySwal.fire({
                title: 'Error!',
                text: 'Registration is closed',
                icon: 'error',
                confirmButtonColor: '#36528b', // primary-color
                confirmButtonText: 'Ok'
            })
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
                title: 'Error!',
                text: 'File size is too large',
                icon: 'error',
                confirmButtonColor: '#36528b', // primary-color
                confirmButtonText: 'Ok'
            })
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

        setDoc(doc(getDb, "users", user.uid), updateObject, { merge: true }).then(() => {
            console.log("Document successfully updated!");
        });
        // copy the updated data to local storage
        let userData = JSON.parse(localStorage.getItem(user.uid));
        if (userData === null) {
            userData = {};
        }
        console.log(userData)
        userData[key] = downloadURL;
        localStorage.setItem(user.uid, JSON.stringify(userData));

        setLoading(false);
        MySwal.fire({
            title: 'Success!',
            text: 'Your Resume has been uploaded!',
            icon: 'success',
            confirmButtonColor: '#36528b', // primary-color

            confirmButtonText: 'Ok'
        }).then(() => {
            localStorage.setItem("uploadTime", JSON.stringify(new Date()));
            window.location.reload();
        })
    };

    const timeout = (val) => {
        const timeOut = JSON.parse(localStorage.getItem(val));
        if (timeOut !== null) {
            const timeOutDate = new Date(timeOut);
            const currentDate = new Date();
            const diff = Math.abs(currentDate - timeOutDate);
            const diffMinutes = Math.floor((diff / 1000) / 60);
            if (diffMinutes < 10) {
                MySwal.fire({
                    title: 'Error',
                    html: "<div class='text-xl text-red-500 font-bold'>" +
                        " ● You have already submitted the form. Please wait for 10 minutes before submitting again " + "</div>",
                    icon: 'error',
                    confirmButtonColor: '#36528b', // primary-color
                    confirmButtonText: 'Ok'
                })
                return true;
            } else {
                localStorage.removeItem(val);
                return false;
            }
        }
    }
    const handleSubmit = () => {
        if (!date) {
            MySwal.fire({
                title: 'Error!',
                text: 'Registration is closed',
                icon: 'error',
                confirmButtonColor: '#36528b', // primary-color
                confirmButtonText: 'Ok'
            })
            return;
        }
        // Check if there is a timeOut from local storage only allow the user to submit the form if we exceed the timeOut by 5 minutes
        const timeOut = timeout("timeOut");
        if (timeOut) {
            return;
        }
        if (contactNumber === "" || course === "" || yearOfStudy === "" || college === 0 || college === "") {
            MySwal.fire({
                title: 'Error',
                text: 'Please fill all the fields',
                icon: 'error',
                confirmButtonColor: '#36528b', // primary-color
                confirmButtonText: 'Ok'
            })
            return;
        }
        // check if the user has uploaded a resume by checking if a key by user uid exists in the local storage
        const userData = JSON.parse(localStorage.getItem(user.uid));
        const hasresume = userData != undefined ? true : false;
        if (!hasresume) {
            MySwal.fire({
                title: 'Error',
                text: 'Please upload a resume first',
                icon: 'error',
                confirmButtonColor: '#36528b', // primary-color
                confirmButtonText: 'Ok'
            })
            return;
        }
        setLoading(true);
        const temp_arr = JSON.parse(localStorage.getItem(user.uid)).applied || [];
        console.log(temp_arr)
        setDoc(doc(getDb, "users", user.uid), {
            name: user.displayName,
            email: user.email,
            contactNumber: contactNumber,
            course: course,
            yearOfStudy: yearOfStudy,
            college: college,
            // check if key exists in loca storage if it does then check if the user has applied or not if not then 0 else number of applications
            applied: temp_arr,
        }, { merge: true }).then(() => {
            console.log("Document successfully updated!");
        }).then(() => {
            localStorage.setItem(user.uid, JSON.stringify({
                name: user.displayName,
                email: user.email,
                resume: JSON.parse(localStorage.getItem(user.uid)).resume || "",
                contactNumber: contactNumber,
                course: course,
                yearOfStudy: yearOfStudy,
                college: college,
                applied: temp_arr,
            }))
            setLoading(false);
            MySwal.fire({
                title: 'Success!',
                text: 'Changes have been saved, Please proceed to apply for the internship',
                icon: 'success',
                confirmButtonColor: '#36528b', // primary-color
                confirmButtonText: 'Ok'
            }).then(() => {
                localStorage.setItem("timeOut", JSON.stringify(new Date()));
                navigate("/companies")
            })

        });

    }
    const handleLogOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    }

    // Function to change the value of the contact number if the user changes it
    const handleContactNumberChange = (val) => {
        setContactNumber(val);
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


    const clickHandler = () => {
        MySwal.fire({
            icon: "success",
            title: 'Success!',
            text: 'Successfully Updated resume!',
            confirmButtonColor: '#36528b', // primary-color
            confirmButtonText: 'Ok'


        })
    }
    const handleUploadClick = () => {
        if (loading || !user) {
            return;
        }
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        input.onchange = async (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = async () => {
                await upload(file, "resume")
            };
            reader.readAsArrayBuffer(file);
        };
        // trigger the click event
        input.click();
    };
    return (
        <div className="md:mt-20 mt-[65px] flex flex-col items-center justify-center">
            <DotLoader cssOverride={{
                display: "block",
                margin: "auto",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                padding: "0",
                opacity: 1,
            }} size={150} color='#36528b' className='text-primary-color'

                loading={loading} />

            <PageBanner
                image={person}
                bannerText=" My Profile"
            />

            <div className={`${!loading ? 'opacity-100 ' : 'opacity-50'} flex flex-col gap-4 md:gap-8 md:px-10 px-4 items-center justify-center`}>
                <div>
                    <motion.button disabled={loading} whileTap={{ scale: 0.9 }} onClick={handleUploadClick} className={`${loading ? '' : 'hover:bg-primary-light'} cursor-pointer md:w-[860px] md:h-[72px] bg-primary-color text-light-color font-bold py-2 px-4 rounded-lg mt-10 flex items-center justify-center flex-row gap-2`}>
                        <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5 0H2.5C1.4 0 0.51 0.9 0.51 2L0.5 18C0.5 19.1 1.39 20 2.49 20H14.5C15.6 20 16.5 19.1 16.5 18V6L10.5 0ZM14.5 18H2.5V2H9.5V7H14.5V18ZM4.5 13.01L5.91 14.42L7.5 12.84V17H9.5V12.84L11.09 14.43L12.5 13.01L8.51 9L4.5 13.01Z" fill="#FEFEFE" />
                        </svg>
                        Upload your Resume
                    </motion.button>
                    <div className="w-full flex flex-row items-end justify-end text-red-500">
                        max file size: 1MB
                    </div>
                </div>

                <div className="flex flex-col">
                    <h1 className="text-red-500 text-base font-semibold mb-5" >*Profile can be updated every 10 mins</h1>

                    <h1 className='text-lg font-semibold'>
                        Your Email
                    </h1>
                    <h1
                        id="number_of_applications"
                        className='bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-primary-color w-72 md:w-[860px]'>
                        {user ? user.email : 'No applications yet'}
                    </h1>
                </div>
                <div className="flex flex-col">
                    <h1 className='text-lg font-semibold'>
                        Number of applications
                    </h1>
                    <h1
                        id="number_of_applications"
                        className='bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-primary-color w-72 md:w-[860px]'>
                        {applied}
                    </h1>
                </div>

                <div className="flex flex-col">
                    <h1 className='text-lg font-semibold'>
                        Contact Number <span className="text-red-500">*</span>
                    </h1>
                    <input
                        disabled={loading}
                        value={contactNumber}
                        onChange={(e) => handleContactNumberChange(e.target.value)}
                        id="contact_number"
                        type="number"
                        placeholder='Enter your contact number'
                        className='bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-primary-color w-72 md:w-[860px]' />
                </div>

                <div className="flex flex-col">
                    <h1 className='text-lg font-semibold'>
                        College <span className="text-red-500">*</span>
                    </h1>
                    <input
                        disabled={loading}
                        value={college}
                        onChange={(e) => handleCollegeChange(e.target.value)}
                        id="course"
                        type="text"
                        placeholder='Enter your College name'
                        className='bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-primary-color w-72 md:w-[860px]' />
                </div>

                <div className="flex flex-col">
                    <h1 className='text-lg font-semibold'>
                        Course <span className="text-red-500">*</span>
                    </h1>
                    <input
                        disabled={loading}
                        value={course}
                        onChange={(e) => handleCourseChange(e.target.value)}
                        id="course"
                        type="text"
                        placeholder='Enter your course name'
                        className='bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-primary-color w-72 md:w-[860px]' />
                </div>

                <div className="flex flex-col">
                    <h1 className='text-lg font-semibold'>
                        Year of Study <span className="text-red-500">*</span>
                    </h1>
                    <input
                        disabled={loading}
                        value={yearOfStudy}
                        onChange={(e) => handleYearOfStudyChange(e.target.value)}
                        id="year_of_study"
                        type="number"
                        placeholder='Enter your current year of study'
                        className='bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-primary-color w-72 md:w-[860px]' />
                </div>
            </div>
            {Error && <h1 className="mt-10 text-red-500 text-xl font-semibold">No Data found! Please fill the form! </h1>}
            <motion.button whileTap={{ scale: 0.9 }} onClick={handleSubmit} className={`${!loading ? 'opacity-100 hover:bg-primary-light' : 'opacity-50'} md:w-[420px] w-36 cursor-pointer md:h-[46px] rounded-lg bg-primary-color text-light-color font-bold py-2 px-4 mt-10 flex items-center justify-center flex-row `}>
                Submit
            </motion.button>
            <motion.button onClick={handleLogOut} className={`${!loading ? 'opacity-100 hover:bg-red-300' : 'opacity-50'} md:mb-20 mb-10 md:w-[420px] w-36 cursor-pointer md:h-[46px] rounded-lg bg-red-500 text-light-color font-bold py-2 px-4 mt-5 flex items-center justify-center flex-row `}>Log Out</motion.button >

        </div>
    );
}