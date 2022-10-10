import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import "./login.css";

const Login = () => {
  const navigate = useNavigate()
  const { user, loading, error, dispatch } = useAuthContext()
  const [userInfo, setUserInfo] = useState({
    username: undefined,
    password: undefined
  })
  const [errorInfo, setErrorInfo] = useState(null)

  const handleChange = (e) => {
    setUserInfo({...userInfo, [e.target.id]: e.target.value})
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: "LOGIN_START"})
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', userInfo)
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data.details})
      navigate('/')
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
      <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          id="username"
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
        
        <button className="lButton" onClick={handleSubmit}>
          Login
        </button>
        {errorInfo && <span>{errorInfo.message}</span>}
        <p>Don't have an account? <Link to='/register'>Register</Link></p>
      </div>
    </div>
  );
};

export default Login;