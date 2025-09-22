import React, { useState } from "react";
import "../App.css";

function Dashboard({onMenuClick}) {
  const [portfolio] = useState([
    { symbol: "AAPL", name: "Apple Inc.", quantity: 10, price: 175.5 },
    { symbol: "TSLA", name: "Tesla Inc.", quantity: 5, price: 265.3 },
    { symbol: "GOOGL", name: "Alphabet Inc.", quantity: 2, price: 2800.0 },
  ]);

  const [transactions] = useState([
    { id: 1, date: "2025-10-01", type: "Buy", symbol: "AAPL", quantity: 10, price: 170.0 },
    { id: 2, date: "2025-10-05", type: "Buy", symbol: "TSLA", quantity: 5, price: 260.0 },
    { id: 3, date: "2025-10-10", type: "Buy", symbol: "GOOGL", quantity: 2, price: 2750.0 },
  ]);

  const [marketData] = useState([
    { symbol: "AAPL", name: "Apple Inc.", price: 176.20, change: +0.70 },
    { symbol: "TSLA", name: "Tesla Inc.", price: 263.80, change: -1.50 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 2810.00, change: +10.00 },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 330.50, change: +2.10 },
  ]);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="logo">TradeShift</div>
        <ul className="menu">
         <li onClick={() => onMenuClick("dashboard")}>Portfolio</li>
          <li onClick={() => onMenuClick("orders")}>Orders</li>
          <li>Watchlist</li>
         
          <li onClick={() => onMenuClick("analytics")}>Analytics</li>
          <li>Settings</li>
        </ul>
      </div>

      <div className="main">
        <div className="header">
          <h2>Welcome, Investor!</h2>
          <button className="logout">Logout</button>
        </div>

        <div className="cards">
          <div className="card">
            <h3>Total Portfolio Value</h3>
            <p>$25,430.00</p>
          </div>
          <div className="card">
            <h3>Profit / Loss</h3>
            <p style={{ color: "green" }}>+ $1,230.00</p>
          </div>
          <div className="card">
            <h3>Today's Change</h3>
            <p style={{ color: "red" }}>- $120.00</p>
          </div>
        </div>

        <div className="chart-section">
          <h3>Portfolio Performance</h3>
          <div className="chart-placeholder">[ Chart Placeholder ]</div>
        </div>

        <div className="portfolio-section">
          <h3>My Portfolio</h3>
          <table className="portfolio-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Current Price</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((item) => (
                <tr key={item.symbol}>
                  <td>{item.symbol}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="transactions-section">
          <h3>Transaction History</h3>
          <table className="portfolio-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Symbol</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id}>
                  <td>{tx.date}</td>
                  <td>{tx.type}</td>
                  <td>{tx.symbol}</td>
                  <td>{tx.quantity}</td>
                  <td>${tx.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="market-section">
          <h3>Market Data</h3>
          <table className="portfolio-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Current Price</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {marketData.map(stock => (
                <tr key={stock.symbol}>
                  <td>{stock.symbol}</td>
                  <td>{stock.name}</td>
                  <td>${stock.price.toFixed(2)}</td>
                  <td style={{ color: stock.change >= 0 ? "green" : "red" }}>
                    {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;