import React from 'react';
import TransactionGrid from './TransactionGrid';
import AddTransaction from './AddTransaction';
import Sidebar from './Sidebar';

const Transactions = () => {
  return (
    <div>
        <Sidebar/>
      <AddTransaction/>
      <TransactionGrid/>
    </div>
  );
}

export default Transactions;
