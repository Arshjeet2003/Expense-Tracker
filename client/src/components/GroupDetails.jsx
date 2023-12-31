import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import groupContext from "../context/groups/groupContext.js";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import themeContext from "../context/theme/themeContext.js";
import { SearchBar } from "./SearchBar.jsx";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import "../css/GroupDetails.css";
import authContext from "../context/auth/authContext.js";

const GroupDetails = () => {
  const { id } = useParams();

  const context = useContext(groupContext);
  const {
    getGroup,
    addGroupMember,
    deleteGroupMember,
    getGroupTransactions,
    AddGroupTransaction,
  } = context;

  const context1 = useContext(themeContext);
  const { theme } = context1;

  const context2 = useContext(authContext);
  const { getUser } = context2;

  const [currentValue, setCurrentValue] = useState("INR");

  const [group, setGroup] = useState({});

  const [member, setMember] = useState({ username: "" });

  const [memberChanged, setMemberChanged] = useState(false); // State to track member changes

  const [selectedMembers, setSelectedMembers] = useState([]); // State to store selected members
  const [selectedMembersWithNumbers, setSelectedMembersWithNumbers] = useState(
    []
  );

  const [transactionMade, setTransactionMade] = useState(false);

  const [transaction, setTransaction] = useState({ cost: 0, type: "credit" }); // State for transaction details

  const [finalAns, setFinalAns] = useState([]);

  const ref = useRef(null);

  const refClose = useRef(null);

  const [propsData, setPropsData] = useState({ value: id });

  // useEffect(() => {
  //   const fetchExchangeRate = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://open.er-api.com/v6/latest/${previousValue}`
  //       ); // exchangerates api for the
  //       const rate = response.data.rates[currentValue];
  //       setExchangeRate(rate);
  //     } catch (error) {
  //       console.error("Error fetching exchange rate:", error);
  //     }
  //   };

  //   fetchExchangeRate();
  // }, [previousValue, currentValue]);

  // console.log(exchangeRate);

  // console.log(amount1);

  // useEffect(() => {
  //   if (exchangeRate !== undefined) {
  //     setConvertedAmount((amount1 * exchangeRate).toFixed(2));
  //   }
  // }, [amount1, exchangeRate]);

  useEffect(() => {
    // Fetch group data whenever a member is added or deleted
    getGroup(id)
      .then((groupData) => {
        setGroup(groupData);
      })
      .catch((error) => {
        console.error(error);
      });

    setMemberChanged(false); // Reset memberChanged state
    setTransactionMade(false);
    getGroupTransactions(id)
      .then((groupDbTransactions) => {
        const data = []; // Create an array to store the data
        const fetchExchangeRate = async () => {
          try {
            const user = await getUser();
            setCurrentValue(user.currencyType);

            for (const DbTransaction of groupDbTransactions) {
              const { groupMember, userId, price, currencyTypeGroup } =
                DbTransaction; // Destructure each transaction
              try {
                const response = await axios.get(
                  `https://open.er-api.com/v6/latest/${currencyTypeGroup}`
                ); // exchangerates api for the
                const rate = response.data.rates[user.currencyType];
                if (price > 0) {
                  data.push([groupMember, userId, price * rate]); // Push the destructured data as an array
                } else {
                  data.push([userId, groupMember, -price * rate]); //Giver,Receiver,Amount
                }
              } catch (error) {
                console.error("Error fetching exchange rate:", error);
              }
            }
            simplifyDebts(data);
          } catch (error) {
            console.error("Error fetching exchange rate:", error);
          }
        };
        fetchExchangeRate();
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, memberChanged, transactionMade, getGroup, getGroupTransactions]);

  const handleClickDelete = (e, username) => {
    e.preventDefault();
    if (username.length !== 0) {
      deleteGroupMember(id, username);
      // Assuming setMemberChanged triggers useEffect correctly
      setMemberChanged(true);
    }
    setMember({ username: "" });
  };

  const handleAddMember = (value) => {
    setMemberChanged(value);
  };

  const handleToggleMember = (username) => {
    const memberIndex = selectedMembersWithNumbers.findIndex(
      (member) => member.username === username
    );

    if (memberIndex !== -1) {
      // If the user is already selected, remove them
      setSelectedMembersWithNumbers((prevMembers) => [
        ...prevMembers.slice(0, memberIndex),
        ...prevMembers.slice(memberIndex + 1),
      ]);
    } else {
      // If the user is not selected, add them with a default number (you can set the number based on your requirement)
      setSelectedMembersWithNumbers((prevMembers) => [
        ...prevMembers,
        { username, number: 0 }, // You can set a default number or initialize it based on your requirements
      ]);
    }
  };

  // Rendering checkboxes
  const renderMemberCheckboxes = () => {
    return group.users?.map((user, index) => (
      <div key={index} className="form-check mt-2" >
        <input
          type="checkbox"
          className="form-check-input"
          id={`checkbox-${index}`}
          checked={selectedMembersWithNumbers.some(
            (member) => member.username === user
          )}
          onChange={() => handleToggleMember(user)}
        />
        <label className="form-check-label" htmlFor={`checkbox-${index}`} style={{display:"flex"}}>
          {user}
          {/* Input field for the associated number */}

          <div className="mb-3">
            
            <input
              type="number"
              className="form-control mx-4"
              placeholder="%"
              style={{
                width: "30%",
              }}
              value={
                selectedMembersWithNumbers.find(
                  (member) => member.username === user
                )?.number
                
              }
              onChange={(e) => handleInputChange(e, user)}
            />
          </div>
        </label>
      </div>
    ));
  };

  const handleInputChange = (e, username) => {
    const inputValue = parseInt(e.target.value, 10) || 0;
    setSelectedMembersWithNumbers((prevMembers) => {
      const updatedMembers = [...prevMembers];
      const memberIndex = updatedMembers.findIndex(
        (member) => member.username === username
      );
      if (memberIndex !== -1) {
        updatedMembers[memberIndex].number = inputValue;
      }
      return updatedMembers;
    });
  };

  const handleTransactionCostChange = (e) => {
    setTransaction({ ...transaction, cost: e.target.value });
  };

  const handleTransactionTypeChange = (e) => {
    setTransaction({ ...transaction, type: e.target.value });
  };

  const handleTransactionCurrencyTypeGroupChange = (e) => {
    setTransaction({ ...transaction, currencyTypeGroup: e.target.value });
  };

  //Function to simplify debts
  function simplifyDebts(transactions) {
    const total = new Map();
    const credit = [];
    const debit = [];

    for (const transaction of transactions) {
      const [giver, receiver, amount] = transaction;
      total.set(giver, (total.get(giver) || 0) - amount);
      total.set(receiver, (total.get(receiver) || 0) + amount);
    }

    for (const [name, amount] of total.entries()) {
      if (amount > 0) {
        credit.push([-amount, name]);
      } else if (amount < 0) {
        debit.push([amount, name]);
      }
    }

    credit.sort((a, b) => a[0] - b[0]);
    debit.sort((a, b) => a[0] - b[0]);

    const answer = [];

    while (credit.length > 0 && debit.length > 0) {
      const [creditValue, creditName] = credit.shift();
      const [debitValue, debitName] = debit.shift();

      if (creditValue < debitValue) {
        const amountLeft = creditValue - debitValue;
        answer.push([debitName, creditName, -debitValue]);
        credit.push([amountLeft, creditName]);
      } else if (debitValue < creditValue) {
        const amountLeft = debitValue - creditValue;
        answer.push([debitName, creditName, -creditValue]);
        debit.push([amountLeft, debitName]);
      } else {
        answer.push([debitName, creditName, -creditValue]);
      }
    }
    const groupedTransactions = {};

    answer.forEach((transaction) => {
      const [giver, receiver, amount] = transaction; // Note the order of receiver and giver
      if (!groupedTransactions[giver]) {
        groupedTransactions[giver] = [];
      }
      groupedTransactions[giver].push({ receiver, amount });
    });
    setFinalAns(groupedTransactions);
  }

  const handleAddTransaction = async () => {
    const totalCost = transaction.cost;

    selectedMembersWithNumbers.forEach(async (memberData) => {
      const { username, number } = memberData;

      // Calculate the amount for each member based on the percentage of the total cost
      const amount = (totalCost * number) / 100;

      try {
        if (transaction.type === "debit") {
          await AddGroupTransaction(
            username,
            amount,
            id,
            transaction.currencyTypeGroup
          );
        } else {
          await AddGroupTransaction(
            username,
            -amount,
            id,
            transaction.currencyTypeGroup
          );
        }
      } catch (error) {
        console.error(`Error adding transaction for ${username}:`, error);
      }
    });

    setTransactionMade(true);
  };

  const AddGroupTransaction12 = (e) => {
    e.preventDefault();
    ref.current.click();
  };

  return (
    <>
      <div
        className={`${
          theme === "light" ? "complete-decriptionl" : "complete-decriptiond"
        }`}
        style={{ position: "relative" }}
      >
        <Navbar />
        <Sidebar />
        <div className="container" style={{ paddingTop: "5%" }}>
          <div className="row">
            <div
              className={`col-6 col-md-4 ${
                theme === "light" ? "headingl" : "headingd"
              }`}
            >
              <i
                className="material-symbols-outlined"
                style={{
                  color: `${theme === "light" ? "#4d4dff" : "#fadb69"}`,
                  paddingLeft: "4%",
                }}
              >
                groups
              </i>
              <h1
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  color: `${theme === "light" ? "black" : "#fff"}`,
                }}
              >
                {group.name}
              </h1>
            </div>
            <div className="col-6 col-md-4 upper-middle-box">
              <div className="button-box-detail">
                <button
                  type="submit"
                  onClick={AddGroupTransaction12}
                  className={`btn transparent ${
                    theme === "light" ? "bgroupdetailsl" : "bgroupdetailsd"
                  }`}
                  id="Add-Group-Transaction"
                  style={{ marginRight: 150 }}
                >
                  Add Group Expenses
                </button>
              </div>
            </div>
            <div
              className="col-6 col-md-4 .suggestion hides"
              style={{
                zIndex: "2",
                position: "fixed",
                marginLeft: "60%",
              }}
            >
              <SearchBar
                propsData={propsData}
                handleAddMember={handleAddMember}
              />
            </div>
          </div>
          <div
            className="container"
            style={{
              minHeight: "100vh",
              zIndex: "1",
              position: "relative",
            }}
          >
            <div className="row">
              <div className="col-6">
                {Object.keys(finalAns).map((giver) => (
                  <div className="container" key={giver}>
                    <div className="row">
                      <div className="col-12 mb-3 mb-lg-5">
                        <div className="overflow-hidden card table-nowrap table-card">
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
                            <h5 className="mb-0">{giver} owes:</h5>
                          </div>
                          <div className="table-responsive">
                            <table className="table mb-0">
                              <thead className="small text-uppercase bg-body text-muted">
                                <tr>
                                  <th
                                    style={{
                                      color: `${
                                        theme === "light" ? "black" : "#fff"
                                      }`,
                                      background: `${
                                        theme === "light" ? "white" : "#333d82"
                                      }`,
                                    }}
                                  >
                                    Name
                                  </th>
                                  <th
                                    style={{
                                      color: `${
                                        theme === "light" ? "black" : "#fff"
                                      }`,
                                      background: `${
                                        theme === "light" ? "white" : "#333d82"
                                      }`,
                                    }}
                                  >
                                    Amount
                                  </th>
                                  <th
                                    style={{
                                      color: `${
                                        theme === "light" ? "black" : "#fff"
                                      }`,
                                      background: `${
                                        theme === "light" ? "white" : "#333d82"
                                      }`,
                                    }}
                                    className="text-end"
                                  />
                                </tr>
                              </thead>
                              <tbody>
                                {finalAns[giver].map((transaction, index) => (
                                  <tr className="align-middle" key={index}>
                                    <td
                                      style={{
                                        color: `${
                                          theme === "light" ? "black" : "#fff"
                                        }`,
                                        background: `${
                                          theme === "light"
                                            ? "white"
                                            : "#333d82"
                                        }`,
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
                                            {transaction.receiver}
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      style={{
                                        color: `${
                                          theme === "light" ? "black" : "#fff"
                                        }`,
                                        background: `${
                                          theme === "light"
                                            ? "white"
                                            : "#333d82"
                                        }`,
                                      }}
                                    >
                                      {transaction?.amount?.toFixed(2)}
                                    </td>
                                    <td
                                      className="text-end"
                                      style={{
                                        color: `${
                                          theme === "light" ? "black" : "#fff"
                                        }`,
                                        background: `${
                                          theme === "light"
                                            ? "white"
                                            : "#333d82"
                                        }`,
                                      }}
                                    >
                                      <div className="drodown">
                                        <strong>
                                          <p
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
                                            {currentValue}
                                          </p>
                                        </strong>
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
                ))}
              </div>
              <div className="col-6">
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div
                    className={`fixed-description hides ${
                      theme === "light" ? "card-squarel" : "card-squared"
                    }`}
                  >
                    <h4
                      style={{
                        color: `${theme === "light" ? "black" : "#fff"}`,
                        textAlign: "center",
                      }}
                      className=" mt-3 mb-3"
                    >
                      Group Description
                    </h4>
                    <div className="widget-wrap wrap2">
                      <div
                        className={`${theme === "light" ? "topl" : "topd"} ${
                          theme === "light" ? "speechl" : "speechd"
                        }`}
                        style={{
                          overflow: "auto",
                          maxHeight: "150px",
                        }}
                      >
                        {group.description}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`fixed-members hides ${
                      theme === "light" ? "card-membersl" : "card-membersd"
                    }`}
                  >
                    <h4
                      className="mt-3 mb-3"
                      style={{
                        color: `${theme === "light" ? "black" : "#fff"}`,
                        textAlign: "center",
                      }}
                    >
                      Group Members
                    </h4>
                    <div className="widget-wrap wrap1 wrap-for-members">
                      <ul
                        className={`topl ${
                          theme === "light" ? "speech1l" : "speech1d"
                        }`}
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          overflow: "auto",
                          maxHeight: "150px",
                        }}
                      >
                        {group.users?.map((user) => (
                          <div
                            key={user}
                            style={{ maxWidth: "320px", margin: "5px" }}
                          >
                            <li
                              className={`${
                                theme === "light"
                                  ? "singleUserl"
                                  : "singleUserd"
                              }`}
                            >
                              {user}
                              <button
                                type="submit"
                                onClick={(e) => handleClickDelete(e, user)}
                                className={`${
                                  theme === "light"
                                    ? "deleteUserl"
                                    : "deleteUserd"
                                }`}
                              >
                                <i
                                  className={`material-symbols-outlined ${
                                    theme === "light"
                                      ? "remove-userl"
                                      : "remove-userd"
                                  }`}
                                >
                                  person_remove
                                </i>
                              </button>
                            </li>
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary d-none"
          ref={ref}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Update Group
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
              className="modal-content"
              style={{
                borderRadius: "30px",
                border: `${
                  theme === "light" ? "5px solid #4d4dff" : "5px solid #fadb69"
                }`,
                background: `${theme === "light" ? "#eee" : "#25273f"}`,
                color: `${theme === "light" ? "black" : "#fff"}`,
              }}
            >
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Group Transaction
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="transactionCost" className="form-label">
                      Transaction Cost
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="transactionCost"
                      name="transactionCost"
                      value={transaction.cost}
                      onChange={handleTransactionCostChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="transactionCost" className="form-label">
                      Currency
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="transactioncurrencyTypeGroup"
                      name="transactioncurrencyTypeGroup"
                      value={transaction.currencyTypeGroup}
                      onChange={handleTransactionCurrencyTypeGroupChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="transactionType" className="form-label">
                      Transaction Type
                    </label>
                    <select
                      className="form-select"
                      id="transactionType"
                      name="transactionType"
                      value={transaction.type}
                      onChange={handleTransactionTypeChange}
                    >
                      <option value="credit">Credit</option>
                      <option value="debit">Debit</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="transactionMembers" className="form-label">
                      <h5>Group Member to Include</h5>
                    </label>
                    <div style={{ overflowY: "auto", maxHeight: "40vh",overflowX:"hidden"}}>
                      <ul className="list-group">{renderMemberCheckboxes()}</ul>
                    </div>
                  </div>
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
                  onClick={handleAddTransaction}
                  className="btn btn-primary"
                  style={{
                    background: `${theme === "light" ? "#4d4dff" : "#333d82"}`,
                  }}
                >
                  Add Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupDetails;
