import './css/App.css';
import About from "./components/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import TransactionState from './context/transactions/TransactionState';
import AuthState from './context/auth/AuthState.js'
import FriendState from './context/friend/FriendState.js';
import TransactionGrid from './components/TransactionGrid.jsx';
import Dashboard from './components/Dashboard.jsx';
import GroupDetails from'./components/GroupDetails.jsx'
import Friends from './components/Friends.jsx';
import Transactions from './components/Transactions.jsx';
import Groups from './components/Groups.jsx';
import GroupState from './context/groups/GroupState.js';
import Quickadd from './components/Quickadd.jsx';
import Conversions from './components/Conversions.jsx';
import ThemeState from './context/theme/ThemeState.js';

function App() {
  return (
    <div>
      <ThemeState>
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
          <Route exact path="/Conversions" element={<Conversions/>}></Route>
        </Routes>
      </BrowserRouter>
    </TransactionState>
    </GroupState>
    </AuthState>
    </FriendState>
    </ThemeState>
    </div>
  );
}

export default App;
