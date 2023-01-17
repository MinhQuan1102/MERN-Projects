import axios from "axios";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "./register.css";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const history = useHistory()

  const handleClick = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      password.current.setCustomValidity("Passwords don't match!")
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      }
      try {
        const res = await axios.post("/auth/register", user)
        history.push("/login")
      } catch (error) {
        console.log(error)
      }
    }
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
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              type="email"
              ref={email}
              className="loginInput"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              type="password"
              className="loginInput"
              minLength="6"
            />
            <input
              placeholder="Confirm Password"
              required
              ref={confirmPassword}
              type="password"
              className="loginInput"
            />
            <button className="loginButton" type="submit">Sign up</button>
            <Link to="/login" className="navigateLoginButton">
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
