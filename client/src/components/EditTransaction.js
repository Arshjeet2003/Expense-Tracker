import React, { useContext, useEffect, useRef, useState } from 'react';
import transactionContext from '../context/transactions/transactionContext';
import { useNavigate } from 'react-router-dom';
import MyTransactionCard from './MyTransactionCard';
import AddTransaction from './AddTransaction';

//useRef to reference an element

const EditTransaction = ()=>{
    
    const context = useContext(transactionContext);
    const { transactions,editTransaction,getUserTransactions } = context;

    const ref = useRef(null);
    let navigate = useNavigate();
    const refClose = useRef(null);

    useEffect(()=>{
        if(localStorage.getItem('token')){
            getUserTransactions();
        }
        else{
            navigate("/login");
        }
    },[])

    const [transaction, setTransactions] = useState({id: "",ename: "", edescription: "",ecategory: "",erecurring: "",erepeat: ""}) 

    const updateTransaction = (currentTransaction)=>{
        ref.current.click();
        setTransactions({id: currentTransaction._id,ename: currentTransaction.name,edescription: currentTransaction.description,ecategory: currentTransaction.category,
        erecurring: currentTransaction.recurring,erepeat: currentTransaction.repeat});
    }

    const handleClick = (e)=>{
        editTransaction(transaction.id,transaction.ename,transaction.edescription,transaction.ecategory,transaction.erecurring,transaction.erepeat);
        refClose.current.click();
        // props.showAlert("Updated successfully","success");
    }
    const onChange = (e)=>{
        setTransactions({...transaction,[e.target.name]: e.target.value})
    }
  return (
    <>
    <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
    Update Transaction
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Transaction</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            <form className='my-3'>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" minLength={3} required id="ename" name="ename" value={transaction.ename} aria-describedby="emailHelp"
                onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" minLength={5} required id="edescription" name="edescription" value={transaction.edescription}  onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input type="text" className="form-control" required id="ecategory" name="ecategory" value={transaction.ecategory}  onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="recurring" className="form-label">Recurring</label>
                <input type="text" className="form-control" required id="erecurring" name="erecurring" value={transaction.erecurring}  onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="repeat" className="form-label">Repeat</label>
                <input type="text" className="form-control" required id="erepeat" name="erepeat" value={transaction.erepeat}  onChange={onChange}/>
            </div>
            </form>
        </div>
        <div className="modal-footer">
            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" onClick={handleClick} disabled={transaction.ename.length<5 || transaction.edescription.length<5} className="btn btn-primary">Update Transaction</button>
        </div>
        </div>
    </div>
    </div>
    <div className="row my-3">
      <h2>My Transactions</h2>
      <div className="container mx-2">
      {transactions.length===0 && 'No Transactions to display'}
      </div>
      {transactions.map((transaction)=>{
        return <MyTransactionCard key={transaction._id} updateTransaction={updateTransaction} transaction={transaction}/>
      })}
    </div>
    </>
  )
}

export default EditTransaction;
