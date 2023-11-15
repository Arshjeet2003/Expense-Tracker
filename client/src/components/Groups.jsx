import React, { useContext, useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar.jsx";
import "bootstrap";
import groupContext from "../context/groups/groupContext";
import themeContext from "../context/theme/themeContext";
import GroupCard from "./GroupCard.jsx";
import Navbar from "./Navbar.jsx";
import "../css/Groups.css";

const Groups = () => {
  const context = useContext(groupContext);
  const { groups, addGroup, getGroups, deleteGroup, editGroup } = context;
  const context1 = useContext(themeContext);
  const { theme } = context1;
  const [group, setGroup] = useState({ id: "", ename: "", edescription: "" });
  const [group1, setGroup1] = useState({ name: "", description: "" });
  const ref = useRef(null);
  const refClose = useRef(null);
  useEffect(() => {
    getGroups("");
  }, []);
  const updateGroup = (currentGroup) => {
    ref.current.click();
    setGroup({
      id: currentGroup._id,
      ename: currentGroup.name,
      edescription: currentGroup.description,
    });
  };
  const handleClick = (e) => {
    editGroup(group.id, group.ename, group.edescription);
    refClose.current.click();
  };
  const handleClickAdd = (e) => {
    e.preventDefault(); //So that page does not reload
    if (group1.name.length !== 0) {
      addGroup(group1.name, group1.description);
    }
    // console.log(friends);
    setGroup1({ name: "", description: "" });
    // props.showAlert("Note Added successfully","success");
  };

  const createGroup = (e) => {
    e.preventDefault();
    ref.current.click();
  };

  const onChange = (e) => {
    setGroup({ ...group, [e.target.name]: e.target.value });
  };
  const onChange1 = (e) => {
    setGroup1({ ...group1, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div
        className={`${
          theme === "light" ? "complete-groupl" : "complete-groupd"
        }`}
      >
        
          <Navbar />
        
        <Sidebar />
        <div className="container complete" style={{paddingTop:"4.5%"}}>
          <div className="row">
            <div className="col"></div>
            <div className="con">
              <button
                type="submit"
                onClick={createGroup}
                className={`btn transparent ${
                  theme === "light" ? "bgroupl" : "bgroupd"
                }`}
                id="Create-group"
                style={{ marginRight: 150 }}
              >
                Create Group
              </button>
            </div>
          </div>
          <div
            className={`row my-3 card-container ${
              theme === "light" ? "card-headingl" : "card-headingd"
            }`}
          >
            <h2 style={{ paddingLeft: 40 }}>My Groups</h2>
            <div className="container mx-2">
              {groups.length === 0 && "No groups to display"}
            </div>
            {groups.map((group) => {
              return (
                <GroupCard
                  key={group._id}
                  updateGroup={updateGroup}
                  group={group}
                />
              );
            })}
          </div>
        </div>
        {/* <form> */}
        {/* <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Group Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={group1.name}
              aria-describedby="emailHelp"
              onChange={onChange1}
            />
          </div> */}
        {/* <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Group Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={group1.description}
              aria-describedby="emailHelp"
              onChange={onChange1}
            />
          </div> */}
        {/* <button
            type="submit"
            onClick={handleClickAdd}
            className="btn btn-primary"
          >
            Add Group
          </button> */}
        {/* </form> */}
        {/* </div> */}
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
                  Create Group
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
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      id="ename"
                      name="name"
                      value={group1.name}
                      aria-describedby="emailHelp"
                      onChange={onChange1}
                    />
                  </div>
                  <div className="mb-3" style={{ paddingLeft: 40 }}>
                    <label htmlFor="edescription" className="form-label">
                      Description
                    </label>
                    <textarea
                      rows="5"
                      cols="33"
                      type=""
                      className="form-control"
                      required
                      id="edescription"
                      name="description"
                      value={group1.description}
                      onChange={onChange1}
                    ></textarea>
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
                  onClick={handleClickAdd}
                  className="btn btn-primary"
                  style={{
                    background: `${theme === "light" ? "#4d4dff" : "#333d82"}`,
                  }}
                >
                  Add Group
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row my-3">
        <h2>My Groups</h2>
        <div className="container mx-2">
          {groups.length === 0 && "No groups to display"}
        </div>
        {/* {groups.map((group) => {
          return (
            <GroupCard
              key={group._id}
              updateGroup={updateGroup}
              group={group}
            />
          );
        })} */}
      </div>
    </>
  );
};

export default Groups;
