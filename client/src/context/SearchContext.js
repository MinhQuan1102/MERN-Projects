import React, { useContext, useReducer } from "react"
import reducer from './reducer'

const AppContext = React.createContext()

const initialState = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

const SearchContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { city, dates, options } = state


  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  )
}

export const useSearchContext = () => {
  return useContext(AppContext)
}

export { AppContext, SearchContextProvider }


