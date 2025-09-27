import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Analytics({ onMenuClick }) {
  const [assets, setAssets] = useState([]);
  const [performance, setPerformance] = useState([
    { date: "2025-09-01", value: 12000 },
    { date: "2025-09-08", value: 13500 },
    { date: "2025-09-15", value: 14000 },
    { date: "2025-09-22", value: 15500 },
    { date: "2025-09-29", value: 16000 },
  ]);

  // Fetch assets from API
  useEffect(() => {
    fetch("http://localhost:8081/portfolio/1")
      .then((res) => res.json())
      .then((data) => setAssets(data))
      .catch((err) => console.error(err));
  }, []);

  // Compute allocation for Pie chart
  const allocation = [];
  assets.forEach((asset) => {
    const found = allocation.find((a) => a.type === asset.type);
    if (found) {
      found.value += asset.quantity * asset.price;
    } else {
      allocation.push({ type: asset.type, value: asset.quantity * asset.price });
    }
  });

  // Fallback demo allocation if API fails
  const allocationData =
    allocation.length > 0
      ? allocation
      : [
          { type: "Stocks", value: 5000 },
          { type: "Bonds", value: 3000 },
          { type: "Crypto", value: 2000 },
        ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">TradeShift</div>
        <ul className="menu">
          <li onClick={() => onMenuClick("dashboard")}>Portfolio</li>
          <li onClick={() => onMenuClick("orders")}>Orders</li>
          <li onClick={() => onMenuClick("analytics")}>Analytics</li>
          <li onClick={() => onMenuClick("settings")}>Settings</li>
        </ul>
      </div>

      {/* Main content */}
      <div className="main">
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Portfolio Analytics
        </h2>

        <div
          style={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Portfolio Performance Line Chart */}
          <div
            className="chart-container"
            style={{
              width: 400,
              height: 300,
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              padding: "20px",
            }}
          >
            <h3 style={{ textAlign: "center" }}>Portfolio Performance</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={performance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#1976d2"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Asset Allocation Pie Chart */}
          <div
            className="chart-container"
            style={{
              width: 400,
              height: 300,
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              padding: "20px",
            }}
          >
            <h3 style={{ textAlign: "center" }}>Asset Allocation</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={allocationData}
                  dataKey="value"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {allocationData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
