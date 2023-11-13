import React, { useContext, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import "../css/navbar.css";
import NotificationComp from './NotificationComp.jsx';
import themeContext from "../context/theme/themeContext";

const Navbar = (props) => {

  const context = useContext(themeContext);
  const { theme,toggleTheme } = context;

  const [notificationClicked,setClicked] = useState(false);
  const transaction = props?.dataForNotification;
  
  const handleNotification = ()=>{
    if(notificationClicked===false){
      setClicked(true);
    }
    else{
      setClicked(false);
    }
  }


  useEffect(() => {
    
  }, [setClicked,notificationClicked]);
  return (
      <div>
        <nav
          className="navbar navbar-expand-sm navbar-light"
        id={`${theme === "light" ? "neubarl" : "neubard"}`}
        >
          <div className="container">
            <a
              className={`${
                theme === "light" ? "navbar-brandl" : "navbar-brandd"
              }`}
              href="#"
            >
              <img src="image" height="60" alter="logo" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className=" collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ms-auto ">
                <li
                  className={`${theme === "light" ? "nav-iteml" : "nav-itemd"}`}
                >
                  <Link
                    className={`nav-link mx-2 ${
                      theme === "light" ? "activel" : "actived"
                    }`}
                    aria-current="page"
                    to="/quickadd"
                  >
                    Quick Add
                    <span className="material-symbols-outlined plus-sign">
                      add
                    </span>
                  </Link>
                </li>
                <li
                  className={`${theme === "light" ? "nav-item1" : "nav-itemd"}`}
                >
                  <a onClick={toggleTheme} className="nav-link mx-2" href="#">
                    <i className="material-symbols-outlined sun" id="night">
                    {theme === "dark" ? "light_mode" : "dark_mode"}
                    
                    </i>
                  </a>
                  {/* <!-- <span className="material-symbols-outlined">
                        light_mode
                        </span> --> */}
                </li>
                <li
                  className={`${theme === "light" ? "nav-item1" : "nav-itemd"}`}
                >
                  <a onClick={handleNotification} className="nav-link mx-2">
                    <i className="material-symbols-outlined">notifications</i>
                  </a>
                </li>
                <li className= {`dropdown ${theme === "light" ? "nav-item1" : "nav-itemd"}`}>
                  <a
                    className="nav-link mx-2 dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Register
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <Link className="dropdown-item" to="/login">
                        Sign-up
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Log in
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {notificationClicked ? (
          <NotificationComp transaction={transaction} />
        ) : (
          ""
        )}
        ;
      </div>
  )
}

export default Navbar;