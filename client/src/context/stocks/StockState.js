import { useState } from "react";
import StockContext from '../stocks/StockContext';

const StockState = (props)=>{
    const host = "http://localhost:5004"

    const [stocks,setStocks] = useState([]);

    const getUserStocks = async (search) => {
        try {
          const response = await fetch(`${host}/api/stocks/getstocks?search=${search}`, {
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

    const addStocks = async (assetStock,valueStock)=>{
        const response = await fetch(`${host}/api/stocks/addstock`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({assetStock,valueStock})
        });

        const stock = await response.json();
        setStocks(stocks.concat(stock));
    }

    const deleteStock = async (id)=>{
        const response = await fetch(`${host}/api/stocks/deletestock/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json =  await response.json();
        const newStocks = stocks.filter((stock)=>{return stock._id!==id})
        setStocks(newStocks);
    }    
    return (
        <StockContext.Provider value={{stocks,addStocks,deleteStock,getUserStocks}}>
            {props.children}
        </StockContext.Provider>
    );
}
export default StockState