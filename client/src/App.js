import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import { io } from "socket.io-client";

function App() {
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io("ws://localhost:8900"));
  }, []);

  useEffect(() => {
    socket?.emit("addUser", user?._id);
  }, [socket, user]);

  console.log(socket)

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home socket={socket}/> : <Login />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger socket={socket} />}
        </Route>
        <Route path="/profile/:username">
          <Profile socket={socket}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
