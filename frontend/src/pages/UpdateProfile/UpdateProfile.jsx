import React from "react";
import "./updateProfile.css";

const UpdateProfile = () => {
  return (
    <div className="updateProfile">
      <div className="updateProfileContainer">
        <div className="updateProfileTitle">My Profile</div>
        <div className="updateProfileBody">
          <div className="updateProfileLeft">
            <div className="updateTitle">
              <ul>
                <li>Username</li>
                <li style={{ padding: "10px 0" }}>Name</li>
                <li>Phone number</li>
                <li>Address</li>
                <li style={{ padding: "27px 0" }}></li>
              </ul>
            </div>
            <div className="updateDetail">
              <ul>
                <li>steaky37</li>
                <li>
                  <input type="text" placeholder="Minh Quan" />
                </li>
                <li className="phoneNumber">
                  <span>0825134034</span>
                  <span className="changeText">Change</span>
                </li>
                <li>445 Au Co</li>
                <button>Save Change</button>
              </ul>
            </div>
          </div>
          <div className="updateProfileRight">
            <img
              src="https://hcth.hcmiu.edu.vn/wp-content/uploads/2022/12/no-avatar-male-2.jpg"
              alt=""
            />
            <button>Choose Picture</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
