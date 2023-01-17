import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined
  })

  const { user, loading, error, dispatch } = useAuthContext();

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value}))

  }

  const handleClick = async (e) => {
    e.preventDefault()
    dispatch({ type: 'LOGIN_START' })
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials)
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.details })
      navigate('/')
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL', payload: error.response.data})
    }
  }

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
        <button onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
}

export default Login