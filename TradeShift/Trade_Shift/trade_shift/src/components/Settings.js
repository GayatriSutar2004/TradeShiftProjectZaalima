import React, { useState } from "react";
import "../App.css";

function Settings({ user, logout, onMenuClick }) {
  // Props থেকে পাওয়া ব্যবহারকারীর ডেটা দিয়ে স্টেট ইনিশিয়ালাইজ করা
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [message, setMessage] = useState("");

  // Update user profile
  const handleSave = async () => {
    // 🔑 সুরক্ষা: লোকাল স্টোরেজ থেকে JWT টোকেন নেওয়া
    const token = localStorage.getItem("jwtToken");

    try {
      // API Endpoints: পোর্ট 8080 ব্যবহার করা হয়েছে এবং JWT Header যোগ করা হয়েছে
      const res = await fetch(`http://localhost:8080/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // টোকেনটি Authorization Header-এ যোগ করা হলো
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify({ name, email }),
      });

      if (res.ok) {
        setMessage("Profile updated successfully!");
        // যদি দরকার হয়, এখানে user prop-এর ডেটা আপডেট করার লজিক লিখতে পারেন
      } else if (res.status === 401) {
         setMessage("Update failed. Please login again."); // JWT টোকেন ভুল বা মেয়াদ উত্তীর্ণ হলে
      } else {
        setMessage("Failed to update profile.");
      }
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Error updating profile. Check server status.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

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
      <div className="settings-container">
        <div className="settings-box">
          <h2>User Profile</h2>

          <div className="profile-card">
            <label>
              <strong>Name:</strong>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label>
              <strong>Email:</strong>
              {/* ইমেল সাধারণত এডিট করা যায় না, তাই এটি disabled রাখা যেতে পারে */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
            </label>

            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
            {message && <div className="message">{message}</div>}
          </div>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
