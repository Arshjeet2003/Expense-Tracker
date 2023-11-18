import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import authContext from '../context/auth/authContext';
import '../css/login.css'
import signup from '../images/signup.svg';
import login from '../images/login.svg';
import { auth, provider } from "../firebase";
import { signInWithPopup, signInWithRedirect} from "firebase/auth";


const Login = (props) => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const context = useContext(authContext);
  const { loginUser, signupUser, getUser } = context;

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
  });
  let navigate = useNavigate();

  const handleClickForGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        const mongoUser = await getUser();

        if (user === null) {
          console.error("No user data received.");
          return; // Exit early if no user data is available
        }

        console.log(mongoUser);

        // const userExists = await checkIfUserExists(user.email);

        if (!mongoUser) {
          // User does not exist, sign them up
          // const token = await user.getIdToken();
          
          if(await signupUser(user.displayName, user.displayName, user.email, user.email)){
            if(await loginUser(user.email, user.email)){
              navigate("/");
            }
          }
          
        } else {
          // User exists, perform login
          // const token = await user.getIdToken();
          if(await loginUser(user.email,user.email)){
            navigate("/");
          }
        }
      })
      .catch((error) => {
        // Handle errors if any
        console.error("Error signing in with Google:", error);
      });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(credentials.email, credentials.password);
    if (res) {
      navigate("/");
    } else {
    }
  };
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if(await signupUser(
      credentials.username,
      credentials.name,
      credentials.email,
      credentials.password
    )){
      if(await loginUser(credentials.email, credentials.password)){
        navigate("/");
      }
    }
    // navigate("/login");
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const responseGoogle = (response) => {
    console.log(response);
  };
  
  return (
    <div>
      <div className={`c ${isSignUpMode ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form className="sign-in-form">
              <h2 className="title">Log in</h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={onChange}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={onChange}
                />
              </div>
              <br />
              <input
                type="submit"
                defaultValue="Login"
                className="btn solid blog"
                onClick={handleSignInSubmit}
              />
              <p className="social-text">Or Log in with social platforms</p>
              <div className="social-media">
                {/* <GoogleOAuthProvider clientId="65767957886-0pl6c7uhm7t6vec85g4to2np08gc022m.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                  ;
                </GoogleOAuthProvider> */}
                {/* ; */}
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter" />
                </a>
                <button onClick={handleClickForGoogle} className="social-icon">
                  <i className="fab fa-google"></i>
                </button>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </form>
            <form className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={onChange}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={onChange}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={onChange}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={onChange}
                />
              </div>
              <input
                type="submit"
                className="btn blog"
                defaultValue="Sign up"
                onClick={handleSignUpSubmit}
              />
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter" />
                </a>
                <button onClick={handleClickForGoogle} className="social-icon">
                  <i className="fab fa-google"></i>
                </button>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <button
                className="btn transparent blog"
                id="sign-up-btn"
                onClick={() => setIsSignUpMode(true)}
                style={{ marginRight: 150 }}
              >
                Sign up
              </button>
            </div>
            <img src={signup} className="image" alt="hello i am under water" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <button
                className="btn transparent blog"
                id="sign-in-btn"
                onClick={() => setIsSignUpMode(false)}
                style={{ marginRight: 150 }}
              >
                Sign in
              </button>
            </div>
            <img src={login} className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
