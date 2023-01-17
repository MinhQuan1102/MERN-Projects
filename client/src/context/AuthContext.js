import React, { useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";

const AppContext = React.createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, loading, error } = state

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user))
  }, [state.user])

  return (
    <AppContext.Provider value={{ user, loading, error , dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AppContext);
};

export { AppContext, AuthContextProvider };
