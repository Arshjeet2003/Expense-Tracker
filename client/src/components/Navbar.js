import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import "../css/navbar.css";
import NotificationComp from './NotificationComp';

const Navbar = (props) => {

  const [notificationClicked,setClicked] = useState(false);
  const transaction = props?.data?.transactions;
  const handleNotification = ()=>{
    setClicked(true);
  }
  useEffect(() => {
    
  }, [notificationClicked]);
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light" id="neubar">
        <div className="container">
          <a className="navbar-brand" href="#"><img src="image" height="60" alter = "logo"/></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
      
          <div className=" collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
                <a className="nav-link mx-2 active" aria-current="page" href="#">Quick Add<span className="material-symbols-outlined plus-sign">
                    add
                    </span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" href="#"><span className="material-symbols-outlined">
                    dark_mode
                    </span></a>
                    {/* <!-- <span className="material-symbols-outlined">
                        light_mode
                        </span> --> */}
              </li>
              <li className="nav-item">
                <a onClick={handleNotification} className="nav-link mx-2"><span className="material-symbols-outlined">
                    notifications
                    </span></a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link mx-2 dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Register
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><Link className="dropdown-item" to="/login">Sign-up</Link></li>
                  <li><a className="dropdown-item" href="#">Log in</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {notificationClicked?<NotificationComp transaction={transaction}/>:""};
    </div>
  )
}

export default Navbar
