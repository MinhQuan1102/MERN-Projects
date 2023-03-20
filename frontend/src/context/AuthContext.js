import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || ""
  );

  const history = useHistory();

  useEffect(() => {
    if (!currentUser) history.push("/");
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
