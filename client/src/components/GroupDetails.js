import React, { useContext, useEffect, useState, useRef } from "react";
import groupContext from "../context/groups/groupContext.js";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import themeContext from "../context/theme/themeContext";
import { SearchBar } from "./SearchBar.js";
import Navbar from "./Navbar.js";
import Sidebar from "./Sidebar.js";
import "../css/GroupDetails.css";

const GroupDetails = () => {
  const { id } = useParams();
  const context = useContext(groupContext);
   const context1 = useContext(themeContext);
   const { theme } = context1;
  const {
    getGroup,
    addGroupMember,
    deleteGroupMember,
    getGroupTransactions,
    AddGroupTransaction,
  } = context;
  const [group, setGroup] = useState({});
  const [member, setMember] = useState({ username: "" });
  const [memberChanged, setMemberChanged] = useState(false); // State to track member changes
  const [selectedMembers, setSelectedMembers] = useState([]); // State to store selected members
  const [transactionMade, setTransactionMade] = useState(false);
  const [transaction, setTransaction] = useState({ cost: 0, type: "credit" }); // State for transaction details
  const [finalAns, setFinalAns] = useState([]);
  const ref = useRef(null);
  const refClose = useRef(null);

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

        for (const DbTransaction of groupDbTransactions) {
          const { groupMember, userId, price } = DbTransaction; // Destructure each transaction
          data.push([groupMember, userId, price]); // Push the destructured data as an array
        }
        simplifyDebts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, memberChanged, transactionMade]);

  const handleClickAdd = (e) => {
    e.preventDefault();
    if (member.username.length !== 0) {
      addGroupMember(id, member.username);
      setMemberChanged(true); // Member has been added, trigger useEffect
    }
    setMember({ username: "" });
  };

  const handleClickDelete = (e) => {
    e.preventDefault();
    if (member.username.length !== 0) {
      deleteGroupMember(id, member.username);
      setMemberChanged(true); // Member has been deleted, trigger useEffect
    }
    setMember({ username: "" });
  };

  const handleToggleMember = (username) => {
    if (selectedMembers.includes(username)) {
      setSelectedMembers(
        selectedMembers.filter((member) => member !== username)
      );
    } else {
      setSelectedMembers([...selectedMembers, username]);
    }
  };

  const handleTransactionCostChange = (e) => {
    setTransaction({ ...transaction, cost: e.target.value });
  };

  const handleTransactionTypeChange = (e) => {
    setTransaction({ ...transaction, type: e.target.value });
  };

  const renderMemberCheckboxes = () => {
    return group.users?.map((user, index) => (
      <div key={index} className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id={`checkbox-${index}`}
          checked={selectedMembers.includes(user)}
          onChange={() => handleToggleMember(user)}
        />
        <label className="form-check-label" htmlFor={`checkbox-${index}`}>
          {user}
        </label>
      </div>
    ));
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
      const [receiver, giver, amount] = transaction; // Note the order of receiver and giver
      if (!groupedTransactions[giver]) {
        groupedTransactions[giver] = [];
      }
      groupedTransactions[giver].push({ receiver, amount });
    });
    setFinalAns(groupedTransactions);
  }

  const handleAddTransaction = async () => {
    const price = transaction.cost / selectedMembers.length;
    for (const groupMember of selectedMembers) {
      if (transaction.type == "debit") {
        await AddGroupTransaction(groupMember, price, id);
      } else {
        await AddGroupTransaction(groupMember, -price, id);
      }
    }
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
      >
        <Navbar />
        <Sidebar />
        <div className="container">
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
            <div className="col-6 col-md-4 .suggestion">
              <SearchBar />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 col-sm-6 right">
              <div
                className={`card fixed-members ${
                  theme === "light" ? "card-membersl" : "card-membersd"
                }`}
              >
                <h4
                  className=" mt-3 mb-3"
                  style={{ color: `${theme === "light" ? "black" : "#fff"}` }}
                >
                  Group Members
                </h4>
                <div className="widget-wrap wrap1 wrap-for-members">
                  <ul>
                    <div
                      className={`${theme === "light" ? "topl" : "topd"} ${
                        theme === "light" ? "speech1l" : "speech1d"
                      }`}
                    >
                      {group.users?.map((user) => (
                        <div className="userList">
                          <li
                            className={`${
                              theme === "light" ? "singleUserl" : "singleUserd"
                            }`}
                            key={user}
                          >
                            {user}
                            <button
                              type="submit"
                              onClick={handleClickDelete}
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

                            {/* <span className="tooltip">Remove User</span> */}
                          </li>
                        </div>
                      ))}
                    </div>
                  </ul>
                </div>
              </div>
            </div>

            <div
              className={`card fixed-description ${
                theme === "light" ? "card-squarel" : "card-squared"
              }`}
            >
              <h4
                style={{
                  color: `${theme === "light" ? "black" : "#fff"}`,
                  paddingLeft: 150,
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
                >
                  {group.description}
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
            <div className="modal-content">
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
                      Group Member to Include
                    </label>
                    <ul className="list-group">{renderMemberCheckboxes()}</ul>
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
                >
                  Add Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          {Object.keys(finalAns).map((giver) => (
            <div key={giver}>
              <h2>{giver} owes:</h2>
              <ul>
                {finalAns[giver].map((transaction, index) => (
                  <li key={index}>
                    {transaction.receiver} - {transaction.amount}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* arsh bhai ka code start */}
        {/* <div className="row">
          <div className="col-md-8">
            <div className="group-details">
              <h1>{group.name}</h1>
              <p>{group.description}</p>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={member.username}
                    aria-describedby="emailHelp"
                    onChange={(e) =>
                      setMember({ ...member, username: e.target.value })
                    }
                  />
                </div>
                <button
                  type="submit"
                  onClick={handleClickAdd}
                  className="btn btn-primary"
                >
                  Add Member
                </button>
                <button
                  type="submit"
                  onClick={handleClickDelete}
                  className="btn btn-primary"
                >
                  Delete Member
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <h2>Group Members</h2>
            <ul>
              {group.users?.map((user) => (
                <li key={user}>{user}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <h2>Add Group Expense</h2>
            <form>
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
              <h2>Group Member to Include</h2>
              <ul className="list-group">{renderMemberCheckboxes()}</ul>
              <button
                type="button"
                onClick={handleAddTransaction}
                className="btn btn-primary"
              >
                Add Transaction
              </button>
            </form>
            <div>
              {Object.keys(finalAns).map((giver) => (
                <div key={giver}>
                  <h2>{giver} owes:</h2>
                  <ul>
                    {finalAns[giver].map((transaction, index) => (
                      <li key={index}>
                        {transaction.receiver} - {transaction.amount}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div> */}
        {/* arsh bhai ka code end */}
      </div>
    </>
  );
};

export default GroupDetails;
