import React from 'react'
import { useContext, useEffect, useState, useReducer } from 'react'

const AppContext = React.createContext()

const initialState = {
  user:  JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null, 
}

const authReducer = (state, action) => {
  switch(action.type) {
    case "LOGIN_START": {
      return {
        user: null,
        loading: true,
        error: null
      }
    }
    case "LOGIN_SUCCESS": {
      return {
        user: action.payload,
        loading: false,
        error: null
      }
    }
    case "LOGIN_FAILURE": {
      return {
        user: null,
        loading: false,
        error: action.payload
      }
    }
    case "LOGOUT": {
      return {
        user: null,
        loading: false,
        error: false
      }
    }
  }
}

const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AppContext.Provider value={{
      user: state.user,
      loading: state.loading,
      error: state.error,
      dispatch
    }}> 
      {children}
    </AppContext.Provider>
)} 

export const useAuthContext = () => {
  return useContext(AppContext)
}
export { AppContext, AuthContextProvider }
