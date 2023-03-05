import React from "react";
import "./reactDisplay.css";
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

const ReactDisplay = ({ post, open, setOpen }) => {
  const { like, haha, sad, wow, heart, angry } = post;
  console.log(open);
  return (
    <div className={open ? "reactDisplay" : "reactDisplay hide"}>
      <div className="reactHeader">
        <ul>
          <li className="active">
            <p>All</p>
          </li>
          <li>
            <div className="reactIconShow likeIconBg">
              <FontAwesomeIcon
                className="reactionIcon likeIcon"
                icon={faThumbsUp}
              />
            </div>
            <span>2</span>
          </li>
          <li>
            <div className="reactIconShow heartIconBg">
              <FontAwesomeIcon
                className="reactionIcon likeIcon"
                icon={faHeart}
              />
            </div>
            <span>1</span>
          </li>
        </ul>
        <FontAwesomeIcon
          icon={faTimes}
          className="closeBtn"
          onClick={() => setOpen(false)}
        />
      </div>
      <div className="reactBody">
        <ul>
          <li>
            <div className="reactBodyLeft">
              <img
                src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/273210834_3086464761611742_3914305251108406206_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GpZUB-TOXNUAX9sTisI&_nc_ht=scontent.fhan14-3.fna&oh=00_AfAAqLAZ3fS0FUSL4XOR0SMezPGZvVZGt-7A5SSdAsZiKw&oe=64095643"
                alt=""
              />
              <span>Minh Quan</span>
            </div>
            <div className="reactBodyRight">
              <div className="messenger">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    className="messengerIcon"
                    d="M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 256.55 8zm149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 15 0 0 0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0 1 53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62z"
                  />
                </svg>
              </div>
              <span>Message</span>
            </div>
          </li>

          <li>
            <div className="reactBodyLeft">
              <img
                src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/273210834_3086464761611742_3914305251108406206_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GpZUB-TOXNUAX9sTisI&_nc_ht=scontent.fhan14-3.fna&oh=00_AfAAqLAZ3fS0FUSL4XOR0SMezPGZvVZGt-7A5SSdAsZiKw&oe=64095643"
                alt=""
              />
              <span>Minh Quan</span>
            </div>
            <div className="reactBodyRight">
              <div className="messenger">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    className="messengerIcon"
                    d="M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 256.55 8zm149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 15 0 0 0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0 1 53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62z"
                  />
                </svg>
              </div>
              <span>Message</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReactDisplay;
