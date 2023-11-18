import React, { useContext, useEffect } from "react";
import groupContext from "../context/groups/groupContext.js";
import { Link } from "react-router-dom";
import login from "../images/login.svg";
import themeContext from "../context/theme/themeContext";
import AOS from "aos";
import "aos/dist/aos.css";
import "../css/Groupcard.css";
const GroupCard = (props) => {
  
  const { group, updateGroup, animationData } = props;
  console.log(animationData);
  const context = useContext(groupContext);
  const context1 = useContext(themeContext);
  const { theme } = context1;
  const { deleteGroup } = context;

  useEffect(() => {
    AOS.init({
      // Global settings for AOS initialization
      // For example:
      offset: 200, // Change offset to trigger animations sooner or later
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Easing option
      delay: 400, // Delay animation
    });
  }, []);

  return (
    <div
      className="col-md-3"
      style={{
        color: `${theme === "light" ? "#fff" : "#333d82"}`,
        minHeight: "100",
        overflow: "hidden"
        
      }}
    >
      {/* <div className="card my-3 card-complete">
            <div className="card-body">
                <h5 className="card-title">{group.name}</h5>
                <p className="card-text">{group.description}</p>
                <i className="far fa-trash-alt mx-2" onClick={()=>{deleteGroup(group._id);}}></i>
                <i className="far fa-edit mx-2" onClick={()=>{updateGroup(group)}}></i>
            </div>
            </div> */}
      <div
        className={` card ${theme === "light" ? "card-blockl" : "card-blockd"}`}
        data-aos={
          animationData === 0
            ? "fade-down-right"
            : animationData === 1
            ? "fade-up-left"
            : animationData === 2
            ? "fade-up-right"
            : "fade-down-left"
        }
        // data-aos-anchor-placement={
        //   animationData === 0
        //     ? "top-center"
        //     : animationData === 1
        //     ? "bottom-bottom"
        //     : animationData === 2
        //     ? "top-bottom"
        //     : "center-bottom"
        // }
      >
        <Link to={`/group/${group._id}`}>
          <h5
            className={` text-right ${
              theme === "light" ? "card-titlel" : "card-titled"
            }`}
          >
            {group.name}
          </h5>
        </Link>
        <Link to={`/group/${group._id}`}>
          <div className="img-box">
            <img className="image-of-card" src={login} alt="" />
          </div>
        </Link>
        {/* <h5 className="card-title mt-3 mb-3"></h5> */}
        <Link to={`/group/${group._id}`}>
          <p
            className="card-text"
            style={{ color: `${theme === "light" ? "black" : "#fff"}` }}
          >
            {group.description}
          </p>
        </Link>
        <div className="footer">
          <div
            className={`${
              theme === "light" ? "card-bottom1l" : "card-bottom1d"
            }`}
          >
            <i
              className="material-symbols-outlined"
              onClick={() => {
                updateGroup(group);
              }}
            >
              edit_document
            </i>
          </div>
          <div
            className={`${
              theme === "light" ? "card-bottom2l" : "card-bottom2d"
            }`}
          >
            <i
              className="material-symbols-outlined"
              onClick={() => {
                deleteGroup(group._id);
              }}
            >
              delete
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
