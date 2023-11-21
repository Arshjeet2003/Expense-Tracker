import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../css/Conversions.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import themeContext from "../context/theme/themeContext";
import Conversion from "../images/Conversion.svg";
import AOS from "aos";
import "aos/dist/aos.css";

const Conversions = () => {
  useEffect(() => {
    AOS.init({
      // Global settings for AOS initialization
      // For example:
      offset: 200, // Change offset to trigger animations sooner or later
      duration: 700, // Animation duration
      easing: "ease-in-out", // Easing option
      delay: 300, // Delay animation
    });
  }, []);

  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState();
  const [convertedAmount, setConvertedAmount] = useState();
  const [currencies, setCurrencies] = useState([]);
  const context1 = useContext(themeContext);
  const { theme } = context1;
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

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
          `https://open.er-api.com/v6/latest/${fromCurrency}`
        ); // exchangerates api for the
        const rate = response.data.rates[toCurrency];
        setExchangeRate(rate);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate !== undefined) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <>
      <Sidebar />
      <div
        className={`${
          theme === "light" ? "complete-conversionsl" : "complete-conversionsd"
        }`}
        style={{ marginTop: "500" }}
      >
        <div className="row">
          <Navbar />
          <div
            className="col"
            style={{ paddingTop: "7.5%" }}
            data-aos={"fade-right"}
          >
            <img
              src={Conversion}
              alt=""
              style={{
                height: "75vh",
                paddingLeft: "2%",
              }}
            />
          </div>
          <div className="col" style={{ paddingTop: "6%" }}>
            <div>
              <div
                className={`container mt-5 ${
                  theme === "light"
                    ? "converter-containerl"
                    : "converter-containerd"
                }`}
                data-aos={"fade-left"}
              >
                <h3
                  style={{
                    marginBottom: "300",
                    color: `${theme === "light" ? "black" : "#fff"}`,
                    textAlign: "center",
                  }}
                >
                  <strong>Convert your currency</strong>
                </h3>
                <div
                  className={`${
                    theme === "light" ? "input-groupl" : "input-groupd"
                  }`}
                >
                  <label
                    style={{
                      color: `${theme === "light" ? "black" : "#fff"}`,
                    }}
                  >
                    Amount:
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    style={{
                      background: `${theme === "light" ? "#fff" : "#333d82"}`,
                      border: "1px solid #25273f",
                      color: `${theme === "light" ? "black" : "#fff"}`,
                    }}
                  />
                </div>
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
                    From Currency:
                  </label>
                  <select
                    value={fromCurrency}
                    onChange={handleFromCurrencyChange}
                    style={{
                      background: `${theme === "light" ? "#fff" : "#333d82"}`,
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
                    To Currency:
                  </label>
                  <select
                    value={toCurrency}
                    onChange={handleToCurrencyChange}
                    style={{
                      background: `${theme === "light" ? "#fff" : "#333d82"}`,
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
                <div
                  className={`${
                    theme === "light"
                      ? "result-containerl"
                      : "result-containerd"
                  }`}
                  style={{ textAlign: "center" }}
                >
                  <h4
                    className="mt-3"
                    style={{
                      color: `${theme === "light" ? "black" : "#fff"}`,
                    }}
                  >
                    <strong>Conversion Result:</strong>
                  </h4>
                  <p
                    style={{
                      color: `${theme === "light" ? "black" : "#fff"}`,
                    }}
                  >
                    {amount} {fromCurrency} is equal to {convertedAmount}{" "}
                    {toCurrency}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversions;
