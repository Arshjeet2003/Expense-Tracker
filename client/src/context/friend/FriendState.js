import { useState } from "react";
import FriendContext from './friendContext.js';

const FriendState = (props)=>{
    const host = "http://localhost:5004"
    
    const [friends,setFriends] = useState([]);

    const getUserFriends = async ()=>{
        const response = await fetch(`${host}/api/friends/getfriends`,{
            method: 'GET',
            headers:{
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setFriends(json);
    }

    const addFriend = async (id)=>{
        const response = await fetch(`${host}/api/friends/addfriend/${id}`,{
            method: 'POST',
            headers:{
                'auth-token': localStorage.getItem('token')
            },
        });
        const json =  await response.json();
    }

    const deleteFriend = async (id)=>{
        const response = await fetch(`${host}/api/friends/deletefriend/${id}`,{
            method: 'DELETE',
            headers:{
                'auth-token': localStorage.getItem('token')
            }
        });
        const json =  await response.json();
        const newFriends = friends.filter((friend)=>{return friend._id!==id})
        setFriends(newFriends);
    }

    return (
        <FriendContext.Provider value={{friends,addFriend,deleteFriend,getUserFriends}}>
            {props.children}
        </FriendContext.Provider>
    );
}