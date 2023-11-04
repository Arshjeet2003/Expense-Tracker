import React,{useState,useContext} from 'react'
import { Await, useNavigate } from 'react-router-dom';
import authContext from '../context/auth/authContext';

const Signup = (props) => {

    const context = useContext(authContext);
    const { signupUser } = context;
    const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
    let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(credentials.cpassword===credentials.password){
            console.log(credentials.password);
           await signupUser(credentials.name,credentials.email,credentials.password);
        }
        navigate("/login");
    }
        
    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }

  return (
    <div className='container mt-3'>
        <h2 className='mt-3'>Create an account</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" onChange={onChange}  aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Signup
