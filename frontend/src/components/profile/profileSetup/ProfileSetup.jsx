import { faBars, faCog, faSliders, faThLarge } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "./profileSetup.css"

const ProfileSetup = () => {
  return (
    <div className='profileSetup'>
      <div className="profileSetupContainer">
        <span>Posts</span>
        <div className="filterBtn">
          <button>
            <FontAwesomeIcon icon={faSliders} className="filterIcon" /> 
            Filters
          </button>
          <button>
            <FontAwesomeIcon icon={faCog} className="filterIcon" /> 
            Manage Posts
          </button>
        </div>
      </div>

      <div className="listType">
        <div className="filterList activeNavbar">
          <FontAwesomeIcon icon={faBars} className="typeIcon"/> List View
        </div>
        <div className="filterList">
          <FontAwesomeIcon icon={faThLarge} className="typeIcon"/> Grid View
        </div>
      </div>
    </div>
  )
}

export default ProfileSetup