import { useState, useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Google from "../../img/googleIcon.png";
import Github from "../../img/githubIcon.png";
import axios from "axios";
import "./login.css";
import { useToast } from "@chakra-ui/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { AuthContext } from "../../context/AuthContext";
import { DarkModeContext } from "../../context/DarkModeContext";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { setCurrentUser, setToken } = useContext(AuthContext);
  // const { setDarkMode } = useContext(DarkModeContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const email = useRef();
  const password = useRef();
  const history = useHistory();
  const toast = useToast();

  const google = () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
    console.log("google")
  };

  const github = () => {
    window.open("http://localhost:5000/api/auth/github", "_self");
  };

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!email.current.value || !password.current.value) {
      toast({
        title: "Please fill all the fields!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      setLoading(true);
      const user = {
        email: email.current.value,
        password: password.current.value,
      };
      const response = await axios.post(
        `http://localhost:5000/api/auth/login`,
        user,
        config
      );
      setLoading(false);
      setCurrentUser(response.data.user);
      setToken(response.data.user.token);
      toast({
        title: "Login successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      })
      history.push("/");
    } catch (error) {
      toast({
        title: "Wrong username or password",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
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
              type="email"
              placeholder="Email"
              className="loginInput"
              name="email"
              ref={email}
              required
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
                  className="showIcon"
                />
              ) : (
                <VisibilityOffIcon
                  onClick={() => setShowPassword(!showPassword)}
                  className="showIcon"
                />
              )}
            </div>

            <button className="loginButton" type="submit" onClick={handleClick}>
              Log in
            </button>
            <hr className="line" />
            <div className="oauthLogin">
              <button className="googleLogin" onClick={google}>
                <img src={Google} className="googleIcon" />
                <span>Google</span>
              </button>
              <button className="githubLogin">
                <img src={Github} className="githubIcon" />
                <span>Github</span>
              </button>
            </div>
            <span className="loginForgot">Forgor Password?</span>
            <Link to="/register" className="registerButton">
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
