import React, { useState } from "react";
import Navbar from "./Navbar";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings"; // Make sure this exists
import Login from "./Login";
import Register from "./Register";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleMenuClick = (menu) => {
    setPage(menu);
  };

  const currentUser = {
    name: "John Doe",
    email: "john@example.com",
    role: "Trader",
  };

  const logout = () => {
    setIsLoggedIn(false);
    setPage("login");
  };

  return (
    <div className="App">
      <Navbar switchPage={setPage} />

      {isLoggedIn ? (
        page === "orders" ? (
          <Orders onMenuClick={handleMenuClick} />
        ) : page === "analytics" ? (
          <Analytics onMenuClick={handleMenuClick} />
        ) : page === "settings" ? (
         <Settings
  user={currentUser}
  logout={logout}
  onMenuClick={handleMenuClick}   // ✅ pass the function from App.js
/>

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
