import { createContext, useReducer, useState } from 'react'
import { postReducer } from '../reducers/postReducer'
import { apiUrl } from './constants'
import axios from 'axios'

export const PostContext = createContext()

const PostContextProvider = ({children}) => {
  const initialState = {
    post: null,
    posts: [],
    postsLoading: true
  }
  const [postState, dispatch] = useReducer(postReducer, initialState)

  const [showAddPostModal, setShowAddPostModal] = useState(false)
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)

  const [showToast, setShowToast] = useState({
    show: false, 
    message: '',
    type: null
  })
  // Get all posts
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`)
      if (response.data.success) {
        dispatch({ type: 'POSTS_LOADED_SUCCESS', payload: response.data.posts})
      }
    } catch (error) {
      dispatch({ type: 'POSTS_LOADED_FAILED'})
    }
  }

  // Add a new post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost)
      if (response.data.success) {
        dispatch({ type: 'ADD_POST', payload: response.data.post})
        return response.data
      }
    } catch (error) {
      return error.response.data ? error.response.data : {success: false, message: 'Server error'}
    }
  }

  // Find a post by user's choice
  const findPost = (postId) => {
    const post = postState.posts.find((item) => item._id === postId)
    dispatch({ type: 'FIND_POST', payload: post})
  }

  // Update a post
  const updatePost = async (updatedPost) => {
    try {
      const response = await axios.put(`${apiUrl}/posts/${updatedPost._id}`, updatedPost)
      if (response.data.success) {
        dispatch({ type: 'UPDATE_POST', payload: response.data.post})
        return response.data
      }
    } catch (error) {
      return error.response.data ? error.response.data : {success: false, message: 'Server error'}
    }
  }

  // Delete a post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`)
      const {success, message} = response.data
      if (response.data.success) {
        dispatch({ type: 'DELETE_POST', payload: postId})
        setShowToast({show: true, message: message, type: success ? 'success' : 'danger'})
      }
    } catch (error) {
      console.log(error)
    }
  }

  return <PostContext.Provider value={{
    postState, 
    getPosts, 
    showAddPostModal, 
    setShowAddPostModal, 
    showUpdatePostModal,
    setShowUpdatePostModal,
    addPost, 
    showToast, 
    setShowToast,
    findPost,
    updatePost,
    deletePost
  }}>
    {children}
  </PostContext.Provider>
}

export default PostContextProvider