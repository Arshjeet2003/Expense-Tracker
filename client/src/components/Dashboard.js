import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import "../css/dashboard.css";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="container-fluid full-height">
        <div className="row full-height">
          {/* Left Side */}
          <div className="col-md-8 full-height bordered">
            {/* Content here */}
          </div>
          {/* Right Side */}
          <div className="col-md-4 full-height">
            {/* Upper Right Section */}
            <div className="row  bordered upper">
              <div className="col-12">{/* Upper Right Content here */}</div>
            </div>
            {/* Lower Right Section */}
            <div className="row bordered lower">
              <div className="col-12">{/* Lower Right Content here */}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
