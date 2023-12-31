import React, { useRef, useContext, useEffect, useState } from "react";
import "../css/Goals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import themeContext from "../context/theme/themeContext";
import financialGoalsContext from "../context/financialGoal/financialGoalContext.js";
import transactionContext from "../context/transactions/transactionContext.js";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Scope from "../images/Scope.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import "../css/Groupcard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faTrash } from "@fortawesome/free-solid-svg-icons";

const Goals = () => {
   const formatDate = (dateString) => {
     const options = { year: "numeric", month: "long", day: "numeric" };
     return new Date(dateString).toLocaleDateString(undefined, options);
   };
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
  const ref = useRef(null);
  const refClose = useRef(null);

  const [goals, setGoals] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [updatedGoals, setUpdatedGoals] = useState([]);

  const context = useContext(financialGoalsContext);
  const { addFinancialGoals, getFinancialGoals, deleteFinancialGoal } = context;

  const context1 = useContext(themeContext);
  const { theme } = context1;

  const context2 = useContext(transactionContext);
  const { getUserTransactions } = context2;

  const [dataReceived, setDataReceived] = useState(false);
  const [goalAdded, setGoalAdded] = useState(false);
  const [goalDeleted, setGoalDeleted] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await getUserTransactions("");

        if (isMounted) {
          setTransactionData(data);
        }

        const result = await getFinancialGoals("");

        if (isMounted) {
          setGoals(result.financialgoals);
          calcSavings();
          setDataReceived(true);
          if (goalDeleted) {
            setGoalDeleted(false);
          }
          if(goalAdded){
            setGoalAdded(false);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle the error (e.g., show an error message)
      }
    };

    fetchData();
    

    return () => {
      // Set the mounted flag to false when the component is unmounted
      isMounted = false;
    };
  }, [dataReceived,goalAdded,goalDeleted]);

  useEffect(() => {

  },[goalAdded,goalDeleted])

  const isTransactionWithinGoalDates = (
    transactionDate,
    goalStartDate,
    goalEndDate
  ) => {
    const transactionTime = transactionDate.getTime();
    const goalStartTime = new Date(goalStartDate).getTime();
    const goalEndTime = new Date(goalEndDate).getTime();

    return transactionTime >= goalStartTime && transactionTime <= goalEndTime;
  };

  const calcSavings = () => {
    if (transactionData.transactions) {
      const updatedGoals = goals.map((goal) => {
        let totalSavings = 0;
        for (const transaction of transactionData.transactions) {
          const transactionDate = new Date(transaction.date);
          if (isTransactionWithinGoalDates(transactionDate, goal.startDate, goal.endDate)) {
            if(transaction.type==="Expense"){
              totalSavings -= transaction.price;
            }
            else{
              totalSavings += transaction.price;
            }
          }
        }

        return {
          _id: goal._id,
          name: goal.name,
          description: goal.description,
          startDate: goal.startDate,
          endDate: goal.endDate,
          savingsGoal: goal.savingsGoal,
          totalSavingsTillNow: totalSavings,
        };
      });
      setUpdatedGoals(updatedGoals);
      setDataReceived(true);
    }
  };

  const handleDelete = async (e,id) => {
    e.preventDefault();
    await deleteFinancialGoal(id);
    setGoalDeleted(true);
  }

  const createGoal = (e) => {
    e.preventDefault();
    ref.current.click();
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sdate: Date,
    edate: Date,
    savingsGoal: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addFinancialGoals(formData.name,formData.description,formData.sdate,formData.edate,Number(formData.savingsGoal));
    setGoalAdded(true);

    // console.log(formData);
  };

  return (
    <div
      style={{
        background: `${theme === "light" ? "#eee" : "#25273f"}`,
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Sidebar />
      <div className="container mt-5 mb-3" style={{ paddingLeft: "17vh" }}>
        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <button
              type="submit"
              onClick={createGoal}
              className={`btn transparent ${
                theme === "light" ? "bgroupl" : "bgroupd"
              }`}
              id="Create-group"
              style={{ marginRight: 150 }}
            >
              Make a Goal
            </button>
          </div>
        </div>

        {updatedGoals?.map((goal) => (
          <div className="row " key={goal._id} data-aos="fade-right">
            <div className="col">
              <div
                className="card page carddl p-3 mb-2 mt-4"
                style={{
                  background: `${theme === "light" ? "#fff" : "#333d82"}`,
                  border: `${
                    theme === "light"
                      ? "5px solid #4d4dff"
                      : "5px solid #fadb69"
                  }`,
                }}
              >
                {/* ... (rest of your goal display code) */}
                <div className="row ms-2">
                  <div className="col-md-6">
                    <div
                      className=""
                      style={{
                        color: `${theme === "light" ? "black" : "#fff"}`,
                      }}
                    >
                      <h4>
                        <strong>{goal.name}</strong>
                      </h4>
                    </div>
                    <div className="row ms-1 my-2">
                      <div
                        className="col-md-6"
                        style={{
                          color: `${theme === "light" ? "black" : "#fff"}`,
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faCalendarDays}
                          style={{
                            color: `${
                              theme === "light" ? "#4d4dff" : "#9f8e23"
                            }`,
                            marginRight: "10px",
                          }}
                        />
                        Start Date :
                        <span
                          style={{
                            fontSize: "15px",
                            marginLeft: "5px",
                            color: `${
                              theme === "light"
                                ? "rgb(102, 103, 115)"
                                : "rgba(255, 255, 255, 0.596)"
                            }`,
                          }}
                        >
                          <strong>{formatDate(goal.startDate)}</strong>
                        </span>
                      </div>
                      <div
                        className="col-md-6"
                        style={{
                          color: `${theme === "light" ? "black" : "#fff"}`,
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faCalendarDays}
                          style={{
                            color: `${
                              theme === "light" ? "#4d4dff" : "#9f8e23"
                            }`,
                            marginRight: "10px",
                          }}
                        />
                        End Date :
                        <span
                          style={{
                            fontSize: "15px",
                            marginLeft: "5px",
                            color: `${
                              theme === "light"
                                ? "rgb(102, 103, 115)"
                                : "rgba(255, 255, 255, 0.596)"
                            }`,
                          }}
                        >
                          <strong>{formatDate(goal.endDate)}</strong>
                        </span>
                      </div>
                    </div>
                    <div
                      className="desc my-4 des"
                      style={{
                        color: `${theme === "light" ? "black" : "#fff"}`,
                      }}
                    >
                      {goal.description}
                    </div>
                  </div>
                  <div className="col-md-3 mt-5 rightMost">
                    <div
                      className="this"
                      style={{
                        color: `${theme === "light" ? "black" : "#fff"}`,
                      }}
                    >
                      <div className="daysLeft mx-3" style={{ fontSize: 60 }}>
                        {(() => {
                          const startDate = new Date(goal.startDate);
                          const endDate = new Date(goal.endDate);
                          const today = new Date();

                          let daysRemaining;
                          if (startDate > today) {
                            // Calculate days remaining from endDate to startDate
                            daysRemaining = Math.ceil(
                              (endDate - startDate) / (1000 * 60 * 60 * 24)
                            );
                          } else {
                            // Calculate days remaining from endDate to today
                            daysRemaining = Math.ceil(
                              (endDate - today) / (1000 * 60 * 60 * 24)
                            );
                          }

                          return daysRemaining;
                        })()}
                        <span
                          style={{
                            fontSize: "17px",
                            //   paddingTop: "17%",
                            marginRight: "6px",
                          }}
                        >
                          Days Left
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <img
                      className="hides"
                      src={Scope}
                      alt="scope"
                      style={{ height: "30vh" }}
                    />
                  </div>
                  <div className="mt-1 ms-1">
                    <div className="col-md-12 progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${
                            ((goal.totalSavingsTillNow * 1.0) /
                              goal.savingsGoal) *
                            100
                          }%`,
                        }}
                        aria-valuenow={50}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <div className="mt-3">
                      <div className="row">
                        <div className="col-md-11">
                          <span className="text1" style={{ fontSize: "16px" }}>
                            <span style={{ color: "green" }}>
                              {goal.totalSavingsTillNow}
                            </span>
                            <span className="text2">
                              {" "}
                              <span>
                                <span
                                  style={{
                                    paddingLeft: "4px",
                                    paddingRight: "4px",
                                  }}
                                >
                                  of
                                </span>{" "}
                                <strong
                                  style={{ color: "rgba(255, 0, 0, 0.726)" }}
                                >{` ${goal.savingsGoal}`}</strong>
                              </span>
                            </span>
                          </span>
                        </div>
                        <div className="col-md-1">
                          <button
                            style={{ border: "none", background: "none" }}
                            // onClick={}
                          >
                            <FontAwesomeIcon
                              onClick={(e) => handleDelete(e, goal._id)}
                              style={{
                                color: "rgba(255, 0, 0, 0.726)",
                                fontSize: "22px",
                                marginLeft: "60%",
                              }}
                              icon={faTrash}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* modal starts */}

      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Update Goal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className={`modal-content ${
              theme === "light" ? "popUpBody1" : "popUpBodyd"
            }`}
          >
            <div className="modal-header" style={{ paddingLeft: "40%" }}>
              <h5 className="modal-title" id="exampleModalLabel">
                Make a Goal
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="ename" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    id="ename"
                    name="name"
                    aria-describedby="emailHelp"
                    onChange={handleInputChange}
                    value={formData.name}
                    style={{ textTransform: "uppercase" }}
                  />
                </div>
                <div className="mb-3" style={{ paddingLeft: 10 }}>
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    rows="5"
                    cols="25"
                    className="form-control"
                    required
                    id="edescription"
                    name="description"
                    onChange={handleInputChange}
                    value={formData.description}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="sdate" className="form-label">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    id="sdate"
                    name="sdate"
                    aria-describedby="emailHelp"
                    onChange={handleInputChange}
                    value={formData.sdate}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="edate" className="form-label">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    id="edate"
                    name="edate"
                    aria-describedby="emailHelp"
                    onChange={handleInputChange}
                    value={formData.edate}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ename" className="form-label">
                    Savings Goal
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    id="savingsGoal"
                    name="savingsGoal"
                    aria-describedby="emailHelp"
                    onChange={handleInputChange}
                    value={formData.savingsGoal}
                  />
                </div>

                <button
                  type="submit"
                  // onClick={handleClickAdd}
                  className="btn btn-primary"
                  style={{
                    background: `${theme === "light" ? "#4d4dff" : "#333d82"}`,
                  }}
                >
                  Add Goal
                </button>
              </form>
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                // onClick={handleClickAdd}
                className="btn btn-primary"
                style={{
                  background: `${theme === "light" ? "#4d4dff" : "#333d82"}`,
                }}
              >
                Add Goal
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* modal ends */}
    </div>
  );
};

export default Goals;
