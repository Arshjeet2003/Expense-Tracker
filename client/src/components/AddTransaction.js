import React,{useContext,useState} from 'react'
import transactionContext from '../context/transactions/transactionContext';

const AddTransaction = (props) => {
    const context = useContext(transactionContext);
    const {AddTransaction} = context;
    const [transaction,setTransaction] = useState({name: "", description: "",category: "",recurring: 0,
    repeat: ""})
    const handleClick = (e)=>{
        e.preventDefault(); //So that page does not reload
        AddTransaction(transaction.name,transaction.description,transaction.category,transaction.recurring,transaction.repeat);
        setTransaction({name: "", description: "",category:"",recurring:"",repeat:""})
        // props.showAlert("Note Added successfully","success");
    }
    const onChange = (e)=>{
        setTransaction({...transaction,[e.target.name]: e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
        <h2>Add a Transaction</h2>
        <form className='my-3'>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" minLength={3} value={transaction.name} required id="name" name="name" aria-describedby="emailHelp"
             onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" minLength={5} value={transaction.description} required id="description" name="description"  onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <input type="text" className="form-control" id="category" name="category" value={transaction.category}  onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="recurring" className="form-label">Recurring</label>
            <input type="text" className="form-control" id="recurring" name="recurring" value={transaction.recurring}  onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="repeat" className="form-label">Repeat</label>
            <input type="text" className="form-control" id="repeat" name="repeat" value={transaction.repeat}  onChange={onChange}/>
        </div>
            <button disabled={transaction.name.length<3 || transaction.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Transaction</button>
        </form>
      </div>
    </div>
  )
}

export default AddTransaction
