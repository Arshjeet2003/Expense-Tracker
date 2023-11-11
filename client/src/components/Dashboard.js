import React, { useState,useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import "../css/dashboard.css";
import transactionContext from '../context/transactions/transactionContext.js';
import { SearchBar } from "./SearchBar.js";
import ChartComponent from "./ChartComponent.js";

const Dashboard = () => {

  const context = useContext(transactionContext);
  const { getUserTransactions } = context;
  const [data,setData] = useState({});
  useEffect(() => {
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
    <div className="full-height">
      <Navbar data={data}/>
      <Sidebar />
      <div className="container-fluid">
        <div className="row full-height">
          {/* Left Side */}
          <div className="col-md-8 full-height bordered">
          <ChartComponent data={data}/>
          {/* <ChartComponent data={data}/> */}
            {/* Content here */}
          </div>
          {/* Right Side */}
          <div className="col-md-4 full-height">
            {/* Upper Right Section */}
            <div className="row  bordered upper">
              <SearchBar/>
              <div className="col-12">{/* Upper Right Content here */}</div>
            </div>
            {/* Lower Right Section */}
            <div className="row bordered lower">
              <div className="col-12">{/* Lower Right Content here */}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
