import axios from "axios";
import { useContext, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { AuthContext } from "./context/AuthContext";
import Homepage from "./pages/homepage/Homepage";
import Profile from "./pages/profile/Profile";
import { useToast } from "@chakra-ui/react";

function App() {
  const { currentUser, setCurrentUser, token } = useContext(AuthContext);
  const history = useHistory();
  const toast = useToast();

  if (!currentUser) {
    history.push("/login");
  }

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const refetchCurrentUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${currentUser._id}`,
        config
      );
      setCurrentUser(response.data.user)
    } catch (error) {
      toast({
        title: "An error occured!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    refetchCurrentUser()
  }, []) 

  return (
    <div className="App">
      <Route path="/" exact component={Homepage} />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </div>
  );
}

export default App;
