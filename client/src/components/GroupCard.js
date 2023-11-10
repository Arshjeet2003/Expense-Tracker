import React, { useContext } from "react";
import groupContext from "../context/groups/groupContext.js";
import { Link } from "react-router-dom";
import login from "../images/login.svg";
import "../css/Groupcard.css";
const GroupCard = (props) => {
  const { group, updateGroup } = props;
  const context = useContext(groupContext);
  const { deleteGroup } = context;
  return (
    <div className="col-md-3">
        {/* <div className="card my-3 card-complete">
            <div className="card-body">
                <h5 className="card-title">{group.name}</h5>
                <p className="card-text">{group.description}</p>
                <i className="far fa-trash-alt mx-2" onClick={()=>{deleteGroup(group._id);}}></i>
                <i className="far fa-edit mx-2" onClick={()=>{updateGroup(group)}}></i>
            </div>
            </div> */}
        <div className="card card-block">
          <Link to={`/group/${group._id}`}>
            <h5 className="card-title text-right">{group.name}</h5>
          </Link>
          <Link to={`/group/${group._id}`}>
            <div className="img-box">
              <img className="image-of-card" src={login} alt="" />
            </div>
          </Link>
          {/* <h5 className="card-title mt-3 mb-3"></h5> */}
          <Link to={`/group/${group._id}`}>
            <p className="card-text" style={{color:"black"}}>{group.description}</p>
          </Link>
          <div className="footer">
            <div className="card-bottom1">
              <i
                className="material-symbols-outlined"
                onClick={() => {
                  updateGroup(group);
                }}
              >
                edit_document
              </i>
            </div>
            <div className="card-bottom2">
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
