import React from 'react'
import { useContext, useEffect, useState, useReducer } from 'react'

const AppContext = React.createContext()

const initialState = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined
  }
}

const searchReducer = (state, action) => {
  switch(action.type) {
    case "NEW_SEARCH": 
      return action.payload
    }
}

const SearchContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(searchReducer, initialState)
  let startDate, endDate
  const dayTime = 1000 * 60 * 60 * 24
  if (state.dates.length == 1) {
    startDate = state.dates[0].startDate.getTime()
    endDate = state.dates[0].endDate.getTime()
    
  } else {
    startDate = new Date().getTime()
    endDate = new Date().getTime()
  }
  const daysDiff = endDate - startDate
  const dayBookHotel = daysDiff / dayTime 
  return (
    <AppContext.Provider value={{
      state, 
      dayBookHotel,
      dispatch
    }}> 
      {children}
    </AppContext.Provider>
)} 

export const useSearchContext = () => {
  return useContext(AppContext)
}
export { AppContext, SearchContextProvider }
