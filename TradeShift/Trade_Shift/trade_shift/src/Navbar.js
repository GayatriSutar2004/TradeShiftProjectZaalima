import React from "react";
import "./App.css";

function Navbar({ isLoggedIn, currentUser, onLogout, switchPage }) {
  return (
    <div className="navbar">
      <h1 className="logo">TradeShift</h1>
      <div className="nav-right">
        {isLoggedIn && currentUser ? (
          <>
            <span className="welcome-text">Welcome, {currentUser.name}</span>
            <button className="nav-btn" onClick={() => switchPage("dashboard")}>
              Dashboard
            </button>
            <button className="nav-btn" onClick={() => switchPage("orders")}>
              Orders
            </button>
            <button className="nav-btn" onClick={() => switchPage("analytics")}>
              Analytics
            </button>
            <button className="nav-btn" onClick={() => switchPage("settings")}>
              Settings
            </button>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="nav-btn" onClick={() => switchPage("login")}>
              Login
            </button>
            <button className="nav-btn" onClick={() => switchPage("register")}>
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
