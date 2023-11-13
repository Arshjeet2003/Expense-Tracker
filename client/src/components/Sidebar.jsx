import React from 'react'

import { useState,useContext } from 'react';
import "../css/sidebar.css";
import { Link, useNavigate } from 'react-router-dom';
import themeContext from '../context/theme/themeContext';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(themeContext);
  const { theme } = context;
  let navigate = useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }

  const toggleSidebar = () => {
    // This will toggle the state between true and false
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div
        className={`${theme === "light" ? "sidebarl" : "sidebard"} ${
          isOpen ? `${theme === "light" ? "openl" : "opend"}` : ""
        }`}
      >
        <div
          className={`${theme === "light" ? "logo-detailsl" : "logo-detailsd"}`}
        >
          <div className={`${theme === "light" ? "logo_namel" : "logo_named"}`}>
            Project-name/logo
          </div>
          <i
            className={`bx ${isOpen ? "bx-menu" : "bx-menu-alt-right"}`}
            id="btn"
            onClick={toggleSidebar}
          />
        </div>
        <ul className="nav-list">
          <li>
            <Link to="/">
              <i className="material-symbols-outlined" style={{ fontSize: 24 }}>
                dashboard
              </i>
              <span
                className={`${
                  theme === "light" ? "links_namel" : "links_named"
                }`}
              >
                Dashboard
              </span>
            </Link>
            <span className="tooltip">Dashboard</span>
          </li>
          <li>
            <Link to="/friends">
              <i className="material-symbols-outlined" style={{ fontSize: 24 }}>
                person
              </i>
              <span
                className={`${
                  theme === "light" ? "links_namel" : "links_named"
                }`}
              >
                Friends
              </span>
            </Link>
            <span className="tooltip">Friends</span>
          </li>
          <li>
            <Link to="/groups">
              <i className="material-symbols-outlined" style={{ fontSize: 24 }}>
                groups
              </i>
              <span
                className={`${
                  theme === "light" ? "links_namel" : "links_named"
                }`}
              >
                Groups
              </span>
            </Link>
            <span className="tooltip">Groups</span>
          </li>
          <li>
            <Link to="/transactions">
              <i className="material-symbols-outlined" style={{ fontSize: 24 }}>
                receipt_long
              </i>
              <span
                className={`${
                  theme === "light" ? "links_namel" : "links_named"
                }`}
              >
                Transactions
              </span>
            </Link>
            <span className="tooltip">Transactions</span>
          </li>
          <li>
            <a href="#">
              <i className="material-symbols-outlined" style={{ fontSize: 24 }}>
                sports_score
              </i>
              <span
                className={`${
                  theme === "light" ? "links_namel" : "links_named"
                }`}
              >
                Goals
              </span>
            </a>
            <span className="tooltip">Goals</span>
          </li>
          <li>
            <Link to="/Conversions">
              <i className="material-symbols-outlined" style={{ fontSize: 24 }}>
                conversion_path
              </i>
              <span
                className={`${
                  theme === "light" ? "links_namel" : "links_named"
                }`}
              >
                Conversions
              </span>
            </Link>
            <span className="tooltip">Conversions</span>
          </li>
          <li className={`${theme === "light" ? "profilel" : "profiled"}`}>
            <div className="profile-details">
              <div className="name_job">
                <div
                  onClick={handleLogout}
                  className={`${theme === "light" ? "namel" : "named"}`}
                >
                  Log Out
                </div>
              </div>
            </div>
            <i
              className="bx bx-log-out"
              onClick={handleLogout}
              id={`${theme === "light" ? "log_outl" : "log_outd"}`}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar