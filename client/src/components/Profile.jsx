import React, { useState, useContext, useEffect } from 'react'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import themeContext from "../context/theme/themeContext.js";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import "../css/profile.css";
import currencyContext from "../context/currency/currencyContext.js";

const Profile = () => {
  const [currencies, setCurrencies] = useState([]);
  const context1 = useContext(themeContext);
  const { theme } = context1;
  const context2 = useContext(currencyContext);
  const { currentValue, previousValue, handleCurrencyChange } = context2;
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get("https://open.er-api.com/v6/latest"); // exchangerate api for currency exchange
        const allCurrencies = Object.keys(response.data.rates);
        setCurrencies(allCurrencies);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);


  return (
    <div className="bodyl">
      <div className="container emp-profile" style={{ paddingTop: "5%" }}>
        <form method="post">
          <div className="row mx-3">
            <div className="col-md-5">
              <div className="profile-img">
                <img src="E-Wallet.svg" alt="" />
                <div className="file btn btn-lg btn-primary">
                  Change Photo
                  <input type="file" name="file" />
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="profile-head">
                <h2>Naman Singh</h2>
                <h6>@nmn-sngh</h6>
                <p className="proile-rating">
                  Goals achieved : <span>8/10</span>
                </p>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="profile-tab"
                      data-toggle="tab"
                      href="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Change Currency
                    </a>
                  </li>
                </ul>
                <div className="tab-content profile-tab" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>User Id</label>
                      </div>
                      <div className="col-md-6">
                        <p>@nmn-sngh</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Name</label>
                      </div>
                      <div className="col-md-6">
                        <p>Naman Singh</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        <p>nmnsingh96@gmail.com</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Currency</label>
                      </div>
                      <div className="col-md-6">
                        <p>Rupee</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
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
        </form>
      </div>
    </div>
  );
}

export default Profile
