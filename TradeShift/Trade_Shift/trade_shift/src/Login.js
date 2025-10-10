import React, { useState } from "react";
import "./App.css";

function Login({ onLoginSuccess, switchPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Fill email and password");
      return;
    }

    // Check localStorage for registered users
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      alert("Invalid email or password ❌");
      return;
    }

    const loggedInUser = { name: `${user.firstName} ${user.lastName}`, email: user.email, role: "Trader" };
    onLoginSuccess(loggedInUser);
  };

  return (
    <div className="container">
      <h2>Login to TradeShift</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: "15px" }}>
        Don’t have an account?{" "}
        <span
          onClick={() => switchPage("register")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Register here
        </span>
      </p>
    </div>
  );
}

export default Login;
