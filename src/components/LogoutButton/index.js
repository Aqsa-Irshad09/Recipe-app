import React from "react";

const LogoutButton = ({ onLogout }) => {
  return (
    <button className="logoutBtn" onClick={onLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
