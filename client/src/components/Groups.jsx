import React, { useContext, useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar.jsx";
import "bootstrap";
import groupContext from "../context/groups/groupContext";
import themeContext from "../context/theme/themeContext";
import GroupCard from "./GroupCard.jsx";
import Navbar from "./Navbar.jsx";
import "../css/Groups.css";
import Man from "../images/Man.svg";
import slidedark from "../images/slidedark.png";
import slidelight from "../images/slidelight.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Groups = () => {
   const settings = {
    //  dots: true,
     infinite: true,
     speed: 500,
     slidesToShow: 1,
     slidesToScroll: 1,
     autoplay: true,
     autoplaySpeed: 5000,
     adaptiveHeight: true,
     responsive: [
       {
         breakpoint: 768,
         settings: {
           slidesToShow: 1,
           slidesToScroll: 1,
         },
       },
       {
         breakpoint: 480,
         settings: {
           slidesToShow: 1,
           slidesToScroll: 1,
         },
       },
     ],
   };
  const context = useContext(groupContext);
  const { groups, addGroup, getGroups, deleteGroup, editGroup } = context;
  const context1 = useContext(themeContext);
  const { theme } = context1;
  const [group, setGroup] = useState({ id: "", ename: "", edescription: "" });
  const [group1, setGroup1] = useState({ name: "", description: "" });
  const ref = useRef(null);
  const refClose = useRef(null);
  let idx = 0;
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


  const [animationData, setAnimationData] = useState(0);
  
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
        <div className="container complete" style={{ paddingTop: "4.5%" }}>
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
                <strong>Create Group</strong>
              </button>
            </div>
          </div>
          <div
            className={`row my-3 card-container ${
              theme === "light" ? "card-headingl" : "card-headingd"
            }`}
          >
            <h2 style={{ paddingLeft: 10 }}>
              <strong>My Groups</strong>
            </h2>

            <div className="row mt-3">
              <div className="col-md-5">
                <img
                  src={Man}
                  alt=""
                  style={{ height: "90%" }}
                  className="hides"
                  data-aos="zoom-in"
                />
              </div>
              <div className="col-md-7 mt-5">
                <div className="carousel-container">
                  <Slider {...settings}>
                    <div className="slid">
                      <img
                        src={theme === "light" ? slidelight : slidedark}
                        alt=""
                      />

                      <div
                        className={`${
                          theme === "light"
                            ? "slide-contentl"
                            : "slide-contentd"
                        }`}
                      >
                        <h4 className="text">
                          Welcome to our Group Management section, where you
                          have the power to effortlessly organize and simplify
                          your shared financial experiences. Here's a glimpse of
                          the features that empower you within this space:
                        </h4>
                      </div>
                    </div>
                    <div className="slid">
                      <img
                        src={theme === "light" ? slidelight : slidedark}
                        alt=""
                      />
                      <div
                        className={`${
                          theme === "light"
                            ? "slide-contentl"
                            : "slide-contentd"
                        }`}
                      >
                        <h3 className="text">
                          <strong>Add Various Groups</strong>
                        </h3>
                        <p style={{ fontSize: "20px" }}>
                          Create multiple groups tailored to different purposes
                          or activities. Enjoy the flexibility to organize and
                          manage various aspects of your life.
                        </p>
                      </div>
                    </div>
                    <div className="slid">
                      <img
                        src={theme === "light" ? slidelight : slidedark}
                        alt=""
                      />
                      <div
                        className={`${
                          theme === "light"
                            ? "slide-contentl"
                            : "slide-contentd"
                        }`}
                      >
                        <h3 className="text">
                          <strong>Add Members to the Group</strong>
                        </h3>
                        <p style={{ fontSize: "20px" }}>
                          {" "}
                          Expand your community effortlessly by inviting new
                          members. Foster collaboration and inclusivity within
                          your financial activities, enhancing group dynamics
                          and shared experiences.
                        </p>
                      </div>
                    </div>
                    <div className="slid">
                      <img
                        src={theme === "light" ? slidelight : slidedark}
                        alt=""
                      />
                      <div
                        className={`${
                          theme === "light"
                            ? "slide-contentl"
                            : "slide-contentd"
                        }`}
                      >
                        <h3 className="text">
                          <strong>Remove Members from the Group</strong>
                        </h3>
                        <p style={{ fontSize: "20px" }}>
                          Maintain control over your group's composition by
                          easily managing its members. Remove individuals who
                          are no longer part of shared financial activities,
                          ensuring the security and privacy of your financial
                          interactions.
                        </p>
                      </div>
                    </div>
                    <div className="slid">
                      <img
                        src={theme === "light" ? slidelight : slidedark}
                        alt=""
                      />
                      <div
                        className={`${
                          theme === "light"
                            ? "slide-contentl"
                            : "slide-contentd"
                        }`}
                      >
                        <h3 className="text">
                          <strong>Add Group Description</strong>
                        </h3>
                        <p style={{ fontSize: "20px" }}>
                          Provide a clear overview of your group's purpose and
                          activities. Communicate important guidelines and
                          expectations to all members, fostering a sense of
                          community by sharing the group's mission and
                          objectives.
                        </p>
                      </div>
                    </div>
                    <div className="slid">
                      <img
                        src={theme === "light" ? slidelight : slidedark}
                        alt=""
                      />
                      <div
                        className={`${
                          theme === "light"
                            ? "slide-contentl"
                            : "slide-contentd"
                        }`}
                      >
                        <h3 className="text">
                          {" "}
                          <strong>Simplify Debts</strong>
                        </h3>
                        <p style={{ fontSize: "20px" }}>
                          Streamline your group's financial transactions with
                          ease. Manage debts and credits seamlessly, ensuring
                          accurate and hassle-free settlements among members.
                        </p>
                      </div>
                    </div>
                    <div className="slid">
                      <img
                        src={theme === "light" ? slidelight : slidedark}
                        alt=""
                      />
                      <div
                        className={`${
                          theme === "light"
                            ? "slide-contentl"
                            : "slide-contentd"
                        }`}
                      >
                        <h3 className="text">
                          {" "}
                          <strong>Split Expenses</strong>
                        </h3>
                        <p style={{ fontSize: "20px" }}>
                          Effortlessly divide and distribute shared expenses
                          among group members. Track and manage various
                          expenditures to maintain financial transparency,
                          making the process of splitting bills fair and
                          convenient for everyone.
                        </p>
                      </div>
                    </div>
                    <div className="slid">
                      <img
                        src={theme === "light" ? slidelight : slidedark}
                        alt=""
                      />
                      <div
                        className={`${
                          theme === "light"
                            ? "slide-contentl"
                            : "slide-contentd"
                        }`}
                      >
                        <h4 className="text">
                          {" "}
                          In this organized and feature-rich environment, our
                          Group Management section empowers you to create,
                          organize, and streamline your financial activities
                          within various groups. Enjoy a seamless,
                          collaborative, and tailored experience that meets your
                          unique needs!
                        </h4>
                      </div>
                    </div>
                    {/* Add more slides as needed */}
                  </Slider>
                </div>
              </div>
              {/* <div className="col-md-5">
                <img src={Man} style={{ height: "70vh" }} alt="" />
              </div>
              <div className="col-md-7">
                <p>
                  Welcome to our Group Management section, where you have the
                  power to effortlessly organize and simplify your shared
                  financial experiences. Here's a glimpse of the features that
                  empower you within this space:
                </p>
                <br />
                <p>
                  Add Various Groups: Create multiple groups tailored to
                  different purposes or activities. Enjoy the flexibility to
                  organize and manage various aspects of your life.
                  <br />
                  Add Members
                  to the Group: Expand your community effortlessly by inviting
                  new members. Foster collaboration and inclusivity within your
                  financial activities, enhancing group dynamics and shared
                  experiences.
                  <br />
                  Remove Members from the Group: Maintain control
                  over your group's composition by easily managing its members.
                  Remove individuals who are no longer part of shared financial
                  activities, ensuring the security and privacy of your
                  financial interactions.
                  <br />
                  Add Group Description: Provide a clear
                  overview of your group's purpose and activities. Communicate
                  important guidelines and expectations to all members,
                  fostering a sense of community by sharing the group's mission
                  and objectives.
                  <br />
                  Simplify Debts: Streamline your group's
                  financial transactions with ease. Manage debts and credits
                  seamlessly, ensuring accurate and hassle-free settlements
                  among members. Split Expenses: Effortlessly divide and
                  distribute shared expenses among group members.
                  <br />
                  Track and
                  manage various expenditures to maintain financial
                  transparency, making the process of splitting bills fair and
                  convenient for everyone. In this organized and feature-rich
                  environment, our Group Management section empowers you to
                  create, organize, and streamline your financial activities
                  within various groups. Enjoy a seamless, collaborative, and
                  tailored experience that meets your unique needs!
                </p>
              </div> */}
            </div>

            <div className="container mx-2">
              {groups.length === 0 && (
                <div
                  style={{
                    height: "300px",
                    justifyContent: "center",
                    textAlign: "center",
                    paddingTop: "10%",
                    fontSize: "30px",
                    color: `${
                      theme === "light" ? "rgb(102, 103, 115)" : "#ffffff4f"
                    }`,
                  }}
                >
                  <strong>No Groups to show...</strong>
                </div>
              )}
            </div>

            {groups.map((group) => {
              let animationData = idx % 2;
              idx++;
              // setAnimationData(animationData);
              return (
                <>
                  {/*                   
                  <div
                    className="row"
                    style={{
                      maxWidth: "100%",
                      height: "200px",
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ paddingTop: "5%", fontSize: "100px" }}
                    >
                      arrow_circle_down
                    </span>
                  </div> */}
                  <GroupCard
                    key={group._id}
                    updateGroup={updateGroup}
                    group={group}
                    animationData={animationData}
                  />
                </>
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
