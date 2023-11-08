import React from 'react';
import TransactionGrid from './TransactionGrid';
import AddTransaction from './AddTransaction';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

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
