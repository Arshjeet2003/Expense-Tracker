// src/components/CryptoTracker.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/Stocks.css'; // Import the custom CSS file
import Sidebar from './Sidebar.jsx'
import Navbar from './Navbar.jsx';
import StockContext from '../context/stocks/StockContext.js';
import themeContext from "../context/theme/themeContext.js";
import Currency from './currency';

const CryptoTracker = () => {
  const context = useContext(StockContext);
  const context1 = useContext(themeContext);
  const { getUserStocks } = context;
  const theme1 = context1;
  const [cryptoData, setCryptoData] = useState([]);
  const [trackedAssets, setTrackedAssets] = useState([]);
  const [recentlyTracked, setRecentlyTracked] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [userStocks, setStocks] = useState([]);
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('asc');
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getUserStocks("");
  //     console.log(data);
  //     setStocks(data.stocks);
  //     try {
  //       const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en', {
  //         params: {
  //           vs_currency: 'usd',
  //           order: 'market_cap_desc',
  //           per_page: 10,
  //           page: 1,
  //           sparkline: false,
  //         },
  //       });
  //       setCryptoData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching crypto data:', error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);
  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en')
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  // const trackAsset = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/track-asset', {
  //       symbol: userInput,
  //     });

  //     if (response.data.success) {
  //       setTrackedAssets([...trackedAssets, userInput]);
  //       setRecentlyTracked([userInput, ...recentlyTracked.slice(0, 4)]);
  //     } else {
  //       console.log('Asset is already tracked.');
  //     }
  //   } catch (error) {
  //     console.error('Error tracking asset:', error.message);
  //   }

  //   setUserInput('');
  // };

  const handleChange = e => {
    setSearch(e.target.value)
  };
  const filtr = coins.filter(
    coin => coin.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedCoins = [...filtr].sort((a, b) => {
    const orderMultiplier = sortOrder === 'asc' ? 1 : -1;
    return orderMultiplier * (a.current_price - b.current_price);
  });
  return (
    <div className="crypto-tracker">
      <Navbar />
      <Sidebar />
      {/* <h1>Crypto Tracker</h1> */}

      <div className='stocksearch'>
        <h1 className='stock-text'>Search a currency</h1>
        <form>
          <input type="text" placeholder='Search' className="stock-input" onChange={handleChange} />
        </form>
        <button onClick={handleSort}
        style={{marginLeft: '300px'}}>
          {sortOrder === 'asc' ? 'SMALL TO LARGE' : 'LARGE TO SMALL'}
        </button>
      </div>

      {sortedCoins
        .filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))
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

      {/* <div className="recently-tracked-container">
          <h2>Recently Tracked Assets</h2>
          <table>
            <thead>
              <tr>
                <th>Symbol/Name</th>
              </tr>
            </thead>
            <tbody>
              {userStocks && userStocks.length > 0 ? (
                userStocks.map((stock, index) => (
                  <tr key={index}>
                    <td>{stock.assetStock}</td>
                    <td>{stock.valueStock}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No stocks available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div> */}
    </div>
  );
};

export default CryptoTracker
