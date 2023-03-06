import axios from "axios";
import {
  faTimes,
  faThumbsUp,
  faEarthEurope,
  faUserGroup,
  faLock,
  faUserFriends,
  faPlay,
  faGlobeEurope,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Like from "../img/like.png";
import Haha from "../img/haha.png";
import Heart from "../img/heart.png";
import Wow from "../img/wow.png";
import Sad from "../img/sad.png";
import Angry from "../img/angry.jpg";

export const reactPost = async (postId, reactType, currentUserId, config) => {
  switch (reactType) {
    case "like":
      await axios.put(
        `http://localhost:5000/api/posts/${postId}`,
        {
          postId,
          reactType: "like",
          userId: currentUserId,
        },
        config
      );
      return;
    case "heart":
      await axios.put(
        `http://localhost:5000/api/posts/${postId}`,
        {
          postId,
          reactType: "heart",
          userId: currentUserId,
        },
        config
      );
      return;
    case "haha":
      await axios.put(
        `http://localhost:5000/api/posts/${postId}`,
        {
          postId,
          reactType: "haha",
          userId: currentUserId,
        },
        config
      );
      return;
    case "wow":
      await axios.put(
        `http://localhost:5000/api/posts/${postId}`,
        {
          postId,
          reactType: "wow",
          userId: currentUserId,
        },
        config
      );
      return;
    case "sad":
      await axios.put(
        `http://localhost:5000/api/posts/${postId}`,
        {
          postId,
          reactType: "sad",
          userId: currentUserId,
        },
        config
      );
      return;
    case "angry":
      await axios.put(
        `http://localhost:5000/api/posts/${postId}`,
        {
          postId,
          reactType: "angry",
          userId: currentUserId,
        },
        config
      );
      return;
    case "":
      await axios.put(
        `http://localhost:5000/api/posts/${postId}`,
        {
          postId,
          reactType: "",
          userId: currentUserId,
        },
        config
      );
      return;
    default:
      return "";
  }
};

export const reactComment = async (
  commentId,
  reactType,
  currentUserId,
  config
) => {
  switch (reactType) {
    case "like":
      await axios.put(
        `http://localhost:5000/api/comments/react/${commentId}`,
        {
          reactType: "like",
          userId: currentUserId,
        },
        config
      );
      return;
    case "heart":
      await axios.put(
        `http://localhost:5000/api/comments/react/${commentId}`,
        {
          reactType: "heart",
          userId: currentUserId,
        },
        config
      );
      return;
    case "haha":
      await axios.put(
        `http://localhost:5000/api/comments/react/${commentId}`,
        {
          reactType: "haha",
          userId: currentUserId,
        },
        config
      );
      return;
    case "wow":
      await axios.put(
        `http://localhost:5000/api/comments/react/${commentId}`,
        {
          reactType: "wow",
          userId: currentUserId,
        },
        config
      );
      return;
    case "sad":
      await axios.put(
        `http://localhost:5000/api/comments/react/${commentId}`,
        {
          reactType: "sad",
          userId: currentUserId,
        },
        config
      );
      return;
    case "angry":
      await axios.put(
        `http://localhost:5000/api/comments/react/${commentId}`,
        {
          reactType: "angry",
          userId: currentUserId,
        },
        config
      );
      return;
    case "":
      await axios.put(
        `http://localhost:5000/api/comments/react/${commentId}`,
        {
          reactType: "",
          userId: currentUserId,
        },
        config
      );
      return;
    default:
      return "";
  }
};

export const reactedPost = (reactType) => {
  switch (reactType) {
    case "":
      return (
        <p>
          <FontAwesomeIcon icon={faThumbsUp} className="reactButtonIcon" />
          <span>Like</span>
        </p>
      );
    case "like":
      return (
        <p>
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="reactButtonIcon likedIcon"
          />
          <span className="likedText">Like</span>
        </p>
      );
    case "heart":
      return (
        <p>
          <img src={Heart} alt="" className="reactButtonIcon reactedIcon" />
          <span className="heartedText">Love</span>
        </p>
      );
    case "haha":
      return (
        <p>
          <img src={Haha} alt="" className="reactButtonIcon reactedIcon" />
          <span className="hahaedText">Haha</span>
        </p>
      );
    case "wow":
      return (
        <p>
          <img src={Wow} alt="" className="reactButtonIcon reactedIcon" />
          <span className="wowedText">Wow</span>
        </p>
      );
    case "sad":
      return (
        <p>
          <img src={Sad} alt="" className="reactButtonIcon reactedIcon" />
          <span className="sadedText">Sad</span>
        </p>
      );
    case "angry":
      return (
        <p>
          <img src={Angry} alt="" className="reactButtonIcon reactedIcon" />
          <span className="angriedText">Angry</span>
        </p>
      );
    default:
      return "";
  }
};

export const reactDetail = (reactType) => {
  switch (reactType) {
    case "like":
      return (
        <div className="reactIconShow likeIconBg">
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="reactionIcon likeIcon"
          />
        </div>
      );
    case "heart":
      return (
        <div className="reactIconShow heartIconBg">
          <FontAwesomeIcon icon={faHeart} className="reactionIcon heartIcon" />
        </div>
      );
    case "haha":
      return (
        <div className="reactIconShow hahaIconBg">
          <img src={Haha} alt="haha" />
        </div>
      );
    case "wow":
      return (
        <div className="reactIconShow wowIconBg">
          <img src={Wow} alt="wow" />
        </div>
      );
    case "sad":
      return (
        <div className="reactIconShow sadIconBg">
          <img src={Sad} alt="sad" />
        </div>
      );
    case "angry":
      return (
        <div className="reactIconShow angryIconBg">
          <img src={Angry} alt="angry" />
        </div>
      );
    default:
      return "";
  }
};

export const reactedComment = (reactType) => {
  switch (reactType) {
    case "":
      return (
        <p>
          <span>Like</span>
        </p>
      );
    case "like":
      return (
        <p>
          <span className="likedText">Like</span>
        </p>
      );
    case "heart":
      return (
        <p>
          <span className="heartedText">Love</span>
        </p>
      );
    case "haha":
      return (
        <p>
          <span className="hahaedText">Haha</span>
        </p>
      );
    case "wow":
      return (
        <p>
          <span className="wowedText">Wow</span>
        </p>
      );
    case "sad":
      return (
        <p>
          <span className="sadedText">Sad</span>
        </p>
      );
    case "angry":
      return (
        <p>
          <span className="angriedText">Angry</span>
        </p>
      );
    default:
      return "";
  }
};

export const displayReact = (
  like,
  heart,
  wow,
  haha,
  sad,
  angry,
  currentUserId
) => {
  if (like.map((item) => item._id).includes(currentUserId)) {
    return "like";
  } else if (heart.map((item) => item._id).includes(currentUserId)) {
    return "heart";
  } else if (wow.map((item) => item._id).includes(currentUserId)) {
    return "wow";
  } else if (haha.map((item) => item._id).includes(currentUserId)) {
    return "haha";
  } else if (sad.map((item) => item._id).includes(currentUserId)) {
    return "sad";
  } else if (angry.map((item) => item._id).includes(currentUserId)) {
    return "angry";
  } else return "";
};

export const displayReactCount = (
  like,
  heart,
  wow,
  haha,
  sad,
  angry,
  handleSeeReact
) => {
  const likeCount =
    like.length +
    heart.length +
    wow.length +
    sad.length +
    haha.length +
    angry.length;
  const reactArray = [like, heart, wow, haha, sad, angry];
  const reactString = ["like", "heart", "wow", "haha", "sad", "angry"];
  const reactImages = [Like, Heart, Wow, Haha, Sad, Angry];
  if (likeCount === 0) {
    return <></>;
  } else {
    let index1 = 0;
    let index2 = -1;
    let index3 = -1;

    for (let i = 1; i < reactArray.length; i++) {
      if (reactArray[i].length >= reactArray[index1].length) {
        index3 = index2;
        index2 = index1;
        index1 = i;
      } else if (
        index2 === -1 ||
        reactArray[i].length >= reactArray[index2].length
      ) {
        index3 = index2;
        index2 = i;
      } else if (
        index3 === -1 ||
        reactArray[i].length >= reactArray[index3].length
      ) {
        index3 = i;
      }
    }
    if (reactArray[index2].length === 0) index2 = -1;
    if (reactArray[index3].length === 0) index3 = -1;

    if (index2 === -1 && index3 === -1) {
      return (
        <div
          className="iconShow low"
          onClick={() => handleSeeReact(reactString[index1])}
        >
          <img src={reactImages[index1]} alt="" />
        </div>
      );
    } else if (index2 !== -1 && index3 === -1) {
      return (
        <>
          <div
            className="iconShow low"
            onClick={() => handleSeeReact(reactString[index1])}
          >
            <img src={reactImages[index1]} alt="" />
          </div>
          <div
            className="iconShow mid"
            onClick={() => handleSeeReact(reactString[index2])}
          >
            <img src={reactImages[index2]} alt="" />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            className="iconShow low"
            onClick={() => handleSeeReact(reactString[index1])}
          >
            <img src={reactImages[index1]} alt="" />
          </div>
          <div
            className="iconShow mid"
            onClick={() => handleSeeReact(reactString[index2])}
          >
            <img src={reactImages[index2]} alt="" />
          </div>
          <div
            className="iconShow top"
            onClick={() => handleSeeReact(reactString[index3])}
          >
            <img src={reactImages[index3]} alt="" />
          </div>
        </>
      );
    }
  }
};

export const displayReactCommentCount = (
  like,
  heart,
  wow,
  haha,
  sad,
  angry
) => {
  const likeCount =
    like.length +
    heart.length +
    wow.length +
    sad.length +
    haha.length +
    angry.length;
  const reactArray = [like, heart, wow, haha, sad, angry];
  const reactImages = [Like, Heart, Wow, Haha, Sad, Angry];
  if (likeCount === 0) {
    return <></>;
  } else {
    let index1 = 0;
    let index2 = -1;
    let index3 = -1;

    for (let i = 1; i < reactArray.length; i++) {
      if (reactArray[i].length >= reactArray[index1].length) {
        index3 = index2;
        index2 = index1;
        index1 = i;
      } else if (
        index2 === -1 ||
        reactArray[i].length >= reactArray[index2].length
      ) {
        index3 = index2;
        index2 = i;
      } else if (
        index3 === -1 ||
        reactArray[i].length >= reactArray[index3].length
      ) {
        index3 = i;
      }
    }
    if (reactArray[index2].length === 0) index2 = -1;
    if (reactArray[index3].length === 0) index3 = -1;

    if (index2 === -1 && index3 === -1) {
      return (
        <div className="iconShow low">
          <img src={reactImages[index1]} alt="" />
          {likeCount > 1 && <span className="reactCount">{likeCount}</span>}
        </div>
      );
    } else if (index2 !== -1 && index3 === -1) {
      return (
        <>
          <div className="iconShow low">
            <img src={reactImages[index1]} alt="" />
          </div>
          <div className="iconShow mid">
            <img src={reactImages[index2]} alt="" />
          </div>
          {likeCount > 1 && <span className="reactCount">{likeCount}</span>}
        </>
      );
    } else {
      return (
        <>
          <div className="iconShow low">
            <img src={reactImages[index1]} alt="" />
          </div>
          <div className="iconShow mid">
            <img src={reactImages[index2]} alt="" />
          </div>
          <div className="iconShow top">
            <img src={reactImages[index3]} alt="" />
          </div>
          {likeCount > 1 && <span className="reactCount">{likeCount}</span>}
        </>
      );
    }
  }
};

export const sendFriendRequest = async (
  sentFriendRequest,
  setSentFriendRequest,
  user,
  userId,
  config,
  toast
) => {
  try {
    sentFriendRequest
      ? await axios.put(
          `http://localhost:5000/api/users/unsendFriendRequest/${user._id}`,
          { userId },
          config
        )
      : await axios.put(
          `http://localhost:5000/api/users/sendFriendRequest/${user._id}`,
          { userId },
          config
        );
    setSentFriendRequest(!sentFriendRequest);
  } catch (error) {
    toast({
      title: "An error occured!",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  }
};

export const confirmRequest = async (
  user,
  userId,
  setIsSentFriendReq,
  config,
  toast
) => {
  try {
    await axios.put(
      `http://localhost:5000/api/users/addfriend/${user._id}`,
      { userId },
      config
    );
    setIsSentFriendReq(false);
    window.location.reload();
  } catch (error) {
    toast({
      title: "An error occured!",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  }
};

export const deleteRequest = async (
  user,
  userId,
  setIsSentFriendReq,
  config,
  toast
) => {
  try {
    await axios.put(
      `http://localhost:5000/api/users/deleteFriendRequest/${user._id}`,
      { userId },
      config
    );
    setIsSentFriendReq(false);
  } catch (error) {
    toast({
      title: "An error occured!",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  }
};

export const handleFriendList = (i) => {
  switch (i) {
    case 0:
      return "a";
    case 1:
      return "b";
    case 2:
      return "c";
    case 3:
      return "d";
    case 4:
      return "e";
    default:
      return "last";
  }
};

export const followUser = async (user, userId, config, toast) => {
  try {
    await axios.put(
      `http://localhost:5000/api/users/follow/${user._id}`,
      { userId },
      config
    );
    window.location.reload();
  } catch (error) {
    toast({
      title: "An error occured!",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  }
};

export const unfollowUser = async (user, userId, config, toast) => {
  try {
    await axios.put(
      `http://localhost:5000/api/users/unfollow/${user._id}`,
      { userId },
      config
    );
    window.location.reload();
  } catch (error) {
    toast({
      title: "An error occured!",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  }
};

export const unfriend = async (user, userId, config, toast) => {
  try {
    await axios.put(
      `http://localhost:5000/api/users/unfriend/${user._id}`,
      { userId },
      config
    );
    window.location.reload();
  } catch (error) {
    toast({
      title: "An error occured!",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  }
};

export const handleStatusIcon = (status) => {
  switch (status) {
    case "Public":
      return (
        <FontAwesomeIcon icon={faEarthEurope} className="postStatusIcon" />
      );
    case "Friends":
      return (
        <FontAwesomeIcon
          icon={faUserGroup}
          className="postStatusIcon"
          style={{ fontSize: "12px" }}
        />
      );
    case "Private":
      return <FontAwesomeIcon icon={faLock} className="postStatusIcon" />;
    default:
      return "";
  }
};

// export const handleImages = (images, number, handleCloseImage, isUploaded) => {
//   if (number === 1) {
//     return (
//       <div className="imagesContainer" style={{ gridTemplateColumns: "1fr" }}>
//         {images.map((image, i) => (
//           <img
//             src={isUploaded ? image : `${process.env.PUBLIC_URL}/img/${image}`}
//             className="postImage"
//             key={i}
//             alt=""
//           />
//         ))}
//         <FontAwesomeIcon
//           icon={faTimes}
//           className="closeBtn"
//           onClick={handleCloseImage}
//         />
//       </div>
//     );
//   } else if (number === 2) {
//     return (
//       <div
//         className="imagesContainer"
//         style={{ gridTemplateColumns: "1fr 1fr" }}
//       >
//         {images.map((image, i) => (
//           <img
//             src={isUploaded ? image : `${process.env.PUBLIC_URL}/img/${image}`}
//             className={`image2${i + 1}`}
//             key={i}
//             alt=""
//           />
//         ))}
//         <FontAwesomeIcon
//           icon={faTimes}
//           className="closeBtn"
//           onClick={handleCloseImage}
//         />
//       </div>
//     );
//   } else if (number === 3) {
//     return (
//       <div
//         className="imagesContainer"
//         style={{ display: "flex", flexWrap: "wrap", gap: "0px" }}
//       >
//         {images.map((image, i) => (
//           <img
//             src={isUploaded ? image : `${process.env.PUBLIC_URL}/img/${image}`}
//             className={`image3${i + 1}`}
//             key={i}
//             style={{ borderRadius: "0px" }}
//             alt=""
//           />
//         ))}
//         <FontAwesomeIcon
//           icon={faTimes}
//           className="closeBtn"
//           onClick={handleCloseImage}
//         />
//       </div>
//     );
//   } else if (number === 4) {
//     return (
//       <div
//         className="imagesContainer"
//         style={{ gridTemplateColumns: "1fr 1fr", gridColumnGap: "0px" }}
//       >
//         {images.map((image, i) => (
//           <img
//             src={isUploaded ? image : `${process.env.PUBLIC_URL}/img/${image}`}
//             className={`image4${i + 1}`}
//             key={i}
//             alt=""
//           />
//         ))}
//         <FontAwesomeIcon
//           icon={faTimes}
//           className="closeBtn"
//           onClick={handleCloseImage}
//         />
//       </div>
//     );
//   } else if (number > 4) {
//     return (
//       <div
//         className="imagesContainer"
//         style={{ gridTemplateColumns: "1fr 1fr", gridColumnGap: "0px" }}
//       >
//         {images.slice(0, 5).map((image, i) => {
//           if (i <= 3) {
//             return (
//               <div className="normalImages" key={i}>
//                 <img
//                   src={
//                     isUploaded
//                       ? image
//                       : `${process.env.PUBLIC_URL}/img/${image}`
//                   }
//                   className={`image5${i + 1}`}
//                   alt=""
//                 />
//               </div>
//             );
//           } else {
//             return (
//               <div className="overflowImages" key={i}>
//                 <img
//                   src={
//                     isUploaded
//                       ? image
//                       : `${process.env.PUBLIC_URL}/img/${image}`
//                   }
//                   className={`image5${i + 1}`}
//                   style={{ display: i > 3 ? "none" : "initial" }}
//                   alt=""
//                 />
//                 {i === 4 && (
//                   <div className="overflowText">{`+${number - 4}`}</div>
//                 )}
//               </div>
//             );
//           }
//         })}

//         <FontAwesomeIcon
//           icon={faTimes}
//           className="closeBtn"
//           onClick={handleCloseImage}
//         />
//       </div>
//     );
//   }
// };

export const handleImages = (images, number, handleCloseImage, isUploaded) => {
  if (number === 1) {
    return (
      <div className="imagesContainer" style={{ gridTemplateColumns: "1fr" }}>
        <img
          src={isUploaded ? images[0] : URL.createObjectURL(images[0])}
          className="postImage"
          alt=""
        />
        <FontAwesomeIcon
          icon={faTimes}
          className="closeBtn"
          onClick={handleCloseImage}
        />
      </div>
    );
  } else if (number === 2) {
    return (
      <div
        className="imagesContainer"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        {images.map((image, i) => (
          <img
            src={isUploaded ? image : URL.createObjectURL(image)}
            className={`image2${i + 1}`}
            key={i}
            alt=""
          />
        ))}
        <FontAwesomeIcon
          icon={faTimes}
          className="closeBtn"
          onClick={handleCloseImage}
        />
      </div>
    );
  } else if (number === 3) {
    return (
      <div
        className="imagesContainer"
        style={{ display: "flex", flexWrap: "wrap", gap: "0px" }}
      >
        {images.map((image, i) => (
          <img
            src={isUploaded ? image : URL.createObjectURL(image)}
            className={`image3${i + 1}`}
            key={i}
            style={{ borderRadius: "0px" }}
            alt=""
          />
        ))}
        <FontAwesomeIcon
          icon={faTimes}
          className="closeBtn"
          onClick={handleCloseImage}
        />
      </div>
    );
  } else if (number === 4) {
    return (
      <div
        className="imagesContainer"
        style={{ gridTemplateColumns: "1fr 1fr", gridColumnGap: "0px" }}
      >
        {images.map((image, i) => (
          <img
            src={isUploaded ? image : URL.createObjectURL(image)}
            className={`image4${i + 1}`}
            key={i}
            alt=""
          />
        ))}
        <FontAwesomeIcon
          icon={faTimes}
          className="closeBtn"
          onClick={handleCloseImage}
        />
      </div>
    );
  } else if (number > 4) {
    return (
      <div
        className="imagesContainer"
        style={{ gridTemplateColumns: "1fr 1fr", gridColumnGap: "0px" }}
      >
        {images.slice(0, 5).map((image, i) => {
          if (i <= 3) {
            return (
              <div className="normalImages" key={i}>
                <img
                  src={isUploaded ? image : URL.createObjectURL(image)}
                  className={`image5${i + 1}`}
                  alt=""
                />
              </div>
            );
          } else {
            return (
              <div className="overflowImages" key={i}>
                <img
                  src={isUploaded ? image : URL.createObjectURL(image)}
                  className={`image5${i + 1}`}
                  style={{ display: i > 3 ? "none" : "initial" }}
                  alt=""
                />
                {i === 4 && (
                  <div className="overflowText">{`+${number - 4}`}</div>
                )}
              </div>
            );
          }
        })}

        <FontAwesomeIcon
          icon={faTimes}
          className="closeBtn"
          onClick={handleCloseImage}
        />
      </div>
    );
  }
};

export const handleDisplayTag = (username, taggedPeople) => {
  if (taggedPeople.length === 0) {
    return <span className="username">{username}</span>;
  } else if (taggedPeople.length === 1) {
    return (
      <span className="username">{`${username} is with ${taggedPeople[0].fullName.trim()}`}</span>
    );
  } else if (taggedPeople.length === 2) {
    return (
      <span className="username">{`${username} is with ${taggedPeople[0].fullName.trim()} and ${
        taggedPeople[1].fullName
      }`}</span>
    );
  } else if (taggedPeople.length === 3) {
    return (
      <span className="username">{`${username} is with ${taggedPeople[0].fullName.trim()}, ${taggedPeople[1].fullName.trim()} and ${taggedPeople[2].fullName.trim()}`}</span>
    );
  } else {
    return (
      <span className="username">{`${username} is with ${taggedPeople[0].fullName.trim()}, ${taggedPeople[1].fullName.trim()}, ${taggedPeople[2].fullName.trim()} and ${
        taggedPeople.length - 3
      } other${taggedPeople.length - 3 === 1 ? "" : "s"}`}</span>
    );
  }
};

export const pinPost = async (userId, post, config, toast) => {
  try {
    await axios.put(
      `http://localhost:5000/api/users/${userId}`,
      { userId: userId, pinnedPost: post._id },
      config
    );
    await axios.put(
      `http://localhost:5000/api/posts/unpin/${userId}`,
      {},
      config
    );
    await axios.put(
      `http://localhost:5000/api/posts/update/${post._id}`,
      { isPinned: true },
      config
    );
    window.location.reload();
  } catch (error) {
    toast({
      title: "An error occured!",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
    return;
  }
};

export const unpinPost = async (userId, post, config, toast) => {
  try {
    await axios.put(
      `http://localhost:5000/api/users/${userId}`,
      { userId: userId, pinnedPost: null },
      config
    );
    await axios.put(
      `http://localhost:5000/api/posts/update/${post._id}`,
      { isPinned: false },
      config
    );
    window.location.reload();
  } catch (error) {
    toast({
      title: "An error occured!",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
    return;
  }
};

export const deletePost = async (postId, config, toast) => {
  try {
    await axios.delete(`http://localhost:5000/api/posts/${postId}`, config);
    toast({
      title: "Delete post successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
    window.location.reload();
  } catch (error) {
    toast({
      title: "An error occured!",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
    return;
  }
};

export const handleDisplayPostStatus = (number) => {
  switch (number) {
    case 1:
      return "Public";
    case 2:
      return "Friends";
    case 3:
      return "Private";
    default:
      return "";
  }
};

export const handleConvertStatus = (status) => {
  switch (status) {
    case "Public":
      return 1;
    case "Friends":
      return 2;
    case "Private":
      return 3;
  }
};

export const handleDisplayPostStatusIcon = (number, setOpenSelectAudience) => {
  switch (number) {
    case 1:
      return (
        <FontAwesomeIcon
          icon={faGlobeEurope}
          onClick={() => setOpenSelectAudience(true)}
          className="audienceIcon"
        />
      );
    case 2:
      return (
        <FontAwesomeIcon
          icon={faUserFriends}
          onClick={() => setOpenSelectAudience(true)}
          className="audienceIcon"
        />
      );
    case 3:
      return (
        <FontAwesomeIcon
          icon={faLock}
          onClick={() => setOpenSelectAudience(true)}
          className="audienceIcon"
        />
      );
    default:
      return "";
  }
};

export const handleUpdatePicture = (post, user) => {
  if (post.isUpdatingProfilePicture) {
    return (
      <div className="username">
        <h2>{user.fullName}</h2>
        {`updated ${user.gender === 1 ? "his" : "her"} profile picture`}
      </div>
    );
  } else if (post.isUpdatingCoverPicture) {
    return (
      <div className="username">
        <h2>{user.fullName}</h2>
        {`updated ${user.gender === 1 ? "his" : "her"} cover picture`}
      </div>
    );
  } else if (post.sender) {
    return (
      <h2 className="postUsername">
        {`${post.sender.fullName} `}
        {<FontAwesomeIcon icon={faPlay} className="sendTo" />}
        {` ${user.fullName}`}
      </h2>
    );
  } else {
    return <h2 className="postUsername">{user.fullName}</h2>;
  }
};

export const handleDisplayTagTitle = (username, taggedPeople) => {
  if (taggedPeople.length === 0) {
    return (
      <span className="username">
        <h2>{username}</h2>
      </span>
    );
  } else if (taggedPeople.length === 1) {
    return (
      <span className="username">
        <h2>{username}</h2> is with <h2>{taggedPeople[0].fullName}</h2>
      </span>
    );
  } else {
    return (
      <span className="username">
        <h2>{username}</h2> is with <h2>{taggedPeople[0].fullName}</h2>
        and
        <h2>
          {taggedPeople.length - 1} other
          {taggedPeople.length - 1 === 1 ? "" : "s"}
        </h2>
      </span>
    );
  }
};

export const uploadPost = async (
  pics,
  currentUser,
  content,
  taggedFriends,
  status,
  config,
  toast
) => {
  let images = [];
  if (pics.length > 0) {
    const promises = pics.map(async (pic) => {
      const data = new FormData();
      data.append(`file`, pic);
      data.append("upload_preset", "MQSocial");
      data.append("cloud_name", "dvvyj75uf");
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dvvyj75uf/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const json = await response.json();
        return json.url.toString();
      } catch (error) {
        toast({
          title: "Error uploading images!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
    });
    images = await Promise.all(promises);

    console.log("with pics");
    console.log(images);
    try {
      await axios.post(
        `http://localhost:5000/api/posts`,
        {
          user: currentUser._id,
          content: content,
          images: images,
          status: status,
          taggedFriends: taggedFriends,
        },
        config
      );
      toast({
        title: "Upload post with images successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error uploading post!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  } else {
    console.log("no images");
    try {
      await axios.post(
        `http://localhost:5000/api/posts`,
        {
          user: currentUser._id,
          content: content,
          taggedFriends: taggedFriends,
          status: status,
        },
        config
      );
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error uploading post!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  }
};

export const editPost = async (
  pics,
  post,
  content,
  taggedFriends,
  status,
  config,
  toast
) => {
  let images = [];
  if (pics.length > 0) {
    const promises = pics.map(async (pic) => {
      const data = new FormData();
      data.append(`file`, pic);
      data.append("upload_preset", "MQSocial");
      data.append("cloud_name", "dvvyj75uf");
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dvvyj75uf/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const json = await response.json();
        return json.url.toString();
      } catch (error) {
        toast({
          title: "Error uploading images!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
    });
    images = await Promise.all(promises);

    console.log("with pics");
    console.log(images);
    try {
      await axios.put(
        `http://localhost:5000/api/posts/update/${post._id}`,
        {
          content: content,
          images: images,
          status: status,
          taggedFriends: taggedFriends,
        },
        config
      );
      toast({
        title: "Update post with images successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error uploading post!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  } else {
    console.log("no images");
    try {
      await axios.put(
        `http://localhost:5000/api/posts/update/${post._id}`,
        {
          content: content,
          taggedFriends: taggedFriends,
          status: status,
        },
        config
      );
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error uploading post!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  }
};

export const handleDragOver = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
};

export const handleDrop = (e, images, inputRef, setImages) => {
  e.preventDefault();
  const newImages = [...images];
  const promises = [];
  if (!inputRef.current) {
    inputRef.current = e.target;
  }

  for (let i = 0; i < e.dataTransfer.files.length; i++) {
    const file = e.dataTransfer.files[i];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    promises.push(
      new Promise((resolve) => {
        reader.onload = () => {
          const dataURL = reader.result;
          const newFile = new File([dataURL], file.name, { type: file.type });
          newImages.push(newFile);
          setImages(newImages);
          resolve();
        };
      })
    );
  }
};

export const handleReactPost = (
  userId,
  postId,
  reactType,
  setReacted,
  setIsOpenReactIcons,
  config,
  toast
) => {
  try {
    reactPost(postId, reactType, userId, config);
    setIsOpenReactIcons(false);
    setReacted(reactType);
  } catch (error) {
    toast({
      title: "An error occurred",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
    setIsOpenReactIcons(false);
    return;
  }
};

export const handleReactComment = (
  userId,
  commentId,
  reactType,
  setReacted,
  setIsOpenReactIcons,
  config,
  toast
) => {
  try {
    reactComment(commentId, reactType, userId, config);
    setIsOpenReactIcons(false);
    setReacted(reactType);
  } catch (error) {
    toast({
      title: "An error occurred",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
    setIsOpenReactIcons(false);
    return;
  }
};

export const handleComment = async (
  e,
  post,
  currentUser,
  commentText,
  setCommentText,
  images,
  setImages,
  setComments,
  config,
  toast
) => {
  if (e.key === "Enter") {
    try {
      const newComment = {
        userId: currentUser._id,
        content: commentText,
        images: images,
      };
      await axios.post(
        `http://localhost:5000/api/comments/${post._id}`,
        newComment,
        config
      );
      toast({
        title: "Comment successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setCommentText("");
      setImages([]);
      fetchComments(post._id, setComments, config, toast);
    } catch (error) {
      toast({
        title: "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  }
};

export const fetchComments = async (postId, setComments, config, toast) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/comments/${postId}`,
      config
    );
    setComments(response.data.comments);
  } catch (error) {
    toast({
      title: "An error occurred",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  }
};

export const displayUserAvaReact = (
  user,
  like,
  heart,
  haha,
  wow,
  sad,
  angry
) => {
  if (like.map((like) => like._id).includes(user._id)) {
    return (
      <div className="userAvatar">
        <img src={user.avatar} alt="" />
        <div className="reactIconShow likeIconBg">
          <FontAwesomeIcon
            className="reactionIcon likeIcon"
            icon={faThumbsUp}
          />
        </div>
      </div>
    );
  } else if (heart.map((heart) => heart._id).includes(user._id)) {
    return (
      <div className="userAvatar">
        <img src={user.avatar} alt="" />
        <div className="reactIconShow heartIconBg">
          <FontAwesomeIcon className="reactionIcon likeIcon" icon={faHeart} />
        </div>
      </div>
    );
  } else if (haha.map((haha) => haha._id).includes(user._id)) {
    return (
      <div className="userAvatar">
        <img src={user.avatar} alt="" />
        <div className="reactIconShow hahaIconBg">
          <img src={Haha} alt="haha" />
        </div>
      </div>
    );
  } else if (wow.map((wow) => wow._id).includes(user._id)) {
    return (
      <div className="userAvatar">
        <img src={user.avatar} alt="" />
        <div className="reactIconShow wowIconBg">
          <img src={Wow} alt="wow" />
        </div>
      </div>
    );
  } else if (sad.map((sad) => sad._id).includes(user._id)) {
    return (
      <div className="userAvatar">
        <img src={user.avatar} alt="" />
        <div className="reactIconShow sadIconBg">
          <img src={Sad} alt="sad" />
        </div>
      </div>
    );
  } else if (angry.map((angry) => angry._id).includes(user._id)) {
    return (
      <div className="userAvatar">
        <img src={user.avatar} alt="" />
        <div className="reactIconShow angryIconBg">
          <img src={Angry} alt="angry" />
        </div>
      </div>
    );
  }
};
