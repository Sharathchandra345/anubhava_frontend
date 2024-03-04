import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import college from '../static/logos/logo_college.png';
import ignite from '../static/logos/logo_ignite.png';
import NavBarTabs from "./NavBarTabs";
import { motion } from "framer-motion";
import { UserAuth } from '../context/AuthContext'
function Button({ text, bg }) {
  return (
    <div>
      <div
        className={
          `cursor-pointer text-primary-color border-2 border-primary-color px-4 py-4 rounded-md ${bg || `bg-light-color`}`}>
        <span>{text}</span>
      </div>
    </div>
  );
}


function Navbar() {
  const [width, setWidth] = useState(window.innerWidth);
  const { user } = UserAuth();
  // This is the hook that we will use to get the current location (URL parameters)
  // To highlight the current page in the navbar
  const location = useLocation();
  const [menu, setMenu] = useState(false);

  // This is to manually invoke a link
  const navigate = useNavigate();
  const handleClick = useCallback(() => { navigate('/') }, [navigate]);
  const handleLogin = useCallback(() => { navigate('/login') }, [navigate]);
  const handleAccount = useCallback(() => { navigate('/account') }, [navigate]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    if (width > 800) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  }, [width]);
  return (
    <div className="z-50 fixed px-4 left-0 right-0 top-0 h-auto shadow-md border-b-2 border-light-color bg-light-color">
      <nav className="md:flex md:items-center mx-auto h-full md:justify-between">
        <div className="flex justify-between items-center">
          <span onClick={handleClick} className="cursor-pointer">
            <img src={college} alt="logo" className="h-16 inline pr-5" />
            <img src={ignite} alt="logo" className="h-16 inline mt-3" />
          </span>

          <span className="text-3xl md:hidden block cursor-pointer mx-2">
            <i onClick={() => {
              window.scrollTo(0, 0);
              setMenu(!menu);
            }} className={menu ? "fas fa-times" : "fas fa-bars"} aria-hidden="true"></i>
          </span>
        </div>


        {menu && <ul id="list"
          onClick={() => { window.scrollTo(0, 0); width < 700 ? setMenu(false) : '' }}
          className={`
          md:flex md:items-center md:z-auto md:static md:w-auto md:py-0 md:opacity-100 md:pl-0 pr-5 md:pr-0
          ${!menu ? 'opacity-0' : 'opacity-100'} items-center absolute space-x-2 mr-10 bg-light-color
          pl-5  rounded-b-lg pb-4 w-full left-0 transition-all ease-in duration-500`}>
          <NavBarTabs disable={menu} text="Home" link="/" bg={location.pathname == '/' ? 'bg-primary-color text-light-color font-bold' : 'bg-light-color'} />
          <NavBarTabs disable={menu} text="About" link="/about" bg={location.pathname == '/about' ? 'bg-primary-color text-light-color font-bold' : 'bg-light-color'} />
          <NavBarTabs disable={menu} text="Companies" link="/companies" bg={location.pathname.includes("compan") ? 'bg-primary-color text-light-color font-bold' : 'bg-light-color'} />
          <NavBarTabs disable={menu} text="How to Apply" link="/how-to-apply" bg={location.pathname == '/how-to-apply' ? 'bg-primary-color text-light-color font-bold' : 'bg-light-color'} />
          <NavBarTabs disable={menu} text="Resources" link="/resources" bg={location.pathname == '/resources' ? 'bg-primary-color text-light-color font-bold' : 'bg-light-color'} />
          <NavBarTabs disable={menu} text="Contact Us" link="/contact-us" bg={location.pathname == '/contact-us' ? 'bg-primary-color text-light-color font-bold' : 'bg-light-color'} />

          <li>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="flex justify-center items-center w-full"
              whileTap={{ scale: 0.9 }}
              onClick={user?.email ? handleAccount : handleLogin}
            >
              <Button text={user?.email ? "My Account" : "Login / Signup"} bg="bg-light-color" />
            </motion.button>
          </li>
        </ul>}
      </nav>
    </div>
  );
}

export default Navbar;
