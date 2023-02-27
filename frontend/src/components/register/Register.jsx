import React, { useRef, useState } from "react";
import "./register.css";
import { Link, useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const history = useHistory();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (
      !email.current.value ||
      !firstName.current.value ||
      !lastName.current.value ||
      !password.current.value ||
      !confirmPassword.current.value
    ) {
      toast({
        title: "Please fill all the fields!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      })
      return;
    }
    if (password.current.value !== confirmPassword.current.value) {
      toast({
        title: "Passwords do not match!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      })
      return;
    }
    try {
      setLoading(true);
      const user = {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        email: email.current.value,
        password: password.current.value
      }
      const response = await axios.post("http://localhost:5000/api/auth/register", user, config)
      console.log(response.data)
      setLoading(false);
      toast({
        title: "Register successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      })
      history.push("/login")
    } catch (error) {
      console.log(error)
      toast({
        title: "Please try another email!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      })
      return;
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
          <form className="loginBox">
            <input
              placeholder="First name"
              required
              className="loginInput"
              ref={firstName}
            />
            <input
              placeholder="Last name"
              required
              className="loginInput"
              ref={lastName}
            />
            <input
              placeholder="Email"
              required
              type="email"
              className="loginInput"
              ref={email}
            />
            <div className="passwordInput">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="loginInput"
                required
                ref={password}
                name="password"
                minLength="6"
              />
              {showPassword ? (
                <VisibilityIcon
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <VisibilityOffIcon
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <div className="passwordInput">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="loginInput"
                required
                ref={confirmPassword}
                name="password"
                minLength="6"
              />
              {showConfirmPassword ? (
                <VisibilityIcon
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <VisibilityOffIcon
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}
            </div>
            <button className="loginButton" type="submit" onClick={handleClick}>
              Sign up
            </button>
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
