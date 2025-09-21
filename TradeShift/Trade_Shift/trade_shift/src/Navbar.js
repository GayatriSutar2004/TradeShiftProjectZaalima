import React from "react";

function Navbar({ switchPage, isLoggedIn, setIsLoggedIn }) {
  return (
    <nav className="navbar">
      <div className="logo">TradeShift</div>
      <ul>
        {isLoggedIn ? (
          <>
            <li onClick={() => switchPage("dashboard")}>Dashboard</li>
            <li onClick={() => switchPage("portfolio")}>Portfolio</li>
            <li
              onClick={() => {
                setIsLoggedIn(false);
                switchPage("login");
              }}
            >
              Logout
            </li>
          </>
        ) : (
          <>
            <li onClick={() => switchPage("login")}>Login</li>
            <li onClick={() => switchPage("register")}>Register</li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
