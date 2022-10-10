import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import "./login.css";

const Login = () => {
  const navigate = useNavigate()
  const { user, loading, error, dispatch } = useAuthContext()
  const [userInfo, setUserInfo] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined
  })
  const [errorInfo, setErrorInfo] = useState(null)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const handleChange = (e) => {
    setUserInfo({...userInfo, [e.target.id]: e.target.value})
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: "LOGIN_START"})
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userInfo)
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data.details})
      setLoginSuccess(true)
      setTimeout(() => {
        setLoginSuccess(false)
      }, 3000)
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data})
    }
  }

  useEffect(() => {
    setErrorInfo(error)
    setTimeout(() => {
      setErrorInfo(null)
    }, 3000)
  }, [error])

  return (
    <div className="login">
      <div className="lContainer">
      <h1>Register</h1>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="lInput"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="lInput"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Phone"
          id="phone"
          className="lInput"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="lInput"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          id="confirmPassword"
          className="lInput"
          onChange={handleChange}
        />
       
        <button className="lButton" onClick={handleSubmit}>
          Register
        </button>
        {errorInfo && <span>{errorInfo.message}</span>}
        {loginSuccess && <span>Register successfully!</span>}
        <p>Already have an account? <Link to='/login'>Login</Link></p>
      </div>
    </div>
  );
};

export default Login;