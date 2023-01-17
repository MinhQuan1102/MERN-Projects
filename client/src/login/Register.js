import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const [registerForm, setRegisterForm] = useState({
    password: undefined,
    confirmPassword: undefined
  })

  const { password, confirmPassword } = registerForm

  const { user, loading, error, dispatch } = useAuthContext();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setRegisterForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        credentials
      );
      if (password !== confirmPassword) {
        dispatch({ type: "LOGIN_FAIL", payload: { message: 'Password do not match!' } });
      }
    //   dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    //   navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL", payload: error.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          id="confirmPassword"
          onChange={handleChange}
          className="lInput"
        />
        <button onClick={handleClick} className="lButton">
          Register
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;
