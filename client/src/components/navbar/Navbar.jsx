import "./navbar.css"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../context/authContext"

const Navbar = () => {
  const { user, dispatch } = useAuthContext()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch({ type: "LOGOUT"})
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">MinhQuanBooking</span> 
        <div className="nav-Items">
          { user ? 
          <div className="navItems">
            <p>Welcome back, {user.username}</p>
            <button className="navButton" onClick={handleLogout}>Log out</button>
          </div> : 
          <>
            <button className="navButton" onClick={() => navigate('/register')}>Register</button>
            <button className="navButton" onClick={() => navigate('/login')}>Login</button>
          </>
          }    
        </div> 
      </div>
    </div>
  )
}

export default Navbar