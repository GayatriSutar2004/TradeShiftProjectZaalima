import React, { useState, useEffect } from "react";
import "../App.css";

function Orders({ onMenuClick, onOrderPlaced, currentUser }) {
  // You no longer need marketData, tradeSymbol, tradeAction, tradeQuantity, handleSubmit, 
  // or the order placement logic (which was causing issues anyway, as you noted). 
  // We keep the state hooks here temporarily for simplicity, but the logic is removed.
  // const [marketData, setMarketData] = useState(...); 
  // const [tradeSymbol, setTradeSymbol] = useState(marketData[0].symbol);
  // const [tradeAction, setTradeAction] = useState("Buy");
  // const [tradeQuantity, setTradeQuantity] = useState(1);
  const [message, setMessage] = useState("");

  // const handleSubmit = async (e) => { ... (REMOVE THIS FUNCTION) ... };

  // Helper function to navigate back to the dashboard
  const handleNavigateToDashboard = () => {
    onMenuClick("dashboard");
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="logo">TradeShift</div>
        <p className="welcome-text">Welcome, {currentUser?.name || "Investor"}</p>
        <ul className="menu">
          <li onClick={() => onMenuClick("dashboard")}>Portfolio</li>
          {/* Note: Keep this current page active visually, but it won't have the order form */}
          <li onClick={() => onMenuClick("orders")}>Orders</li> 
          <li onClick={() => onMenuClick("analytics")}>Analytics</li>
          <li onClick={() => onMenuClick("settings")}>Settings</li>
        </ul>
      </div>

      <div className="main">
        {/* Replaced the old trade form with a navigation instruction card */}
        <div className="trade-section" style={{
            padding: '30px',
            border: '2px solid #007bff',
            borderRadius: '8px',
            textAlign: 'center',
            backgroundColor: '#e9f2ff'
        }}>
          <h2>Order Placement Moved</h2>
          <p style={{ fontSize: '1.1em', color: '#333', marginBottom: '20px' }}>
            To place a **Buy** or **Sell** order, please use the **Search Bar** on your main portfolio **Dashboard**.
            Once you search for a stock, you can instantly place a buy order next to the current price data.
          </p>
          <button 
            onClick={handleNavigateToDashboard}
            style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Orders;