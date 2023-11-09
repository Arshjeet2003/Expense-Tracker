import './css/App.css';
import About from "./components/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import TransactionState from './context/transactions/TransactionState';
import AuthState from './context/auth/AuthState.js'
import FriendState from './context/friend/FriendState.js';
import TransactionGrid from './components/TransactionGrid.js';
import Dashboard from './components/Dashboard.js';
import GroupDetails from'./components/GroupDetails.js'
import Friends from './components/Friends.js';
import Transactions from './components/Transactions.js';
import Groups from './components/Groups.js';
import GroupState from './context/groups/GroupState.js';
import Quickadd from './components/Quickadd.js';

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
    <div>
      <FriendState>
        <AuthState>
          <GroupState>
            <TransactionState>
              <BrowserRouter>
                <Routes>
                  {/* <Route exact path="/" element={<EditTransaction/>}></Route> */}
          <Route exact path="/about" element={<About/>}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/gettransaction" element={<TransactionGrid/>}></Route>
          <Route exact path="/" element={<Dashboard/>}></Route>
          <Route exact path="/friends" element={<Friends/>}></Route>
          <Route exact path="/groups" element={<Groups/>}></Route>
          <Route exact path="/transactions" element={<Transactions/>}></Route>
          <Route path="/group/:id" element={<GroupDetails />}></Route>
          <Route exact path="/quickadd" element={<Quickadd/>}></Route>
        </Routes>
      </BrowserRouter>
    </TransactionState>
    </GroupState>
    </AuthState>
    </FriendState>
    </div>
  );
}

export default App;
