import React, { useRef, useContext, useEffect, useState } from "react";
import "../css/Goals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import themeContext from "../context/theme/themeContext";
import financialGoalsContext from "../context/financialGoal/financialGoalContext.js"
import transactionContext from "../context/transactions/transactionContext.js";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Conversion from "../images/Conversion.svg";

const Goals = () => {
  const ref = useRef(null);
  const refClose = useRef(null);

  const [goals,setGoals] = useState([]);
  const [transactionData,setTransactionData] = useState([]);
  const [updatedGoals, setUpdatedGoals] = useState([]);

  const context = useContext(financialGoalsContext);
  const { addFinancialGoals,getFinancialGoals,deleteFinancialGoal } = context;

  const context1 = useContext(themeContext);
  const { theme } = context1;

  const context2 = useContext(transactionContext);
  const { getUserTransactions } = context2;

  const [dataReceive,setDataReceived] = useState(false);
  const [goalAdded,setGoalAdded] = useState(false);


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
  }, [dataReceive,goalAdded]);

  const isTransactionWithinGoalDates = (transactionDate, goalStartDate, goalEndDate) => {
  
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
            totalSavings += transaction.price;
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

  const createGoal = (e) => {
    e.preventDefault();
    ref.current.click();
  };

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sdate: Date,
    edate: Date,
    savingsGoal: ''
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
  const handleSubmit = (e) => {
    e.preventDefault();
    addFinancialGoals(formData.name,formData.description,formData.sdate,formData.edate,Number(formData.savingsGoal));
    setGoalAdded(true);

    // console.log(formData);
  };

  return (
    <div>
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
        <div className="row" key={goal._id}>
          <div className="col">
            <div className="card carddl p-3 mb-2">
              {/* ... (rest of your goal display code) */}
              <div className="row ms-2">
                <div className="col-md-6">
                  <div className="descc">
                    <h5>{goal.name}</h5>
                  </div>
                  <div className="desc">{goal.description}</div>
                </div>
                <div className="col-md-3 rightMost">
                  <div
                    className="this"
                    style={{ display: "flex", marginTop: "7%" }}
                  >
                    <div className="daysLeft mx-3" style={{ fontSize: 60 }}>
                    {(() => {
                      const startDate = new Date(goal.startDate);
                      const endDate = new Date(goal.endDate);
                      const today = new Date();

                      const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

                      return daysRemaining;
                    })()}
                    </div>
                    <div
                    className="left"
                    style={{
                      paddingTop: "8%",
                      paddingLeft: "2%",
                    }}
                  >
                    Days Left
                  </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <img src="" alt="" />
                </div>
                <div className="mt-1 ms-3">
                  <div className="col-md-12 progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "60%" }}
                      aria-valuenow={50}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <div className="mt-3">
                    <span className="text1">
                      {goal.totalSavingsTillNow} 
                      <span className="text2">{` ${goal.savingsGoal}`}</span>
                    </span>
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                // onClick={handleClickAdd}
                className="btn btn-primary"
                style={{
                  background: `${theme === "light" ? "#4d4dff" : "#333d82"}`,
                }}
              >
                Add Goal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* modal ends */}
    </div>
  );
};

export default Goals;
