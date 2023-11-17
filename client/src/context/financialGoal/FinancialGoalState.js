import { useState } from "react";
import FinancialGoalContext from '../financialGoal/financialGoalContext';

const FinancialGoalsState = (props)=>{
    const host = "http://localhost:5004"

    const [financialGoals,setFinancialGoals] = useState([]);

    const getFinancialGoals = async (search) => {
        try {
          const response = await fetch(`${host}/api/financialGoals/getfinancialGoals?search=${search}`, {
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

    const addFinancialGoals = async (name,description,startDate,endDate,savingsGoal)=>{
        const response = await fetch(`${host}/api/financialGoals/addfinancialGoals`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({name,description,startDate,endDate,savingsGoal})
        });

        const financialGoal = await response.json();
        setFinancialGoals(financialGoals.concat(financialGoal));
    }

    const deleteFinancialGoal = async (id)=>{
        const response = await fetch(`${host}/api/financialGoals/deletefinancialGoals/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json =  await response.json();
        const newFinancialGoals = financialGoals.filter((financialGoal)=>{return financialGoal._id!==id})
        setFinancialGoals(newFinancialGoals);
    }
    
    return (
        <FinancialGoalContext.Provider value={{financialGoals,addFinancialGoals,deleteFinancialGoal,getFinancialGoals}}>
            {props.children}
        </FinancialGoalContext.Provider>
    );
}
export default FinancialGoalsState