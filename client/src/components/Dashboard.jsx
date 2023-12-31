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
  const [addmember,handleAddMember] = useState(false);
  const { theme } = context1;
  const { getUserTransactions } = context;
  const [propsData, setPropsData] = useState({ value: "0" });
  const [data, setData] = useState({});
  const [hasNotification,hasNotificationUpdate] = useState(false);
  const [dataForNotification, setDataForNotification] = useState([]);
  
  useEffect(() => {
    getUserFriends();
    handleAddMember(false);
    hasNotificationUpdate(false);
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
  }, [addmember,hasNotification]);

  const handleClickDelete = (e, username) => {
    e.preventDefault();
    deleteFriend(username);
  };

  const giveNotification = () => {
    const today = new Date();
    const notifications = [];
    if (data.transactions) {
      for (const transaction of data.transactions) {
        const transactionDate = new Date(transaction.date);
    
        if (transaction.recurring === "Yes") {
          const repeatDays = Number(transaction.repeat);
    
          // Calculate the number of days between today and the transaction date
          const daysDifference = Math.floor((today - transactionDate) / (24 * 60 * 60 * 1000));
    
          // Check if today is one of the recurring dates
          if (daysDifference % repeatDays === 0 && today >= transactionDate) {
            notifications.push(transaction);
          }
        } else {
          const dueDate = new Date(transaction.dueDate);
    
          if (today.getDate() === dueDate.getDate()) {
            notifications.push(transaction);
          }
        }
      }
    }    
    hasNotificationUpdate(true);
    setDataForNotification(notifications);
    // console.log(notifications);
  };

  return (
    <>
      <div
        className={`${theme === "light" ? "full-heightl" : "full-heightd"}`}
        style={{
          overflowX: "hidden",
          height: "200px",
        }}
      >
        <Navbar dataForNotification={dataForNotification} />
        <Sidebar />
        <div className="container-fluid" style={{ paddingTop: "4.5%" }}>
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
                    className="hides"
                    style={{
                      width: "100%",
                      paddingLeft: "1.5%",
                      marginLeft: "12%",
                    }}
                  >
                    <SearchBar
                      propsData={propsData}
                      handleAddMember={handleAddMember}
                    />
                  </div>
                </div>
                <div className="container mt-3">
                  <div className="row">
                    <div className="col-12 mb-3 mb-lg-5">
                      <div
                        className="overflow-hidden card table-nowrap table-card1"
                        style={{
                          color: `${theme === "light" ? "black" : "#fff"}`,
                          background: `${
                            theme === "light" ? "white" : "#333d82"
                          }`,
                        }}
                      >
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
                          <h5 className="mb-0">
                            <strong>Friends</strong>
                          </h5>
                        </div>
                        <div className="table-responsive">
                          <table className="table mb-0">
                            {/* <div className="container mx-2"> */}
                            {friends.length === 0 && (
                              <div
                                style={{
                                  height: "300px",
                                  justifyContent: "center",
                                  textAlign: "center",
                                  paddingTop: "30%",
                                  fontSize: "30px",
                                  color: `${
                                    theme === "light"
                                      ? "rgb(102, 103, 115)"
                                      : "#ffffff4f"
                                  }`,
                                }}
                              >
                                <strong>No Friends to show...</strong>
                              </div>
                            )}
                            {/* </div> */}
                            <tbody>
                              {friends.map((friend) => (
                                <tr className="align-middle" key={friend._id}>
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
                                      <button
                                        onClick={(e) =>
                                          handleClickDelete(e, friend._id)
                                        }
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
