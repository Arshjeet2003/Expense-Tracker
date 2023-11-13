import React, { useState,useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';
import "../css/dashboard.css";
import transactionContext from '../context/transactions/transactionContext.js';
import { SearchBar } from "./SearchBar.jsx";
import ChartComponent from "./ChartComponent.jsx";
import themeContext from "../context/theme/themeContext.js";
import friendContext from "../context/friend/friendContext.js";

const Dashboard = () => {

  const context = useContext(transactionContext);
  const context1 = useContext(themeContext);
  const context2 = useContext(friendContext);
  const {friends,addFriend,getUserFriends,deleteFriend} = context2;
  const { theme } = context1;
  const { getUserTransactions } = context;
  const [propsData,setPropsData] = useState({value:"0"});
  const [data,setData] = useState({});
  useEffect(() => {
    getUserFriends();
    const fetchData = async () => {
      try {
        const result = await getUserTransactions("");
        setData(result);
        giveNotification();
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData(); // Call the async function to fetch data
  }, []);


  const giveNotification = () => {
    const today = new Date();
    if (data.transactions) {
      for (const transaction of data.transactions) {
        if (transaction.recurring === "Yes") {
          const Repeat = transaction.repeat;
          const transactionDate = new Date(transaction.date);
  
          if (today.getDate() === transactionDate.getDate() + Number(Repeat)) {
            // console.log(transaction.name);
          }
        }
      }
    }
  }


  return (
    <>
    <div className={`${
          theme === "light" ? "full-heightl" : "full-heightd"
        }`}>
      <Navbar data={data} />
      <Sidebar />
      <div className="container-fluid">
        <div className="row full-height">
          {/* Left Side */}
          <div className="col-md-8 full-height bordered">
            <ChartComponent data={data} />
            {/* <ChartComponent data={data}/> */}
            {/* Content here */}
          </div>
          {/* Right Side */}
          <div className="col-md-4 full-height">
            {/* Upper Right Section */}
            <div className="row  bordered upper">
              <div className="col-12">
                {/* Upper Right Content here */}
                <SearchBar propsData={propsData}/>
                <div className="row my-3">
                <h2>Friends</h2>
                <div className="container mx-2">
                {friends.length===0 && 'No Friends to display'}
                </div>
                {friends.map((friend) => (
              <li key={friend.id}>{friend.name}</li>
              ))}
              </div>
              </div>
            </div>
            {/* Lower Right Section */}
            <div className="row bordered lower">
              <div className="col-12">{/* Lower Right Content here */}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default Dashboard;
