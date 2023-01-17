import { useContext, useRef, useState } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress"
import { Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })
  
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: credentials.email, password: credentials.password },
      dispatch
    );
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">MQSocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on MQSocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              onChange={handleChange}
              name="email"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              onChange={handleChange}
              required
              name="password"
              minLength="6"
            />
            <button className="loginButton" disabled={isFetching} type="submit">
              {isFetching ? "" : "Log in"}
            </button>
            <span className="loginForgot">Forgor Password?</span>
            <Link to="/register" className="registerButton">
              <button className="loginRegisterButton">
                {isFetching ? "" : "Create a New Account"}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
