import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import authContext from '../context/auth/authContext';

const Login = (props) => {

    const context = useContext(authContext);
    const { loginUser } = context;

    const [credentials,setCredentials] = useState({email:"",password:""});
    let navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await loginUser(credentials.email,credentials.password)
        navigate("/");
        
    }
    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }
  return (
    <div className='container mt-2'>
        <h2 className='my-3'>Login</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login
