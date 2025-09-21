import React, { useState } from "react";
import Navbar from "./Navbar";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import Login from "./Login";
import Register from "./Register";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleMenuClick = (menu) => {
    setPage(menu);
  };

  return (
    <div>
      <Navbar switchPage={setPage} />
      {isLoggedIn ? (
        page === "orders" ? (
          <Orders onMenuClick={handleMenuClick} />
        ) : (
          <Dashboard onMenuClick={handleMenuClick} />
        )
      ) : page === "login" ? (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <Register onRegisterSuccess={() => setPage("login")} />
      )}
    </div>
  );
}

export default App;