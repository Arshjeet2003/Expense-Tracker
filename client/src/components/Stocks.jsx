// src/components/CryptoTracker.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Stocks.css"; // Import the custom CSS file
import Sidebar from "./Sidebar.jsx";

import Navbar from "./Navbar.jsx";
import StockContext from "../context/stocks/StockContext.js";
import themeContext from "../context/theme/themeContext";
import Currency from "./currency";

const CryptoTracker = () => {
  const context = useContext(StockContext);

  const { getUserStocks } = context;
  const context1 = useContext(themeContext);
  const { theme } = context1;
  const [cryptoData, setCryptoData] = useState([]);
  const [trackedAssets, setTrackedAssets] = useState([]);
  const [recentlyTracked, setRecentlyTracked] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [userStocks, setStocks] = useState([]);
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const filtr = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedCoins = [...filtr].sort((a, b) => {
    const orderMultiplier = sortOrder === "asc" ? 1 : -1;
    return orderMultiplier * (a.current_price - b.current_price);
  });
  return (
    <div
      className="cryp"
      style={{
        background: `${theme === "light" ? "#fff" : "#25273f"}`,
        color: `${theme === "light" ? "black" : "#fff"}`,
      }}
    >
      {/* {console.log(theme)} */}
      <Navbar />
      <Sidebar />
      <div className="container crypto-tracker mt-5">
        {/* <h1>Crypto Tracker</h1> */}

        <div className="row">
          <div
            className="col-md-4"
            style={{ justifyContent: "center", textAlign: "center" }}
          >
            {" "}
            <button
              className={`btn transparent ${
                theme === "light" ? "bStocksl" : "bStocksd"
              }`}
              onClick={handleSort}
              style={{ marginLeft: "25%" }}
            >
              {sortOrder === "asc" ? "SMALL TO LARGE" : "LARGE TO SMALL"}
            </button>
          </div>
          <div className="col-md-4 "></div>
          <div className="col-md-4 stocksearch">
            <form>
              <input
                type="text"
                placeholder="Search"
                className="stock-input"
                onChange={handleChange}
              />
            </form>
          </div>
        </div>

        {sortedCoins
          .filter((coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((coin) => (
            <Currency
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              price={coin.current_price}
              marketcap={coin.total_volume}
              priceChange={coin.price_change_percentage_24h}
            ></Currency>
          ))}
      </div>
    </div>
  );
};

export default CryptoTracker;
