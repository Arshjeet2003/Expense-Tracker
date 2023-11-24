import React, { useContext, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import "../css/navbar.css";
import NotificationComp from './NotificationComp.jsx';
import themeContext from "../context/theme/themeContext";
import logo from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBell,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

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
        style={{
          zIndex: "200",
          width: "92.4%",
          marginLeft: "6.5%",
          position: "fixed",
        }}
      >
        <div className="container">
          <h3
            style={{
              color: "#fff",
            }}
          >
            <strong
              style={{
                color: `${
                  theme === "light"
                    ? "rgb(107, 240, 107)"
                    : "rgb(107, 240, 107)"
                }`,
              }}
            >
              B
            </strong>
            udget{" "}
            <strong
              style={{
                color: `${
                  theme === "light"
                    ? "rgb(107, 240, 107)"
                    : "rgb(107, 240, 107)"
                }`,
              }}
            >
              B
            </strong>
            uddy
            <FontAwesomeIcon
              icon={faDollarSign}
              flip
              style={{ color: "#6bf06b",marginLeft:"5px" }}
            />
          </h3>
          {/* <Link
            className={`${
              theme === "light" ? "navbar-brandl" : "navbar-brandd"
            }`}
            to="/"
          >
            <img src={logo} alt="logo" style={{
              height:"7vh"
            }}/>
          </Link> */}
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
                  <strong>Quick Add</strong>
                  {/* <FontAwesomeIcon
                    icon="fa-solid fa-plus"
                    spin
                    style={{ color: "#ffffff" }}
                  /> */}
                  {/* <img src={plussolid} alt="" style={{ height: "30px" }} /> */}
                  <FontAwesomeIcon
                    icon={faPlus}
                    spin
                    style={{
                      color: "#ffffff",
                      marginLeft: "5px",
                      fontSize: "20px",
                    }}
                  />
                </Link>
              </li>
              <li
                className={`${theme === "light" ? "nav-item1" : "nav-itemd"}`}
              >
                <a onClick={toggleTheme} className="nav-link mx-2" href="#">
                  <i className="material-symbols-outlined sun" id="night">
                    {theme === "dark" ? "light_mode" : "dark_mode"}
                  </i>
                  {/* <FontAwesomeIcon icon={`${theme === "light" ? faSun : faMoon}`} style={{ color: "#f3ef12",fontSize:"20px" }} /> */}
                </a>
                {/* <!-- <span className="material-symbols-outlined">
                        light_mode
                        </span> --> */}
              </li>
              <li
                className={`${theme === "light" ? "nav-item1" : "nav-itemd"}`}
              >
                <a onClick={handleNotification} className="nav-link mx-2">
                  <FontAwesomeIcon
                    icon={faBell}
                    shake
                    style={{ color: "#e8eaed" }}
                    fontSize={"20px"}
                    cursor={"pointer"}
                  />
                </a>
              </li>
              <li
                className={`dropdown ${
                  theme === "light" ? "nav-item1" : "nav-itemd"
                }`}
              >
                <Link className="nav-link mx-2" to="/profile">
                  <div className="d-flex align-items-center">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      className="avatar sm rounded-pill me-3 flex-shrink-0"
                      alt="Customer"
                    />
                  </div>
                </Link>
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
  );
}

export default Navbar;