import React, { useState,useContext, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "../css/TransactionGrid.css";
import themeContext from "../context/theme/themeContext.js";
// import Header from "components/Header";
import DataGridCustomToolbar from "./DataGridCustomToolbar.jsx";
import transactionContext from '../context/transactions/transactionContext.js';

const TransactionGrid = () => {

    const context = useContext(transactionContext);
    const { getUserTransactions } = context;
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");
    const [data,setData] = useState({});
     const context1 = useContext(themeContext);
     const { theme } = context1;
    const [searchInput, setSearchInput] = useState("");
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await getUserTransactions(searchInput);
          setData(result);
          // setTransactions(result.transactions); // Update your state with the fetched data
        } catch (error) {
          console.error('Error:', error);
        }
      };
      fetchData(); // Call the async function to fetch data
    }, [searchInput]);

    // const data = await getUserTransactions(page,pageSize,JSON.stringify(sort),search);
    const columns = [
      {
        field: "name",
        headerName: "Name",
        flex: 1,
      },
      {
        field: "type",
        headerName: "Type",
        flex: 0.5,
      },
      {
        field: "category",
        headerName: "Category",
        flex: 0.5,
      },
      {
        field: "date",
        headerName: "Date",
        flex: 1,
        renderCell: (params) => (
          <div>
            {new Date(params.value).toLocaleDateString(undefined, options)}
          </div>
        ),
      },
      {
        field: "dueDate",
        headerName: "Due Date",
        flex: 1,
        renderCell: (params) => (
          <div>
            {new Date(params.value).toLocaleDateString(undefined, options)}
          </div>
        ),
      },
      {
        field: "price",
        headerName: "Price",
        flex: 0.3,
        // renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
      },
      {
        field: "billUrl",
        headerName: "Bill",
        flex: 0.2,
        renderCell: (params) => {return (
          <a
            style={{ color: `${theme === "light" ? "#4D4DFF" : "#8989f5"}` }}
            target="_blank"
            rel="noreferrer"
            href={`${params.value}`}
          >
            Bill
          </a>
        );} 
      }
    ];
  return (
    <div
      className={`${
        theme === "light" ? "complete-transactionl" : "complete-transactiond"
        }`}
      style={{paddingTop:"6.5%",bottom:"25px",position:"relative"}}
    >
      <div className="close">
        <Box>
          <Box m="-1.9rem 1.5rem">
            {/* <Header title="TRANSACTIONS" subtitle="Entire list of transactions" /> */}
            <Box
              height="80vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .MuiDataGrid-columnHeaders": {
                  // backgroundColor: theme.palette.background.alt,
                  // color: theme.palette.secondary[100],
                  color: `${theme === "light" ? "black" : "#fff"}`,
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  // backgroundColor: theme.palette.primary.light,
                  color: `${theme === "light" ? "black" : "#fff"}`,
                },
                "& .MuiDataGrid-footerContainer": {
                  // backgroundColor: theme.palette.background.alt,
                  // color: theme.palette.secondary[100],
                  
                  borderTop: "none",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${theme === "light" ? "black" : "#8989f5"}`,
                  // color: `${theme.palette.secondary[200]} !important`,
                },
              }}
            >
              <DataGrid
                loading={!data}
                getRowId={(row) => row._id}
                rows={data.transactions || []}
                rowCount={data.total}
                columns={columns}
                onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                components={{ Toolbar: DataGridCustomToolbar }}
                componentsProps={{
                  toolbar: { searchInput, setSearchInput, setSearch },
                }}
              />
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
}
export default TransactionGrid;