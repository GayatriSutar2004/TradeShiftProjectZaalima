import React, { useState } from "react";
import "../App.css";

function Settings({ user, logout, onMenuClick }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">TradeShift</div>
        <ul className="menu">
          <li onClick={() => onMenuClick("dashboard")}>Portfolio</li>
          <li onClick={() => onMenuClick("orders")}>Orders</li>
          <li onClick={() => onMenuClick("analytics")}>Analytics</li>
          <li onClick={() => onMenuClick("settings")}>Settings</li>
        </ul>
      </div>

      {/* Main content */}
      <div className="settings-container">
        <div className="settings-box">
          <h2>User Profile</h2>

          <div className="profile-card">
            <label>
              <strong>Name:</strong>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label>
              <strong>Email:</strong>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
