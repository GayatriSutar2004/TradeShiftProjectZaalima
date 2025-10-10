import React, { useState } from "react";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import Analytics from "./components/Analytics";

function App() {
  const [currentView, setCurrentView] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const [orderUpdate, setOrderUpdate] = useState(null);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCurrentView("dashboard");
  };

  const handleMenuClick = (view) => {
    setCurrentView(view);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView("login");
    setOrderUpdate(null);
  };

  const handleOrderPlaced = (orderData) => {
    setOrderUpdate(orderData);
    setTimeout(() => setOrderUpdate(null), 100);
  };

  return (
    <div className="App">
      {currentView === "login" && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          switchPage={setCurrentView}
        />
      )}

      {currentView === "register" && <Register switchPage={setCurrentView} />}

      {currentView === "dashboard" && (
        <Dashboard
          onMenuClick={handleMenuClick}
          currentUser={currentUser}
          onLogout={handleLogout}
          orderUpdate={orderUpdate}
        />
      )}

      {currentView === "orders" && (
        <Orders
          onMenuClick={handleMenuClick}
          currentUser={currentUser}
          onOrderPlaced={handleOrderPlaced}
        />
      )}

      {currentView === "analytics" && (
        <Analytics onMenuClick={handleMenuClick} currentUser={currentUser} />
      )}

      {currentView === "settings" && (
        <div className="dashboard">
          <div className="sidebar">
            <div className="logo">TradeShift</div>
            <p className="welcome-text">
              Welcome, {currentUser?.name || "Investor"}
            </p>
            <ul className="menu">
              <li onClick={() => handleMenuClick("dashboard")}>Portfolio</li>
              <li onClick={() => handleMenuClick("orders")}>Orders</li>
              <li onClick={() => handleMenuClick("analytics")}>Analytics</li>
              <li onClick={() => handleMenuClick("settings")}>Settings</li>
              <li onClick={handleLogout} style={{ color: "red" }}>
                Logout
              </li>
            </ul>
          </div>
          <div className="main">
            <h2>Settings</h2>
            <p
              style={{
                textAlign: "center",
                padding: "50px",
                color: "#666",
              }}
            >
              Settings features coming soon...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
