import React, { useContext } from 'react';
import transactionContext from '../context/transactions/transactionContext';

const MyTransactionCard = (props) => {
    const {transaction,updateTransaction} = props;
    const context = useContext(transactionContext);
    const {deleteTransaction} = context;

    return (
        <div className='col-md-3'>
            <div className="card my-3">
            <div className="card-body">
                <h5 className="card-title">{transaction.name}</h5>
                <p className="card-text">{transaction.description}</p>
                <i className="far fa-trash-alt mx-2" onClick={()=>{deleteTransaction(transaction._id);}}></i>
                <i className="far fa-edit mx-2" onClick={()=>{updateTransaction(transaction)}}></i>
            </div>
            </div>
        </div>
    )
}

export default MyTransactionCard;
