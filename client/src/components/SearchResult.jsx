import "../css/SearchResult.css";
import React,{useContext} from "react";
import friendContext from '../context/friend/friendContext';
import groupContext from "../context/groups/groupContext.js";

export const SearchResult = (props) => {
  const {handleAddMember,handleChange} = props;
  const context = useContext(friendContext);
  const context1 = useContext(groupContext);
  // console.log(props);


  const { addFriend } = context;
  const { addGroupMember } = context1;

  return (
    <div
      className="search-result"
      onClick={(e) => {
        props.grpId.value === "0"
          ? addFriend(props.result)
          : addGroupMember(props.grpId.value, props.result);
        handleAddMember(() => true);
        handleChange(() => '')
      }}      
    >
      {props.result}
      <button className="add-user-button">
        <i className="material-symbols-outlined add-user">person_add</i>
      </button>
    </div>
  );
  
};
