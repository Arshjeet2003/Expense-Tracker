import './App.css';
import About from "./components/About";
// import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { useState } from 'react';
// import Alert from './components/Alert';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import TransactionState from './context/transactions/TransactionState';
import AuthState from './context/auth/AuthState.js'
import EditTransaction from './components/EditTransaction.js';
// import FavouritePet from './components/FavouritePet';
// import Chat from './Chat/Chat.jsx'
import AddTransaction from './components/AddTransaction.js';
import FriendState from './context/friend/FriendState.js';

function App() {
  // const[alert,setAlert] = useState(null);
  
  // const showAlert = (message,type)=>{
  //   setAlert({
  //     msg: message,
  //     type: type
  //   })
  //   setTimeout(() => {
  //     setAlert(null);
  //   }, 1500);
  // }

  return (
    <>
    <FriendState>
    <AuthState>
    <TransactionState>
    <BrowserRouter>
        <Navbar />
        {/* <Alert alert={alert}/> */}
        <div className="container">
        <Routes>
          <Route exact path="/" element={<EditTransaction/>}></Route>
          <Route exact path="/about" element={<About/>}></Route>
          <Route exact path="/addtransaction" element={<AddTransaction />}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
        </Routes>
        </div>
      </BrowserRouter>
    </TransactionState>
    </AuthState>
    </FriendState>
    </>
  );
}

export default App;
