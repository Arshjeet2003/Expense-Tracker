import React, { useContext } from 'react';
import groupContext from '../context/groups/groupContext.js';
import { Link } from 'react-router-dom';

const GroupCard = (props) => {
    const {group,updateGroup} = props;
    const context = useContext(groupContext);
    const {deleteGroup} = context;
    return (
        <div className='col-md-3'><Link to={`/group/${group._id}`}>
            <div className="card my-3">
            <div className="card-body">
                <h5 className="card-title">{group.name}</h5>
                <p className="card-text">{group.description}</p>
                <i className="far fa-trash-alt mx-2" onClick={()=>{deleteGroup(group._id);}}></i>
                <i className="far fa-edit mx-2" onClick={()=>{updateGroup(group)}}></i>
            </div>
            </div>
            </Link>
        </div>
    )
}

export default GroupCard;
