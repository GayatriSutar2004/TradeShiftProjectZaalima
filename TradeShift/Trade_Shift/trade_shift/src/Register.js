import React, { useState } from "react";

function Register({ switchPage }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    if (users.find((u) => u.email === email)) {
      alert("Email already registered ❌");
      return;
    }

    // Add new user
    users.push({ firstName, lastName, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration Successful 🎉");

    // Clear form
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");

    // Navigate to login after registration
    switchPage("login");
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Enter First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          style={{ marginTop: "10px" }}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginTop: "10px" }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginTop: "10px" }}
        />

        <button type="submit" style={{ marginTop: "20px" }}>
          Register
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        Already have an account?{" "}
        <span
          onClick={() => switchPage("login")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Login here
        </span>
      </p>
    </div>
  );
}

export default Register;
