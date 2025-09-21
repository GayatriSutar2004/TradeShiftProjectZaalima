import React, { useState } from "react";
import "../App.css";

function Orders({ onMenuClick }) {
  const marketData = [
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "TSLA", name: "Tesla Inc." },
    { symbol: "GOOGL", name: "Alphabet Inc." },
    { symbol: "MSFT", name: "Microsoft Corp." },
  ];

  const [portfolio] = useState([
    { symbol: "AAPL", name: "Apple Inc.", quantity: 10, price: 175.5 },
    { symbol: "TSLA", name: "Tesla Inc.", quantity: 5, price: 265.3 },
    { symbol: "GOOGL", name: "Alphabet Inc.", quantity: 2, price: 2800.0 },
  ]);

  const [tradeSymbol, setTradeSymbol] = useState(marketData[0].symbol);
  const [tradeAction, setTradeAction] = useState("Buy");
  const [tradeQuantity, setTradeQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(
      `Order placed: ${tradeAction} ${tradeQuantity} shares of ${tradeSymbol}`
    );
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="logo">TradeShift</div>
        <ul className="menu">
          <li onClick={() => onMenuClick("dashboard")}>Portfolio</li>
          <li onClick={() => onMenuClick("orders")}>Orders</li>
          <li onClick={() => onMenuClick("analytics")}>Analytics</li>
          <li onClick={() => onMenuClick("settings")}>Settings</li>
        </ul>
      </div>
      <div className="main">
        {/* Portfolio Table */}
        <div className="portfolio-section">
          <h3>My Current Holdings</h3>
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
        {/* Trade Form */}
        <div className="trade-section">
          <h2>Place an Order</h2>
          <form className="trade-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>Stock:</label>
              <select
                value={tradeSymbol}
                onChange={e => setTradeSymbol(e.target.value)}
              >
                {marketData.map(stock => (
                  <option key={stock.symbol} value={stock.symbol}>
                    {stock.symbol} - {stock.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <label>Action:</label>
              <select
                value={tradeAction}
                onChange={e => setTradeAction(e.target.value)}
              >
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
              </select>
            </div>
            <div className="form-row">
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                value={tradeQuantity}
                onChange={e => setTradeQuantity(e.target.value)}
                required
              />
            </div>
            <button type="submit">Place Order</button>
            {message && <div className="message">{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Orders;