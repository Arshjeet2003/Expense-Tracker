import React,{useContext,useState,useEffect} from 'react';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import friendContext from '../context/friend/friendContext';
import Navbar from "./Navbar";

const Friends = () => {
  const context = useContext(friendContext);
    const {friends,addFriend,getUserFriends,deleteFriend} = context;
    const [friend,setFriend] = useState({username:""})
    useEffect(()=>{
      // getUserFriends();
  },[])
    const handleClickAdd = (e)=>{
        e.preventDefault(); //So that page does not reload
        if(friend.username.length!==0){
          addFriend(friend.username);
        }
        // console.log(friends);
        setFriend({username: ""});
        // props.showAlert("Note Added successfully","success");
    }
    const handleClickDelete = (e)=>{
      e.preventDefault(); //So that page does not reload
      if(friend.username.length!==0){
        deleteFriend(friend.username);
      }
      setFriend({username: ""});
      // props.showAlert("Note Added successfully","success");
  }
    const onChange = (e)=>{
        setFriend({...friend,[e.target.name]: e.target.value})
    }
  return (
    <div>
        <Navbar/>
        <Sidebar/>
        <form>
  <div className="mb-3">
    <label htmlFor="username" className="form-label">Friend Username</label>
    <input type="text" className="form-control" id="username" name="username" value={friend.username} aria-describedby="emailHelp" onChange={onChange}/>
  </div>
  <button type="submit" onClick={handleClickAdd} className="btn btn-primary">Add Friend</button>
  <button type="submit" onClick={handleClickDelete} className="btn btn-primary">Delete Friend</button>
</form>
    </div>
  );
}

export default Friends;
