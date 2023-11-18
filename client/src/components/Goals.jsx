import React, { useRef, useContext } from "react";
import "../css/Goals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import themeContext from "../context/theme/themeContext";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Conversion from "../images/Conversion.svg";

const Goals = () => {
  const ref = useRef(null);
  const refClose = useRef(null);
  const context1 = useContext(themeContext);
  const { theme } = context1;

  const createGroup = (e) => {
    e.preventDefault();
    ref.current.click();
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="container mt-5 mb-3" style={{ paddingLeft: "17vh" }}>
        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <button
              type="submit"
              onClick={createGroup}
              className={`btn transparent ${
                theme === "light" ? "bgroupl" : "bgroupd"
              }`}
              id="Create-group"
              style={{ marginRight: 150 }}
            >
              Make a Goal
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card carddl p-3 mb-2">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-row align-items-center">
                  {/* <div class="icon"> <i class="bx bxl-mailchimp"></i> </div> */}
                  <div className="ms-2 c-details">
                    <h4 className="mb-0">mission impossible</h4>
                    <span>1 days ago</span>
                  </div>
                </div>
                <div className="badge">
                  <span>Active</span>
                </div>
                {/* <div class="badge"> <span>Not achieved</span> </div>
              <div class="badge"> <span>Completed</span> </div> */}
              </div>
              <div className="mt-1">
                <div className="row ms-2" style={{ paddingBottom: 20 }}>
                  <div
                    className="col-md-4"
                    style={{ textAlign: "center", justifyContent: "center" }}
                  >
                    <i
                      class="material-symbols-outlined"
                      style={{ top: "6px", right: "5px", position: "relative" }}
                    >
                      calendar_month
                    </i>
                    start date : 30th feburary 7014
                  </div>
                  <div
                    className="col-md-4"
                    style={{ textAlign: "center", justifyContent: "center" }}
                  >
                    <i
                      class="material-symbols-outlined"
                      style={{ top: "6px", right: "5px", position: "relative" }}
                    >
                      calendar_month
                    </i>
                    end date : 29th feburary 7014
                  </div>
                  <div className="col-md-4"></div>
                </div>
                <div className="row ms-2">
                  <div className="col-md-6">
                    <div className="descc">
                      <h5>Description</h5>
                    </div>
                    <div className="desc">
                      This goal is designed by Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Minus quidem tenetur
                      recusandae odit ipsam repellendus quaerat possimus,
                      officia inventore Lorem, ipsum dolor sit amet consectetur
                      adipisicing elit. Veritatis exercitationem ea dolore,
                      facere vitae optio dolorum libero nisi expedita aliquam
                      ipsa tempore aut fuga quos iusto voluptatibus iure
                      necessitatibus architecto. Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Eos qui at ipsa rem magnam
                      et animi quaerat nihil magni ex ad voluptatem optio, odio
                      cum iusto minus aliquam eligendi doloribus?
                    </div>
                  </div>
                  <div className="col-md-3 rightMost">
                    <div
                      className="this"
                      style={{ display: "flex", marginTop: "7%" }}
                    >
                      <div className="daysLeft mx-3" style={{ fontSize: 60 }}>
                        46
                      </div>
                      <div
                        className="left"
                        style={{
                          paddingTop: "8%",
                          paddingLeft: "2%",
                        }}
                      >
                        days left
                      </div>
                    </div>
                                  </div>
                                  <div className="col-md-3">
                                      <img src="" alt="" />
                                  </div>
                  {/* <h3 class="heading">cardt<br>text<br>gbvnrbh<br>gbfufufuecv</h3> */}
                  <div className="mt-1 ms-3">
                    <div className="col-md-12 progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: "60%" }}
                        aria-valuenow={50}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <div className="mt-3">
                      <span className="text1">
                        current saving
                        <span className="text2">of target saving</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal starts */}

      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Update Group
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className={`modal-content ${
              theme === "light" ? "popUpBody1" : "popUpBodyd"
            }`}
          >
            <div className="modal-header" style={{ paddingLeft: "40%" }}>
              <h5 className="modal-title" id="exampleModalLabel">
                Make a Goal
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="ename" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    id="ename"
                    name="name"
                    // value={group1.name}
                    aria-describedby="emailHelp"
                    // onChange={onChange1}
                  />
                </div>
                <div className="mb-3" style={{ paddingLeft: 10 }}>
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    rows="5"
                    cols="25"
                    type=""
                    className="form-control"
                    required
                    id="edescription"
                    name="description"
                    // value={group1.description}
                    // onChange={onChange1}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="ename" className="form-label">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    id="ename"
                    name="name"
                    // value={group1.name}
                    aria-describedby="emailHelp"
                    // onChange={onChange1}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="ename" className="form-label">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    id="ename"
                    name="name"
                    // value={group1.name}
                    aria-describedby="emailHelp"
                    // onChange={onChange1}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                // onClick={handleClickAdd}
                className="btn btn-primary"
                style={{
                  background: `${theme === "light" ? "#4d4dff" : "#333d82"}`,
                }}
              >
                Add Goal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* modal ends */}
    </div>
  );
};

export default Goals;
