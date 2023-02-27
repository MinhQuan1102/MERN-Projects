import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Posts from '../posts/Posts'
import Share from '../share/Share'
import Story from '../story/Story'
import "./feed.css"

const Feed = () => {
  const { currentUser } = useContext(AuthContext)
  return (
    <div className='feed'>
      <Story />
      <Share user={currentUser} own={true}/>
      <Posts />
    </div>
  )
}

export default Feed