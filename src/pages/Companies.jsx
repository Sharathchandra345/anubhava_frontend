import React, { useState, useEffect } from 'react'
import { DotLoader } from 'react-spinners';
import desk from '../static/images/desk.jpg'
import { motion } from "framer-motion";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function Companies() {
    // scroll to top 
    window.scrollTo(0, 0);
    document.title = "Companies"

    const MySwal = withReactContent(Swal)

    const [screenSize, setScreenSize] = useState(window.innerWidth);
    useEffect(() => {
        function handleResize() {
            setScreenSize(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [screenSize]);


    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [usersearched, setUserSearched] = useState(false);

    const [currentPage, setCurrentPage] = useState(parseInt(localStorage.getItem('companiesPaginationIndex')) || 1);
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
            localStorage.setItem('companiesPaginationIndex', index)
        }
    };

    const renderItems = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        // Check if on last page
        if (currentPage === pagesCount) {
            return companies.slice(start)
        } else {
            return companies.slice(start, end)
        }
    };


    async function fetchData() {
        setLoading(true)

        const response = await fetch('https://ignite-backend.onrender.com/companies')
        const data = await response.json()
        // shuffle the array
        // for (let i = data.length - 1; i > 0; i--) {
        //     const j = Math.floor(Math.random() * (i + 1));
        //     [data[i], data[j]] = [data[j], data[i]];
        // }
        setCompanies(data)
        setLoading(false)

    }
    const handleFilter = (e) => {
        e.preventDefault();
        // clear the pagination index 
        localStorage.setItem('companiesPaginationIndex', 1)
        setCurrentPage(1)
        // reset the pagination number
        pagination = [];
        MySwal.fire({
            icon: 'info',
            title: 'Filter by Profile Type',
            html:
                '<div class="swal2-radio-container flex flex-col items-start">' +
                '<div class="swal2-radio flex flex-row">' +
                '<input type="radio" id="radio-marketing" name="radio" class="swal2-input" value="Marketing">' +
                '<label for="radio-marketing">Marketing</label>' +
                '</div>' +

                '<div class="swal2-radio flex flex-row">' +
                '<input type="radio" id="radio-sales" name="radio" class="swal2-input" value="Sales">' +
                '<label for="radio-sales">Sales</label>' +
                '</div>' +

                '<div class="swal2-radio flex flex-row">' +
                '<input type="radio" id="radio-finance" name="radio" class="swal2-input" value="Finance">' +
                '<label for="radio-finance">Finance</label>' +
                '</div>' +

                '<div class="swal2-radio flex flex-row">' +
                '<input type="radio" id="radio-hr" name="radio" class="swal2-input" value="HR">' +
                '<label for="radio-hr">HR</label>' +
                '</div>' +

                '<div class="swal2-radio flex flex-row">' +
                '<input type="radio" id="radio-others" name="radio" class="swal2-input" value="Others">' +
                '<label for="radio-others">Others</label>' +
                '</div>' +
                '</div>',
            focusConfirm: false,
            showCloseButton: true,
            preConfirm: () => {
                const selectedValue = document.querySelector('input[name="radio"]:checked').value;
                handleSearch(selectedValue);
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonColor: '#36528b', // primary-color
            allowEnterKey: false

        });

    };

    const handleSearch = (val) => {
        // set the pagination index to 1
        localStorage.setItem('companiesPaginationIndex', 1)
        setCurrentPage(1)
        setCompanies([])
        let search
        if (val == "") {
            search = document.getElementById('searchbox').value;
            if (search == "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please enter a search term!',
                    confirmButtonColor: '#36528b', // primary-color

                })
                return;
            }

        } else {
            search = val;
        }
        setSearchString(search);
        setUserSearched(true);
        setLoading(true)
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch("https://ignite-backend.onrender.com/search/" + search, requestOptions)
            .then(response => response.text())
            .then((result) => {
                if (result == "[]") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No results found!',
                        confirmButtonColor: '#36528b', // primary-color

                    })
                    setCompanies([])

                } else {
                    setCompanies(JSON.parse(result))
                }
                setLoading(false)
            })
            .catch(error => console.log('error', error));
        search = "";
    }
    const clearSearch = () => {
        setSearchString("");
        document.getElementById('searchbox').value = '';
        fetchData();
        setUserSearched(false);
    }

    const override = {
        display: "block",
        margin: "0 auto",
        padding: "0",
        opacity: 1,

        // borderColor: "teal",
    };

    useEffect(() => {
        fetchData()
        // check local storage for pagination index if it exists then do not do anything if it does not exist then set it to 0
        if (localStorage.getItem('companiesPaginationIndex') === null) {
            localStorage.setItem('companiesPaginationIndex', 0)
        }
    }, [])
    return (
        <div className='md:mt-20 mt-[65px] flex flex-col relative h-full w-full'>
            {/*TEAL COLOR*/}
            <div
                style={{
                    // backgroundImage: `linear-gradient(0deg, rgba(15, 111, 123, 0.7), rgba(15, 111, 123, 0.7)) , url(${desk})`, // default
                    // backgroundImage: `linear-gradient(0deg, rgba(48, 153, 117, 0.7), rgba(48, 153, 117, 0.7)) , url(${desk})`, // 1
                    // backgroundImage: `linear-gradient(0deg, rgba(13, 27, 42, 0.7), rgba(13, 27, 42, 0.7)), url(${desk})`, // 2 // Black
                    backgroundImage: `linear-gradient(0deg, rgba(15, 37, 80, 0.7), rgba(15, 37, 80, 0.7)), url(${desk})`, // 3
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} className={`${!loading ? `opacity-100` : `opacity-50`} overflow-visible flex flex-col bg-primary-color  mx-0 h-80 w-full`}>
                <div className='h-80 z-1'>
                    <div className='flex items-center justify-center w-full h-full'>
                        <h1 className='md:text-5xl font-bold text-4xl text-light-color md:font-medium text-center'> Find your favourite company!</h1>
                    </div>
                </div>
                {/* search BAR*/}
                <div className='w-full justify-center items-center flex '>
                    <div className='shadow-md absolute top-64 bottom-0 flex m-10 items-center bg-light-color h-20 w-11/12 rounded-lg mx-8 my-6 px-10'>
                        <div className='flex flex-col w-full md:pr-10 pr-5'>
                            <div className='flex justify-between items-center w-12/12'>
                                {/* // search icon */}
                                <input onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch(e.target.value);
                                    }
                                }} id="searchbox" disabled={loading} className='bg-light-color p-2 text-sm outline-none w-full' type='text' placeholder='COMPANIES OR PROFILES' />
                                <svg className={`${usersearched ? 'hidden' : 'visible'} cursor-pointer fill-primary-color`} onClick={() => handleSearch("")} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" />
                                </svg>
                                <svg onClick={clearSearch} className={`${usersearched ? 'visible' : 'hidden'} cursor-pointer fill-primary-color`} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" />
                                </svg>
                            </div>
                            <div className='h-px w-12/12 bg-primary-color my-0 mx-2'></div>
                        </div>
                        <button onClick={handleFilter} disabled={loading} className='md:h-[62px] md:w-[200px] flex font-bold justify-center items-center px-4 py-2 bg-primary-color text-light-color hover:bg-primary-color rounded-lg text-sm'>
                            <svg className='mr-2' width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 12H11V10H7V12ZM0 0V2H18V0H0ZM3 7H15V5H3V7Z" fill="#FEFEFE" />
                            </svg>
                            Filter
                        </button>
                    </div>
                </div>
            </div>
            <DotLoader cssOverride={override} size={150} className='text-primary-color' color='#36528b' loading={loading} />
            {!usersearched ?
                < div className={`${!usersearched ? `visible` : `hidden`}`}>
                    <h1 className='text-2xl md:text-4xl text-primary-color font-medium content-center md:mt-16 md:mb-8 md:mx-16 mt-16 mb-6 mx-4'>
                        Our top recruiters!
                    </h1>
                    <div className={`${!loading ? `opacity-100` : `opacity-50`} grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 md:px-16 px-4 mb-10`}>
                        {renderItems().map(company => (
                            <motion.button
                                key={company._id}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                < div
                                    onClick={() => window.open(`/companies/${company._id}`, "_blank")}
                                    className='bg-primary-color h-56 md:w-9/12 w-full items-center rounded-xl p-5 justify-center flex flex-col overflow-hidden' >
                                    <div className='w-[180px] h-5/6 md:w-[250px] bg-light-color rounded-md items-center justify-center flex overflow-hidden'>
                                        {/* <img className='object-contain h-full w-full' src={company.image} ></img> */}
                                        <img className='object-contain h-full w-full' src="https://th.bing.com/th/id/R.ea54db5822a3b2fdbd590b49c57d8033?rik=h7e4LIz%2bY8DMwg&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fyio%2f69M%2fyio69MBoT.jpg&ehk=XuNU9Y%2fhF72ZA3cHcWcAlucA5DA0wl1zzkrLCOAL8%2bs%3d&risl=&pid=ImgRaw&r=0"></img>

                                    </div>
                                    <h1 className='text-xl h-1/6 text-light-color font-medium content-center'>
                                        {screenSize < 768 ? company.name.length > 10 ? company.name.substring(0, 10) + '...' : company.name : company.name}
                                    </h1>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div >
                :
                < div className={`${!usersearched ? `hidden` : `visible`}`}>
                    <h1 className={`${!loading ? `opacity-100` : `opacity-0`} flex flex-row text-2xl md:text-4xl text-primary-color font-medium content-center md:mt-16 md:mb-8 md:mx-16 mt-16 mb-6 mx-4 `}>
                        <svg onClick={clearSearch} className='cursor-pointer md:mr-5 mr-2 fill-primary-color' width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32 14.5H7.66L18.84 3.32L16 0.5L0 16.5L16 32.5L18.82 29.68L7.66 18.5H32V14.5Z" />
                        </svg>
                        Search results for "<span className='text-dark-color'>{searchString}</span>"
                    </h1>
                    <div className='items-start justify-start w-12/12 grid grid-row md:gap-4 gap-2 md:px-14 px-4 mb-10'>
                        {
                            renderItems().length > 0 ?
                                renderItems().map(company => (
                                    <motion.button
                                        key={company._id}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        < div
                                            onClick={() => window.open(`/companies/${company._id}`, "_blank")}
                                            className={`bg-primary-color h-44 w-full rounded-xl p-5 flex flex-row gap-4 items-center justify-start`} >
                                            <div className='bg-light-color h-[90px] w-2/12 md:h-[120px] p-2 flex items-center justify-center'>
                                                <img className='h-full w-full object-contain' src={company.image} ></img>
                                            </div>
                                            <div className='flex flex-col gap-5 justify-between w-10/12 mx-4'>
                                                <h1 className='md:block text-xl text-light-color font-medium text-start'>{company.name}</h1>
                                                <h1
                                                    style={{
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: "vertical"

                                                    }}
                                                    className=' text-start text-lg font-normal text-light-color md:block' >{company.about_comp}</h1>
                                            </div>

                                        </div>
                                    </motion.button>
                                ))
                                : <div className='h-[500px] w-full flex flex-col justify-center items-center'>
                                </div>
                        }
                    </div>
                </div >
            }

            <div className='flex flex-row justify-center items-center mb-5'>
                <ul className="flex flex-row gap-2 ">
                    <svg
                        className="w-6 h-6 cursor-pointer m-auto text-primary-color"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={(e) => handleClick(e, currentPage - 1)}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    {pagination.map((number) => (
                        <li
                            onClick={(e) => handleClick(e, number)}
                            key={number} className={` h-[50px] w-[50px] border-solid border-2  cursor-pointer flex flex-row items-center justify-center  rounded-lg 
                        ${currentPage === number ? "border-primary-light  font-bold text-primary-color" : "bg-primary-light text-light-color font-semibold"}`}>
                            <a className="my-auto" href="/" >{number}</a>
                        </li>
                    ))}
                    <svg
                        className="w-6 h-6 cursor-pointer m-auto text-primary-color"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={(e) => handleClick(e, currentPage + 1)}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                    <div
                        className='h-[50px] w-[70px] flex flex-row items-center justify-center  rounded-lg'
                    >
                        <h1 className='
                        text-primary-color text-lg font-semibold
                        '>
                            {currentPage} of {pagesCount}
                        </h1>
                    </div>
                </ul>
            </div >
        </div >
    )
}

export default Companies