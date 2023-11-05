import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import "../css/sidebar.css";
import { Link,useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  let navigate = useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }

  const toggleSidebar = () => {
    // This will toggle the state between true and false
    setIsOpen(!isOpen);
  };
  return (
    <div>
     <div className={`sidebar ${isOpen ? 'open' : ''}`}>

  <div className="logo-details">
    <div className="logo_name">Project-name/logo</div>
    <i className={`bx ${isOpen ? 'bx-menu' : 'bx-menu-alt-right'}`} id="btn"  onClick={toggleSidebar}/>
  </div>
  <ul className="nav-list">
    {/* <li>
    <i class='bx bx-search' ></i>
   <input type="text" placeholder="Search...">
   <span class="tooltip">Search</span>
</li> */}
    <li>
      <Link to="/">
        <i className="material-symbols-outlined" style={{ fontSize: 24 }}>
          dashboard
        </i>
        <span className="links_name">Dashboard</span>
      </Link>
      <span className="tooltip">Dashboard</span>
    </li>
    <li>
      <Link to="/friends">
        <i className="material-symbols-outlined" style={{ fontSize: 24 }}>
          person
        </i>
        <span className="links_name">Friends</span>
      </Link>
      <span className="tooltip">Friends</span>
    </li>
    <li>
      <Link to="/groups">
        <i className="material-symbols-outlined" style={{ fontSize: 24 }}>
          groups
        </i>
        <span className="links_name">Groups</span>
      </Link>
      <span className="tooltip">Groups</span>
    </li>
    <li>
      <Link to="/transactions">
        <i className="material-symbols-outlined" style={{ fontSize: 24 }}>
          receipt_long
        </i>
        <span className="links_name">Transactions</span>
      </Link>
      <span className="tooltip">Transactions</span>
    </li>
    <li>
      <a href="#">
        <i className="material-symbols-outlined" style={{ fontSize: 24 }}>
          sports_score
        </i>
        <span className="links_name">Goals</span>
      </a>
      <span className="tooltip">Goals</span>
    </li>
    <li>
      <a href="#">
        <i className="material-symbols-outlined" style={{ fontSize: 24 }}>
          conversion_path
        </i>
        <span className="links_name">Conversions</span>
      </a>
      <span className="tooltip">Conversions</span>
    </li>
    <li className="profile">
      <div className="profile-details">
        <div className="name_job">
          <div onClick={handleLogout} className="name">Log Out</div>
        </div>
      </div>
      <i className="bx bx-log-out" id="log_out" />
    </li>
  </ul>
</div>

    </div>
  )
}

export default Sidebar
