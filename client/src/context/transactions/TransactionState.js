import { useState } from "react";
import TransactionContext from '../transactions/transactionContext';

const TransactionState = (props)=>{
    const host = "http://localhost:5004"

    const [transactions,setTransactions] = useState([]);

    const getUserTransactions = async (search) => {
        try {
          const response = await fetch(`${host}/api/transactions/gettransactions?search=${search}`, {
            method: 'GET',
            headers: {
              'auth-token': localStorage.getItem('token')
            }
          });
          const data = await response.json();
          return data;
        } catch (error) {
          // Handle network or other errors
          console.error('An error occurred:', error);
          return {};
        }
      };

    const addTransactions = async (name,type,category,recurring,repeat,price,billUrl,dueDate)=>{
        const response = await fetch(`${host}/api/transactions/addtransaction`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({name,type,category,recurring,repeat,price,billUrl,dueDate})
        });

        const transaction = await response.json();
        setTransactions(transactions.concat(transaction));
    }

    const deleteTransaction = async (id)=>{
        const response = await fetch(`${host}/api/transactions/deletetransaction/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json =  await response.json();
        const newTransactions = transactions.filter((transaction)=>{return transaction._id!==id})
        setTransactions(newTransactions);
    }

    // const editTransaction = async (id,name,description,category,type,recurring,repeat)=>{
    //     const response = await fetch(`${host}/api/transactions/updatetransaction/${id}`,{
    //         method: 'PUT',
    //         headers:{
    //             'Content-Type': 'application/json',
    //             'auth-token': localStorage.getItem('token')
    //         },
    //         body: JSON.stringify({name,description,category,type,recurring,repeat})
    //     });
    //     const json =  await response.json();
    //     let newTransactions = await JSON.parse(JSON.stringify(transactions))
    //     for(let index=0; index<newTransactions.length; index++){
    //         const element = newTransactions[index];
    //         if(element._id === id){
    //             newTransactions[index].name = name;
    //             newTransactions[index].description = description;
    //             newTransactions[index].category = category;
    //             newTransactions[index].recurring = recurring;
    //             newTransactions[index].repeat = repeat;
    //             break;
    //         }
    //     }
    //     setTransactions(newTransactions);
    // }

    
    return (
        <TransactionContext.Provider value={{transactions,addTransactions,deleteTransaction,getUserTransactions}}>
            {props.children}
        </TransactionContext.Provider>
    );
}
export default TransactionState