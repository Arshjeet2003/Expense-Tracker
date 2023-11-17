import { useState } from 'react';
import AuthContext from './authContext.js';

const AuthState = (props)=>{
    const host = "http://localhost:5004"

    const [userId,setUserId] = useState("");

    const loginUser = async (email,password)=>{
        const response = await fetch(`${host}/api/auth/login`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email,password: password})
        });
        const json = await response.json();
        if(json.success){
            localStorage.setItem('token',json.authtoken);
            return true;
        }
        return false;
    }
    const signupUser = async (username,name,email,password)=>{
        const response = await fetch(`${host}/api/auth/createuser`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({_id: username,name: name,email: email,password: password})
        });
        const json = await response.json();
        return false;
    }

    const getUsers = async (search)=>{
        const response = await fetch(`${host}/api/auth/getuser?search=${search}`,{
            method: 'GET',
            headers:{
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        return json;
    }

    const getUser = async () => {
      const response = await fetch(
        `${host}/api/auth/getcurrentuser`,
        {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      return json;
    };


    return (
        <AuthContext.Provider value={{userId,loginUser,signupUser,getUsers,getUser}}>
            {props.children}
        </AuthContext.Provider>
    );
}
export default AuthState