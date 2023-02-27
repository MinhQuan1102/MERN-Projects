import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || ""
  );
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem("searchHistory")) || []
  );

  const [blur, setBlur] = useState(false);

  const history = useHistory();
  const handleNoAva = (user) => {
    return user.gender === 1
      ? "https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA="
      : "https://gextoneducation.com/wp-content/uploads/2015/06/no-avatar-female.png";
  };

  useEffect(() => {
    if (!currentUser) history.push("/login");
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        handleNoAva,
        token,
        setToken,
        blur,
        setBlur,
        searchHistory,
        setSearchHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
