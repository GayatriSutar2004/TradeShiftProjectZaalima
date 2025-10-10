import React, { useState, useEffect, useCallback } from "react";
import TradingViewChart from "./TradingViewChart";

function Dashboard({ onMenuClick, currentUser, onLogout, orderUpdate }) {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchSymbol, setSearchSymbol] = useState("AAPL");
  const [searchedStock, setSearchedStock] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [holdings, setHoldings] = useState([
    { symbol: "AAPL", name: "Apple Inc", quantity: 10, avgPrice: 180 },
    { symbol: "TSLA", name: "Tesla Inc", quantity: 5, avgPrice: 250 },
  ]);
  const [transactions, setTransactions] = useState([
    { date: "2025-10-10", type: "BUY", symbol: "AAPL", quantity: 10, price: 180 },
    { date: "2025-10-09", type: "BUY", symbol: "TSLA", quantity: 5, price: 250 },
  ]);
  const [inputSymbol, setInputSymbol] = useState(searchSymbol);
  const [tradeQuantity, setTradeQuantity] = useState(1); // Used for the Quick Trade Panel

  // Centralized function to process any order (Buy from Quick Trade or Sell from Holdings/Orders component)
  const processOrderUpdate = useCallback((update) => {
    const { transaction, action, symbol, quantity } = update;

    // Update holdings
    setHoldings((prev) => {
      const existingIndex = prev.findIndex((h) => h.symbol === symbol);
      if (action === "Buy") {
        if (existingIndex >= 0) {
          const updated = [...prev];
          const holding = updated[existingIndex];
          const totalQuantity = holding.quantity + quantity;
          const totalCost = holding.quantity * holding.avgPrice + quantity * transaction.price;
          updated[existingIndex] = {
            ...holding,
            quantity: totalQuantity,
            avgPrice: totalCost / totalQuantity,
          };
          return updated;
        } else {
          // New holding
          return [
            ...prev,
            {
              symbol: symbol,
              name: transaction.name || symbol,
              quantity: quantity,
              avgPrice: transaction.price,
            },
          ];
        }
      } else if (action === "Sell") {
        if (existingIndex >= 0) {
          const updated = [...prev];
          const newQuantity = updated[existingIndex].quantity - quantity;
          if (newQuantity <= 0) {
            // Remove holding if all sold
            return updated.filter((h) => h.symbol !== symbol);
          } else {
            // Update quantity
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: newQuantity,
            };
            return updated;
          }
        }
      }
      return prev;
    });

    // Add transaction to history
    setTransactions((prev) => [transaction, ...prev]);
  }, []);

  // Fetch demo market data (Bitcoin and INR)
  useEffect(() => {
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((res) => res.json())
      .then((data) => {
        const updatedData = [
          { symbol: "BTC", name: "Bitcoin", price: data.bpi.USD.rate_float, change: Math.random() * 2 - 1 },
          { symbol: "INR", name: "Indian Rupee Index", price: data.bpi.INR.rate_float, change: Math.random() * 2 - 1 },
        ];
        setMarketData(updatedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching market data:", err);
        setLoading(false);
      });
  }, []);

  // Handle order updates from Orders component (still necessary if the Orders page is ever active)
  useEffect(() => {
    if (orderUpdate) {
      processOrderUpdate(orderUpdate);
    }
  }, [orderUpdate, processOrderUpdate]);


  // Quick Trade Handler: Buy Stock
  const handleQuickBuy = () => {
    if (!searchedStock || tradeQuantity <= 0 || !searchedStock.price) return;

    const quantity = parseInt(tradeQuantity);
    const price = parseFloat(searchedStock.price);

    const newTransaction = {
      date: new Date().toISOString().split("T")[0],
      type: "BUY",
      symbol: searchedStock.symbol,
      name: searchedStock.name,
      quantity: quantity,
      price: price,
    };

    const update = {
      transaction: newTransaction,
      action: "Buy",
      symbol: searchedStock.symbol,
      quantity: quantity,
    };

    processOrderUpdate(update);
    alert(`Successfully bought ${quantity} share(s) of ${searchedStock.symbol} at $${price.toFixed(2)}.`);
    setTradeQuantity(1); // Reset quantity
  };

  // Quick Trade Handler: Sell Stock (only sell what the user currently holds)
  const handleQuickSell = () => {
    if (!searchedStock || tradeQuantity <= 0) return;

    const holding = holdings.find((h) => h.symbol === searchedStock.symbol);
    const quantity = parseInt(tradeQuantity);

    if (!holding || holding.quantity < quantity) {
        alert(`Error: You only hold ${holding ? holding.quantity : 0} shares of ${searchedStock.symbol}.`);
        return;
    }
    
    // Simulate a sell at the average price for simplicity
    const price = holding.avgPrice; 

    const sellTransaction = {
        date: new Date().toISOString().split("T")[0],
        type: "SELL",
        symbol: holding.symbol,
        name: holding.name,
        quantity: quantity,
        price: price, 
    };

    const update = {
        transaction: sellTransaction,
        action: "Sell",
        symbol: holding.symbol,
        quantity: quantity,
    };

    processOrderUpdate(update);
    alert(`Successfully sold ${quantity} share(s) of ${searchedStock.symbol} at $${price.toFixed(2)}.`);
    setTradeQuantity(1); // Reset quantity
  };
  
  // Sell All from Holdings table
  const handleSellAll = (symbol) => {
    const holding = holdings.find((h) => h.symbol === symbol);
    if (!holding) return;

    const quantityToSell = holding.quantity;
    
    // Simulate a sell at the average price for simplicity
    const sellTransaction = {
      date: new Date().toISOString().split("T")[0],
      type: "SELL",
      symbol: holding.symbol,
      name: holding.name,
      quantity: quantityToSell,
      price: holding.avgPrice,
    };

    const update = {
        transaction: sellTransaction,
        action: "Sell",
        symbol: holding.symbol,
        quantity: quantityToSell,
    };

    processOrderUpdate(update);
  };
  
  // Search logic (remains mostly the same, but simplified for clarity)
  const handleSearch = async () => {
      if (inputSymbol.trim() === "") return;

      const symbol = inputSymbol.trim().toUpperCase();
      setSearchSymbol(symbol);
      setSearchLoading(true);

      // Simulate API call for data
      try {
          // --- Mock/Fallback Data Generation (as API keys are complex for demos) ---
          const mockData = {
              symbol: symbol,
              name: `${symbol} Stock`,
              price: parseFloat((Math.random() * 500 + 50).toFixed(2)),
              change: parseFloat((Math.random() * 10 - 5).toFixed(2)),
              changePercent: parseFloat((Math.random() * 5 - 2.5).toFixed(2)),
              volume: Math.floor(Math.random() * 10000000),
              previousClose: parseFloat((Math.random() * 500 + 50).toFixed(2)),
          };
          
          // Wait a little for visual effect
          await new Promise(resolve => setTimeout(resolve, 500)); 

          setSearchedStock(mockData);
          setTradeQuantity(1); // Reset quick trade quantity
      } catch (error) {
          console.error("Error fetching stock data:", error);
          setSearchedStock(null);
      } finally {
          setSearchLoading(false);
      }
  };


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const portfolioSummary = holdings.reduce(
    (acc, holding) => {
      return {
        totalValue: acc.totalValue + holding.quantity * holding.avgPrice,
        totalStocks: acc.totalStocks + 1,
      };
    },
    { totalValue: 0, totalStocks: 0 }
  );

  const currentHolding = searchedStock ? holdings.find(h => h.symbol === searchedStock.symbol) : null;

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">TradeShift</div>
        <p className="welcome-text">Welcome, {currentUser?.name || "Investor"}</p>
        <ul className="menu">
          <li onClick={() => onMenuClick("dashboard")}>Portfolio</li>
          <li onClick={() => onMenuClick("orders")}>Orders</li>
          <li onClick={() => onMenuClick("analytics")}>Analytics</li>
          <li onClick={() => onMenuClick("settings")}>Settings</li>
          <li onClick={onLogout} style={{ color: "red" }}>Logout</li>
        </ul>
      </div>
      
      {/* Main Content */}
      <div className="main">
        <h2>Dashboard Overview</h2>
        
        {/* Summary Boxes */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginBottom: "20px"
        }}>
          <div style={{ backgroundColor: "#e3f2fd", padding: "20px", borderRadius: "8px", border: "1px solid #90caf9" }}>
            <h4 style={{ margin: "0 0 10px 0", color: "#1976d2" }}>Total Portfolio Value</h4>
            <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>${portfolioSummary.totalValue.toFixed(2)}</p>
          </div>
          <div style={{ backgroundColor: "#f3e5f5", padding: "20px", borderRadius: "8px", border: "1px solid #ce93d8" }}>
            <h4 style={{ margin: "0 0 10px 0", color: "#7b1fa2" }}>Total Stocks Owned</h4>
            <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>{portfolioSummary.totalStocks}</p>
          </div>
          <div style={{ backgroundColor: "#e8f5e9", padding: "20px", borderRadius: "8px", border: "1px solid #81c784" }}>
            <h4 style={{ margin: "0 0 10px 0", color: "#388e3c" }}>Total Transactions</h4>
            <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>{transactions.length}</p>
          </div>
        </div>
        
        {/* Search Input */}
        <div style={{
          display: "flex",
          gap: "10px",
          marginBottom: "30px",
          maxWidth: "500px" 
        }}>
          <input
            type="text"
            value={inputSymbol}
            onChange={(e) => setInputSymbol(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter stock symbol (e.g., AAPL, TSLA)"
            style={{ flex: "3", padding: "10px", fontSize: "14px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
          <button
            onClick={handleSearch}
            disabled={searchLoading}
            style={{ flex: "1", padding: "10px", fontSize: "14px", cursor: searchLoading ? "not-allowed" : "pointer", backgroundColor: searchLoading ? "#ccc" : "#007bff", color: "white", border: "none", borderRadius: "4px", fontWeight: "bold" }}
          >
            {searchLoading ? "Loading..." : "Search Stock"}
          </button>
        </div>

        {/* Stock Chart and Quick Trade Panel */}
        <div style={{
          display: "grid",
          gridTemplateColumns: searchedStock ? "3fr 1fr" : "1fr",
          gap: "20px",
          marginBottom: "30px",
          alignItems: "start"
        }}>
          
          {/* TradingView Chart */}
          <div style={{ minHeight: "400px" }}>
            <TradingViewChart symbol={searchSymbol} />
          </div>

          {/* Quick Trade Panel (Only shows when a stock is searched) */}
          {searchedStock && (
            <div style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              border: "1px solid #dee2e6"
            }}>
              <h4 style={{ margin: "0 0 15px 0", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                Quick Trade: {searchedStock.symbol}
              </h4>
              
              {/* Stock Details */}
              <p style={{ margin: "0 0 5px 0" }}>
                **Price:** <span style={{ fontSize: "1.2em", fontWeight: "bold" }}>${searchedStock.price.toFixed(2)}</span>
              </p>
              <p style={{ marginBottom: "15px" }}>
                **Change:** <span style={{ color: searchedStock.change >= 0 ? "green" : "red", fontWeight: "bold" }}>
                    {searchedStock.change >= 0 ? "+" : ""}
                    ${searchedStock.change.toFixed(2)} ({searchedStock.changePercent.toFixed(2)}%)
                </span>
              </p>
              
              {/* Holding Info */}
              {currentHolding && (
                <div style={{ padding: "10px", backgroundColor: "#f0f8ff", borderRadius: "4px", marginBottom: "15px", border: "1px solid #cce5ff" }}>
                    <p style={{ margin: "0", fontWeight: "bold" }}>Your Holding:</p>
                    <p style={{ margin: "0", fontSize: "0.9em" }}>Qty: {currentHolding.quantity} | Avg Price: ${currentHolding.avgPrice.toFixed(2)}</p>
                </div>
              )}

              {/* Trade Input */}
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={tradeQuantity}
                  onChange={(e) => setTradeQuantity(parseInt(e.target.value) || 1)}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
              </div>

              {/* Trade Buttons */}
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={handleQuickBuy}
                  disabled={tradeQuantity <= 0}
                  style={{ flex: "1", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
                >
                  BUY
                </button>
                <button
                  onClick={handleQuickSell}
                  disabled={!currentHolding || tradeQuantity <= 0 || tradeQuantity > currentHolding.quantity}
                  style={{ flex: "1", padding: "10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
                >
                  SELL
                </button>
              </div>

            </div>
          )}
        </div>
        
        {/* Default Market Data Table */}
        <div className="market-section" style={{ marginBottom: "30px" }}>
          <h3>🌍 Other Live Markets</h3>
          {loading ? (
            <p>Loading live data...</p>
          ) : (
            <table className="portfolio-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Name</th>
                  <th>Current Price (USD)</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((stock) => (
                  <tr key={stock.symbol}>
                    <td>{stock.symbol}</td>
                    <td>{stock.name}</td>
                    <td>${stock.price.toFixed(2)}</td>
                    <td style={{ color: stock.change >= 0 ? "green" : "red" }}>
                      {stock.change >= 0 ? "+" : ""}
                      {stock.change.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {/* My Holdings */}
        <div className="holdings-section" style={{ marginBottom: "30px" }}>
          <h3>💼 My Holdings</h3>
          {holdings.length === 0 ? (
            <p style={{ textAlign: "center", color: "#666", padding: "20px" }}>
              No holdings yet. Search for a stock above to place your first trade!
            </p>
          ) : (
            <table className="portfolio-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Avg Price</th>
                  <th>Total Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((h) => (
                  <tr key={h.symbol}>
                    <td>{h.symbol}</td>
                    <td>{h.name}</td>
                    <td>{h.quantity}</td>
                    <td>${h.avgPrice.toFixed(2)}</td>
                    <td>${(h.quantity * h.avgPrice).toFixed(2)}</td>
                    <td>
                      <button 
                        style={{ color: "white", backgroundColor: "#dc3545", border: "none", padding: "5px 15px", borderRadius: "4px", cursor: "pointer" }} 
                        onClick={() => handleSellAll(h.symbol)}
                      >
                        Sell All
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Buy/Sell History */}
        <div className="transactions-section">
          <h3>📊 Buy/Sell History</h3>
          {transactions.length === 0 ? (
            <p style={{ textAlign: "center", color: "#666", padding: "20px" }}>
              No transactions yet.
            </p>
          ) : (
            <table className="portfolio-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Symbol</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr key={index}>
                    <td>{tx.date}</td>
                    <td style={{ color: tx.type === "BUY" ? "green" : "red", fontWeight: "bold" }}>{tx.type}</td>
                    <td>{tx.symbol}</td>
                    <td>{tx.quantity}</td>
                    <td>${tx.price.toFixed(2)}</td>
                    <td>${(tx.quantity * tx.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;