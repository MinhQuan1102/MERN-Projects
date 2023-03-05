import React from 'react'
import "./reactDisplay.css"
import {
  faCamera,
  faCommentAlt,
  faEllipsisH,
  faGrinAlt,
  faHeart,
  faShare,
  faThumbsUp,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "@chakra-ui/react";

const ReactDisplay = () => {
  return (
    <div className='reactDisplay'>
      <div className="header">
        <ul>
          <li className='active'>
            <p>All</p>
          </li>
          <li>Like</li>
          <li>Heart</li>
        </ul>
        <FontAwesomeIcon
          icon={faTimes}
          className="closeBtn"
        />
      </div>
    </div>
  )
}

export default ReactDisplay