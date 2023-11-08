import React, { useContext, useEffect, useState } from 'react';
import groupContext from '../context/groups/groupContext.js';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import authContext from '../context/auth/authContext.js';

const GroupDetails = () => {
    const { id } = useParams();
    const context = useContext(groupContext);
    const context1 = useContext(authContext);
    const { getGroup, addGroupMember, deleteGroupMember, getGroupTransactions, AddGroupTransaction } = context;
    const { getUserId } = context1;
    const [group, setGroup] = useState({});
    const [member, setMember] = useState({ username: "" });
    const [memberChanged, setMemberChanged] = useState(false); // State to track member changes
    const [selectedMembers, setSelectedMembers] = useState([]); // State to store selected members
    const [transactionMade,setTransactionMade] = useState(false);
    const [transaction, setTransaction] = useState({ cost: 0, type: "credit" }); // State for transaction details
    const [finalAns,setFinalAns] = useState([]);
    
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
            getGroupTransactions(id).then((groupDbTransactions)=>{
              const data = []; // Create an array to store the data

              for (const DbTransaction of groupDbTransactions) {
                const { groupMember, userId, price } = DbTransaction; // Destructure each transaction
                data.push([groupMember, userId, price]); // Push the destructured data as an array
              }
              console.log(data);
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
    }

    const handleClickDelete = (e) => {
        e.preventDefault();
        if (member.username.length !== 0) {
            deleteGroupMember(id, member.username);
            setMemberChanged(true); // Member has been deleted, trigger useEffect
        }
        setMember({ username: "" });
    }

    const handleToggleMember = (username) => {
        if (selectedMembers.includes(username)) {
            setSelectedMembers(selectedMembers.filter((member) => member !== username));
        } else {
            setSelectedMembers([...selectedMembers, username]);
        }
    }

    const handleTransactionCostChange = (e) => {
        setTransaction({ ...transaction, cost: e.target.value });
    }

    const handleTransactionTypeChange = (e) => {
        setTransaction({ ...transaction, type: e.target.value });
    }

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
    }

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
      const price = transaction.cost/selectedMembers.length;
      for (const groupMember of selectedMembers) {
          if(transaction.type=="debit"){
            await AddGroupTransaction(groupMember,price, id);
          }
          else{
            await AddGroupTransaction(groupMember,-price, id);
          }
      }
      setTransactionMade(true);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="group-details">
                        <h1>{group.name}</h1>
                        <p>{group.description}</p>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" className="form-control" id="username" name="username" value={member.username} aria-describedby="emailHelp" onChange={(e) => setMember({ ...member, username: e.target.value })} />
                            </div>
                            <button type="submit" onClick={handleClickAdd} className="btn btn-primary">Add Member</button>
                            <button type="submit" onClick={handleClickDelete} className="btn btn-primary">Delete Member</button>
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
                            <label htmlFor="transactionCost" className="form-label">Transaction Cost</label>
                            <input type="number" className="form-control" id="transactionCost" name="transactionCost" value={transaction.cost} onChange={handleTransactionCostChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="transactionType" className="form-label">Transaction Type</label>
                            <select className="form-select" id="transactionType" name="transactionType" value={transaction.type} onChange={handleTransactionTypeChange}>
                                <option value="credit">Credit</option>
                                <option value="debit">Debit</option>
                            </select>
                        </div>
                        <h2>Group Member to Include</h2>
                        <ul className="list-group">
                        {renderMemberCheckboxes()}
                        </ul>
                        <button type="button" onClick={handleAddTransaction} className="btn btn-primary">Add Transaction</button>
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
            </div>
        </div>
    );
}

export default GroupDetails;
