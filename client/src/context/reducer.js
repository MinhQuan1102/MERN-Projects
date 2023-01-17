import React from 'react'

const reducer = (state, action) => {
  const {type, payload} = action
  switch (type) {
    case 'NEW_SEARCH':
      return payload
    case 'RESET_SEARCH': 
      return state
    case 'LOGIN_START': 
      return {...state, loading: true} 
    case 'LOGIN_SUCCESS': 
      return {...state, user: payload}
    case 'LOGIN_FAIL': 
      return {...state, error: payload}
    case 'LOGOUT': 
      return state
    default: 
      return state
  }
}

export default reducer