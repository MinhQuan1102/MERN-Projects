import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import UserBadge from "../userBadge/UserBadge";

const Username = ({ user, postDetail }) => {
  const [openUserBadge, setOpenUserBadge] = useState(false);
  const history = useHistory()
  return (
    <div className="username" style={{ position: "relative" }} onClick={() => history.push(`/profile/${user._id}`)}>
      <h2
        onMouseOver={() => setOpenUserBadge(true)}
        onMouseLeave={() => setOpenUserBadge(false)}
      >
        {user.fullName}
      </h2>
      <UserBadge user={user} open={openUserBadge} setOpen={setOpenUserBadge} postDetail={postDetail}/>
    </div>
  );
};

export default Username;
