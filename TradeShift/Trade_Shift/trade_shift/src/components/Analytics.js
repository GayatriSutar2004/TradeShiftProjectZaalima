import React, { useState } from "react";
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

// --- Dummy Data Definitions ---
const fallbackHoldings = [
    { symbol: "AAPL", name: "Apple Inc", quantity: 15, price: 190.5, type: "Stocks" },
    { symbol: "TSLA", name: "Tesla Inc", quantity: 8, price: 255.0, type: "Stocks" },
    { symbol: "BTC", name: "Bitcoin", quantity: 0.1, price: 65000, type: "Crypto" },
    { symbol: "GOOGL", name: "Alphabet Inc", quantity: 5, price: 2800, type: "Stocks" },
];

const calculatePerformance = (data) => {
    let baseValue = data.reduce((sum, h) => sum + h.quantity * h.price, 0) * 0.85;
    const history = [];
    for (let i = 0; i < 7; i++) {
        baseValue += baseValue * (0.005 + Math.random() * 0.01); 
        history.push({
            date: `2025-09-${10 + i}`,
            value: baseValue,
        });
    }
    return history;
};

const calculateAllocation = (data) => {
    return data.map(asset => ({
        type: asset.symbol || 'Unknown Stock',
        value: asset.quantity * asset.price,
    }));
};
// --- End Dummy Data Definitions ---

function Analytics({ onMenuClick }) {
  
  // Initialize state directly with dummy data. No fetching is attempted.
  const [holdings] = useState(fallbackHoldings); 
  const [performance] = useState(calculatePerformance(fallbackHoldings));

  const allocationData = calculateAllocation(holdings);
  const totalValue = performance.length > 0 ? performance[performance.length - 1].value : 0;

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
        {/* CRITICAL CHECK: This is what should replace the "features coming soon" message */}
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          📈 Portfolio Analytics
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
              width: 450, 
              height: 350,
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              padding: "20px",
            }}
          >
            <h3 style={{ textAlign: "center", borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Portfolio Value Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" style={{ fontSize: '10px' }} />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`} />
                <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Value']} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#1976d2"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <p style={{textAlign: 'center', fontSize: '12px', color: '#666'}}>Total Current Value: **${totalValue.toFixed(2)}**</p>
          </div>

          {/* Asset Allocation Pie Chart */}
          <div
            className="chart-container"
            style={{
              width: 450,
              height: 350,
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              padding: "20px",
            }}
          >
            <h3 style={{ textAlign: "center", borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Allocation by Stock Symbol</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={allocationData}
                  dataKey="value"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill={COLORS[0]} // Use the first color for consistency if needed
                  label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(1)}%`}
                >
                  {allocationData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip 
                    formatter={(value, name, props) => [`$${value.toFixed(2)}`, props.payload.type]}
                />
                <Legend layout="vertical" verticalAlign="bottom" align="left" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;