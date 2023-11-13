import React from 'react';
import TransactionGrid from './TransactionGrid.jsx';
import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';

const Transactions = () => {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <TransactionGrid/>
    </div>
  );
}

export default Transactions;
