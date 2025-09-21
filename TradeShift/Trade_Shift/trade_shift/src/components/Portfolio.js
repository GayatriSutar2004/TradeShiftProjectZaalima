import React, { useEffect, useState } from "react";

function Portfolio() {
  const [assets, setAssets] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8081/portfolio/1") // demo userId=1
      .then((res) => res.json())
      .then((data) => {
        setAssets(data);

        // মোট value হিসেব করা
        let total = 0;
        data.forEach(asset => {
          total += asset.quantity * asset.price;
        });
        setTotalValue(total);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="portfolio">
      <h2>Your Portfolio</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Asset</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr key={index}>
              <td>{asset.name}</td>
              <td>{asset.type}</td>
              <td>{asset.quantity}</td>
              <td>₹{asset.price.toFixed(2)}</td>
              <td>₹{(asset.quantity * asset.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total Portfolio Value: ₹{totalValue.toFixed(2)}</h3>
    </div>
  );
}

export default Portfolio;
