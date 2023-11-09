import React, { useState,useContext, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import Header from "components/Header";
import DataGridCustomToolbar from "./DataGridCustomToolbar.js";
import transactionContext from '../context/transactions/transactionContext.js';

const TransactionGrid = () => {

    const context = useContext(transactionContext);
    const { getUserTransactions } = context;
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");
    const [data,setData] = useState({});

    const [searchInput, setSearchInput] = useState("");

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
        field: "category",
        headerName: "Category",
        flex: 0.5,
      },
      {
        field: "date",
        headerName: "Date",
        flex: 1,
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
        flex: 1,
        renderCell: (params) => {return <a target='_blank' href={`${params.value}`}>{`${params.value}`}</a>} 
      }
    ];
    return (
      <Box m="1.5rem 2.5rem">
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
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              // backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              // backgroundColor: theme.palette.background.alt,
              // color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
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
    );
}
export default TransactionGrid;