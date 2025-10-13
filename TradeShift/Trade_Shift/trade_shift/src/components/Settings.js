import React, { useState } from "react";
import axios from 'axios'; // Axios ব্যবহার করা হয়েছে
import "../App.css";

const API_BASE_URL = 'http://localhost:8080/users/'; // আপনার API-এর সঠিক বেস URL

function Settings({ user, logout, onMenuClick }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false); // সেভ করার সময় বাটন ডিসেবল করার জন্য নতুন স্টেট

  // Update user profile
  const handleSave = async () => {
    setSaving(true);
    setMessage(""); // মেসেজ রিসেট করা হলো
    const token = localStorage.getItem("jwtToken"); // JWT টোকেন নেওয়া হলো

    try {
      const res = await axios.put(
        `${API_BASE_URL}${user.id}`, // ডাইনামিক URL
        { name, email },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // 🔑 JWT টোকেন যোগ করা হলো
          },
        }
      );

      if (res.status === 200) { // Axios-এ সফল রিকোয়েস্ট স্ট্যাটাস 200
        setMessage("✅ Profile updated successfully!");
      } else {
        setMessage("❌ Failed to update profile.");
      }
      
      setTimeout(() => setMessage(""), 3000);
      
    } catch (err) {
      console.error("API Error:", err);
      // সার্ভার বা টোকেন এরর হ্যান্ডেল করা
      if (err.response && err.response.status === 401) {
          setMessage("❌ Update failed. Please log in again.");
      } else {
          setMessage("❌ Error updating profile. Check server status.");
      }
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setSaving(false); // রিকোয়েস্ট শেষ হলে বাটন এনেবল করা
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
          <li className="active" onClick={() => onMenuClick("settings")}>Settings</li>
        </ul>
      </div>

      {/* Main content */}
      <div className="settings-content-area">
        {/* টপ-বার বা হেডার, যেখানে লগআউট বাটন থাকতে পারে */}
        <header className="top-bar">
             <button className="logout-btn top-logout" onClick={logout}>
                Logout 🚪
             </button>
        </header>

        <div className="settings-container">
          <h2>Account Settings</h2>

          <section className="profile-section card-shadow">
            <h3>General Profile Information</h3>
            <div className="form-group">
                <label>
                  <strong>Name:</strong>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
            </div>
            
            <div className="form-group">
                <label>
                  <strong>Email:</strong>
                  {/* ইমেল সাধারণত disabled থাকে */}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled 
                  />
                </label>
            </div>
            
            <button 
                className="save-btn" 
                onClick={handleSave} 
                disabled={saving} // 🔒 সেভ করার সময় বাটন ডিসেবল করা
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            {message && <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Settings;
