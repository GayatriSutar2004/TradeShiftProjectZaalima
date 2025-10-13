import React, { useState } from "react";
import "../App.css";
import TradingViewChart from "./TradingViewChart";

function Orders({ onMenuClick, currentUser }) {
  const [inputSymbol, setInputSymbol] = useState("AAPL");
  const [searchedStock, setSearchedStock] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [tradeQuantity, setTradeQuantity] = useState(1);
  const [message, setMessage] = useState("");

  // ✅ Search for a stock (mock demo version)
  const handleSearch = async () => {
    if (inputSymbol.trim() === "") return;
    const symbol = inputSymbol.trim().toUpperCase();
    setSearchLoading(true);

    try {
      // Mock stock data for demo purposes
      const mockData = {
        symbol: symbol,
        name: `${symbol} Stock`,
        price: parseFloat((Math.random() * 500 + 50).toFixed(2)),
        change: parseFloat((Math.random() * 10 - 5).toFixed(2)),
        changePercent: parseFloat((Math.random() * 5 - 2.5).toFixed(2)),
        volume: Math.floor(Math.random() * 10000000),
      };

      await new Promise((resolve) => setTimeout(resolve, 500)); // simulate delay
      setSearchedStock(mockData);
      setMessage("");
    } catch (err) {
      console.error("Error fetching stock data:", err);
      setSearchedStock(null);
      setMessage("Failed to fetch stock data.");
    } finally {
      setSearchLoading(false);
    }
  };

  // ✅ Handle Buy action
  const handleBuy = () => {
    if (!searchedStock) return;
    const price = searchedStock.price;
    const quantity = parseInt(tradeQuantity);
    setMessage(`✅ Bought ${quantity} share(s) of ${searchedStock.symbol} at $${price.toFixed(2)}.`);
    setTradeQuantity(1);
  };

  // ✅ Handle Sell action
  const handleSell = () => {
    if (!searchedStock) return;
    const price = searchedStock.price;
    const quantity = parseInt(tradeQuantity);
    setMessage(`❌ Sold ${quantity} share(s) of ${searchedStock.symbol} at $${price.toFixed(2)}.`);
    setTradeQuantity(1);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">TradeShift</div>
        <p className="welcome-text">Welcome, {currentUser?.name || "Investor"}</p>
        <ul className="menu">
          <li onClick={() => onMenuClick("dashboard")}>Portfolio</li>
          <li className="active">Orders</li>
          <li onClick={() => onMenuClick("analytics")}>Analytics</li>
          <li onClick={() => onMenuClick("settings")}>Settings</li>
        </ul>
      </div>

      {/* Main Section */}
      <div className="main">
        <h2>📈 Place Your Orders</h2>

        {/* Search Section */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
            maxWidth: "500px",
          }}
        >
          <input
            type="text"
            value={inputSymbol}
            onChange={(e) => setInputSymbol(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter stock symbol (e.g., AAPL, TSLA)"
            style={{
              flex: "3",
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
          <button
            onClick={handleSearch}
            disabled={searchLoading}
            style={{
              flex: "1",
              padding: "10px",
              fontSize: "14px",
              cursor: searchLoading ? "not-allowed" : "pointer",
              backgroundColor: searchLoading ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            {searchLoading ? "Loading..." : "Search"}
          </button>
        </div>

        {/* Chart & Trade Panel */}
        {searchedStock && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 1fr",
              gap: "20px",
              marginBottom: "30px",
              alignItems: "start",
            }}
          >
            {/* Chart */}
            <div style={{ minHeight: "400px" }}>
              <TradingViewChart symbol={searchedStock.symbol} />
            </div>

            {/* Trade Panel */}
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                border: "1px solid #dee2e6",
              }}
            >
              <h4
                style={{
                  margin: "0 0 15px 0",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "10px",
                }}
              >
                Quick Trade: {searchedStock.symbol}
              </h4>

              <p style={{ marginBottom: "5px" }}>
                <strong>Price:</strong>{" "}
                <span style={{ fontSize: "1.2em", fontWeight: "bold" }}>
                  ${searchedStock.price.toFixed(2)}
                </span>
              </p>
              <p style={{ marginBottom: "15px" }}>
                <strong>Change:</strong>{" "}
                <span
                  style={{
                    color: searchedStock.change >= 0 ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {searchedStock.change >= 0 ? "+" : ""}
                  ${searchedStock.change.toFixed(2)} (
                  {searchedStock.changePercent.toFixed(2)}%)
                </span>
              </p>

              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Buy from here:
                  <button style={{ marginTop: "10px", background: "#5bac88ff" }}
          onClick={() => onMenuClick("dashboard")}
        >Buy/Sell</button>
                </label>
               
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                
              </div>
            </div>
          </div>
        )}

        {/* Status Message */}
        {message && (
          <div
            style={{
              padding: "15px",
              borderRadius: "5px",
              marginTop: "20px",
              backgroundColor: "#e9f7ef",
              border: "1px solid #c3e6cb",
              color: "#155724",
              fontWeight: "bold",
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
