import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/ProfileModal.style.css";
import { AuthContext } from "../../context/AuthProvider";
const ProfileModal = React.forwardRef((props, profileRef) => {
  const { setLogout } = useContext(AuthContext);
  return (
    <div className="profile-modal" ref={profileRef}>
      <p className="top">Profile</p>
      <div className="bottom">
        <div className="list">
          <Link to="/profile">Profile</Link>
        </div>
        <button onClick={() => setLogout()} className="log-out">
          Log-out
        </button>
      </div>
    </div>
  );
});

export default ProfileModal;
