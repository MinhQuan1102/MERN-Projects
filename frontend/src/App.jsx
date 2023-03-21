import axios from "axios";
import { useContext, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Homepage from "./pages/homepage/Homepage";
import Profile from "./pages/profile/Profile";
import { AuthContext } from "./context/AuthContext";
import ImageDetail from "./pages/imageDetail/ImageDetail";

function App() {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    history.push("/login");
  }

  return (
    <div className="App">
      <Route path="/" exact component={Homepage} />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/post/:postId" component={ImageDetail} />
    </div>
  );
}

export default App;
