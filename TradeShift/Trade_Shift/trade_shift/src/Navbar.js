import React from "react";

function Navbar({ switchPage }) {
  return (
    <div className="navbar">
      <h1>TradeShift</h1>
      <div>
        <button onClick={() => switchPage("login")}>Login</button>
        <button onClick={() => switchPage("register")}>Register</button>
      </div>
    </div>
  );
}

export default Navbar;
