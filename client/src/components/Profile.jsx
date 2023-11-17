import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import themeContext from "../context/theme/themeContext.js";
import authContext from "../context/auth/authContext";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import "../css/profile.css";
import currencyContext from "../context/currency/currencyContext.js";
import Conversion from "../images/Conversion.svg";

const Profile = () => {
  const context3 = useContext(authContext);
  const { getUser } = context3;

  const [currencies, setCurrencies] = useState([]);
  const context1 = useContext(themeContext);
  const { theme } = context1;
  const context2 = useContext(currencyContext);
  const { currentValue, handleCurrencyChange } = context2;
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const curr_user = await getUser();
        setUser(curr_user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get("https://open.er-api.com/v6/latest"); // exchangerate api for currency exchange
        const allCurrencies = Object.keys(response.data.rates);
        setCurrencies(allCurrencies);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };
    fetchUser();
    fetchCurrencies();
  }, [user]);

  const [activeTab, setActiveTab] = useState("home"); // State to manage active tab

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="bodyl">
      <Navbar />
      <Sidebar />
      <div className="container emp-profile" style={{ paddingTop: "5%" }}>
        <div className="row mx-3">
          <div className="col-md-5">
            <div className="profile-img">
              <img src={Conversion} alt="" />
              <div className="file btn btn-lg btn-primary">
                Change Photo
                <input type="file" name="file" />
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="profile-head">
              <h2 className="h22">{user.name}</h2>
              <h6>{user._id}</h6>
              <p className="proile-rating">
                Goals achieved : <span>8/10</span>
              </p>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "home" ? "active" : ""
                    }`}
                    id="home-tab"
                    onClick={() => handleTabClick("home")}
                    role="tab"
                    aria-controls="home"
                    aria-selected={activeTab === "home"}
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "profile" ? "active" : ""
                    }`}
                    id="profile-tab"
                    onClick={() => handleTabClick("profile")}
                    role="tab"
                    aria-controls="profile"
                    aria-selected={activeTab === "profile"}
                  >
                    Change Currency
                  </a>
                </li>
              </ul>
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className={`tab-pane fade ${
                    activeTab === "home" ? "show active" : ""
                  }`}
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>User Id</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user._id}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Currency</label>
                    </div>
                    <div
                      className="col-md-6"
                      style={{
                        color: `${theme === "light" ? "#4d4dff" : "#333d82"}`,
                        // fontWeight:"500px",
                      }}
                    >
                      <strong>{currentValue}</strong>
                    </div>
                  </div>
                </div>
                <div
                  className={`tab-pane fade ${
                    activeTab === "profile" ? "show active" : ""
                  }`}
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row">
                    <div
                      className={`mt-3 ${
                        theme === "light" ? "input-groupl" : "input-groupd"
                      }`}
                    >
                      <label
                        style={{
                          color: `${theme === "light" ? "black" : "#fff"}`,
                          paddingBottom: "5%",
                          marginTop: "-5%",
                        }}
                      >
                        Choose a Currency:
                      </label>
                      <select
                        value={currentValue}
                        onChange={(e) => handleCurrencyChange(e.target.value)}
                        style={{
                          background: `${
                            theme === "light" ? "#fff" : "#333d82"
                          }`,
                          border: "1px solid #25273f",
                          color: `${theme === "light" ? "black" : "#fff"}`,
                          width: "50%",
                          marginTop: "-30%",
                          border: "2px solid #4d4dff",
                          borderRadius: "10px",
                        }}
                      >
                        {currencies.map((currency) => (
                          <option key={currency} value={currency}>
                            {currency}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
