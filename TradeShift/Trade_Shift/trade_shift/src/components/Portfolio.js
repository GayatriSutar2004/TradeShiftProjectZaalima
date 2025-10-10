import React, { useEffect, useState } from "react";

function Portfolio({ triggerUpdate }) {
  const [assets, setAssets] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  // Fetch portfolio (user holdings)
  const fetchPortfolio = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/portfolio/1"); // Replace with actual endpoint
      const data = await res.json();
      setAssets(data);
    } catch (err) {
      console.error("Error fetching portfolio:", err);
    }
  };

  // Fetch live market prices for all assets
  const fetchLivePrices = async () => {
    try {
      const symbols = assets.map((asset) => asset.symbol).join(",");
      if (!symbols) return;

      const res = await fetch(`http://localhost:8081/api/marketData?symbols=${symbols}`);
      const liveData = await res.json(); // [{symbol: "AAPL", currentPrice: 176.5}, ...]
      
      const updatedAssets = assets.map((asset) => {
        const live = liveData.find((d) => d.symbol === asset.symbol);
        return live ? { ...asset, currentPrice: live.currentPrice } : asset;
      });

      setAssets(updatedAssets);

      // Update total value
      const total = updatedAssets.reduce(
        (sum, asset) => sum + asset.quantity * asset.currentPrice,
        0
      );
      setTotalValue(total);

    } catch (err) {
      console.error("Error fetching live prices:", err);
    }
  };

  // On mount, fetch portfolio
  useEffect(() => {
    fetchPortfolio();
  }, []);

  // Update portfolio when a new order is placed
  useEffect(() => {
    if (triggerUpdate) fetchPortfolio();
  }, [triggerUpdate]);

  // Periodically fetch live prices every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLivePrices();
    }, 5000);
    return () => clearInterval(interval); // cleanup
  }, [assets]);

  return (
    <div className="portfolio">
      <h2>Your Portfolio</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Asset</th>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Current Price</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr key={index}>
              <td>{asset.name}</td>
              <td>{asset.symbol}</td>
              <td>{asset.quantity}</td>
              <td>₹{asset.currentPrice?.toFixed(2) || asset.price.toFixed(2)}</td>
              <td>₹{((asset.quantity) * (asset.currentPrice || asset.price)).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total Portfolio Value: ₹{totalValue.toFixed(2)}</h3>
    </div>
  );
}

export default Portfolio;
