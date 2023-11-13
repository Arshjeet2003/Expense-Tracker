import React, { useState,useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';
import "../css/dashboard.css";
import transactionContext from '../context/transactions/transactionContext.js';
import { Bar } from 'react-chartjs-2';

const Dashboard = () => {
  const allData = {
    labels: ['Data1', 'Data2', 'Data3', 'Data4', 'Data5', 'Data6', 'Data7'],
    datasets: [
      {
        label: 'Transactions per month',
        data: [10, 20, 15, 5, 30, 25, 10],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Savings per month',
        data: [25, 10, 30, 5, 20, 15, 10],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const [data1, setData1] = useState({
    labels: allData.labels.slice(0, 3),
    datasets: [allData.datasets[0]],
  });

  const [data2, setData2] = useState({
    labels: allData.labels.slice(0, 3),
    datasets: [allData.datasets[1]],
  });

  const [startIndex1, setStartIndex1] = useState(0);
  const [startIndex2, setStartIndex2] = useState(0);

  const handleNextClick1 = () => {
    let nextStartIndex = startIndex1 + 3;
    if (nextStartIndex >= allData.labels.length) {
      nextStartIndex = 0;
    }

    const newData = {
      labels: allData.labels.slice(nextStartIndex, nextStartIndex + 3),
      datasets: [allData.datasets[0]],
    };

    setData1(newData);
    setStartIndex1(nextStartIndex);
  };

  const handleNextClick2 = () => {
    let nextStartIndex = startIndex2 + 3;
    if (nextStartIndex >= allData.labels.length) {
      nextStartIndex = 0;
    }

    const newData = {
      labels: allData.labels.slice(nextStartIndex, nextStartIndex + 3),
      datasets: [allData.datasets[1]],
    };

    setData2(newData);
    setStartIndex2(nextStartIndex);
  };

  const chartContainerStyles = {
    height: '300px',
    width: '20%',
    marginLeft: '150px',
  };
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
    <div>
      
      <Navbar data={data}/>
      <Sidebar />
      <div className="container-fluid full-height">
        <div className="row full-height">
          {/* Left Side */}
          <div className="col-md-8 full-height bordered">
          <div>
      {/* <h1>About</h1> */}
      <div style={{ display: 'flex' }}>
        <div style={chartContainerStyles}>
          {/* <h2>Bar Chart 1</h2> */}
          <Bar data={data1} />
          <button onClick={handleNextClick1}>Next</button>
        </div>
        <div style={chartContainerStyles}>
          {/* <h2>Bar Chart 2</h2> */}
          <Bar data={data2} />
          <button onClick={handleNextClick2}>Next</button>
        </div>
      </div>
    </div>
            {/* Content here */}
          </div>
          {/* Right Side */}
          <div className="col-md-4 full-height">
            {/* Upper Right Section */}
            <div className="row bordered upper">
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