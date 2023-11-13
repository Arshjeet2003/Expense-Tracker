import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import "../css/dashboard.css";
import transactionContext from "../context/transactions/transactionContext.js";
import { SearchBar } from "./SearchBar.jsx";
import ChartComponent from "./ChartComponent.jsx";
import themeContext from "../context/theme/themeContext.js";
import friendContext from "../context/friend/friendContext.js";

const Dashboard = () => {
  const context = useContext(transactionContext);
  const context1 = useContext(themeContext);
  const context2 = useContext(friendContext);
  const { friends, addFriend, getUserFriends, deleteFriend } = context2;
  const { theme } = context1;
  const { getUserTransactions } = context;
  const [propsData, setPropsData] = useState({ value: "0" });
  const [data, setData] = useState({});
  const [dataForNotification, setDataForNotification] = useState([]);
  useEffect(() => {
    getUserFriends();
    const fetchData = async () => {
      try {
        const result = await getUserTransactions("");
        setData(result);
        giveNotification();
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData(); // Call the async function to fetch data
  }, [data]);

  const handleClickDelete = (e, username) => {
    e.preventDefault();
    deleteFriend(username);
  };

  const giveNotification = () => {
    const today = new Date();
    const notifications = [];
    if (data.transactions) {
      for (const transaction of data.transactions) {
        if (transaction.recurring === "Yes") {
          const Repeat = transaction.repeat;
          const transactionDate = new Date(transaction.date);
          if (today.getDate() === transactionDate.getDate() + Number(Repeat)) {
            notifications.push(transaction);
          }
        } else {
          const Due_date = new Date(transaction.dueDate);
          if (today.getDate() === Due_date.getDate()) {
            notifications.push(transaction);
          }
        }
      }
    }
    setDataForNotification(notifications);
    // console.log(notifications);
  };

  return (
    <>
      <div
        className={`${theme === "light" ? "full-heightl" : "full-heightd"}`}
        style={{
          overflowX: "hidden",
        }}
      >
        <Navbar dataForNotification={dataForNotification} />
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
              <div className="row">
                <div
                  className="col-12"
                  style={{
                    position: "absolute",
                    zIndex: "2",
                    width: "28%",
                  }}
                >
                  {/* Upper Right Content here */}
                  <div
                    style={{
                      width: "100%",
                      paddingLeft: "1.5%",
                      marginLeft: "12%",
                    }}
                  >
                    <SearchBar propsData={propsData} />
                  </div>
                </div>
                <div className="container mt-3">
                  <div className="row">
                    <div className="col-12 mb-3 mb-lg-5">
                      <div className="overflow-hidden card table-nowrap table-card1">
                        <div
                          className="card-header d-flex justify-content-between align-items-center"
                          style={{
                            color: `${theme === "light" ? "black" : "#fff"}`,
                            background: `${
                              theme === "light" ? "white" : "#333d82"
                            }`,
                            border: `${
                              theme === "light"
                                ? "1px solid #5f627d48"
                                : "1px solid white"
                            }`,
                          }}
                        >
                          <h5 className="mb-0">Friends</h5>
                        </div>
                        <div className="table-responsive">
                          <table className="table mb-0">
                            <div className="container mx-2">
                              {friends.length === 0 && "No Friends to display"}
                            </div>
                            <tbody>
                              {friends.map((friend) => (
                                <tr className="align-middle"  key={friend._id}>
                                  <td 
                                    style={{
                                      color: `${
                                        theme === "light" ? "black" : "#fff"
                                      }`,
                                      background: `${
                                        theme === "light" ? "white" : "#333d82"
                                      }`,
                                      border: "none",
                                    }}
                                  >
                                    <div className="d-flex align-items-center">
                                      <img
                                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                        className="avatar sm rounded-pill me-3 flex-shrink-0"
                                        alt="Customer"
                                      />
                                      <div>
                                        <div className="h6 mb-0 lh-1">
                                          {friend._id}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td
                                    className="text-end"
                                    style={{
                                      color: `${
                                        theme === "light" ? "black" : "#fff"
                                      }`,
                                      background: `${
                                        theme === "light" ? "white" : "#333d82"
                                      }`,
                                      border: "none",
                                    }}
                                  >
                                    <div className="drodown">
                                      <button onClick={(e) => handleClickDelete(e, friend._id)}
                                        style={{
                                          border: "none",
                                          background: `${
                                            theme === "light"
                                              ? "white"
                                              : "#333d82"
                                          }`,
                                        }}
                                      >
                                        <i
                                          className="material-symbols-outlined"
                                          style={{
                                            color: `${
                                              theme === "light"
                                                ? "black"
                                                : "white"
                                            }`,
                                            background: `${
                                              theme === "light"
                                                ? "white"
                                                : "#333d82"
                                            }`,
                                          }}
                                        >
                                          delete
                                        </i>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Lower Right Section */}
              {/* <div className="row bordered lower">
              <div className="col-12">Lower Right Content here</div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
