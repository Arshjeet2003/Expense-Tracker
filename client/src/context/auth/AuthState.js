import AuthContext from './authContext.js';

const AuthState = (props)=>{
    const host = "http://localhost:5004"

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
        }
        else{
        }
    }
    const signupUser = async (name,email,password)=>{
        const response = await fetch(`${host}/api/auth/createuser`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json();
    }

    return (
        <AuthContext.Provider value={{loginUser,signupUser}}>
            {props.children}
        </AuthContext.Provider>
    );
}
export default AuthState