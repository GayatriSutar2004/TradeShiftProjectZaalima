import React, { useState } from "react";
import Navbar from "./Navbar";                   // Navbar src/ এ
import Dashboard from "./components/Dashboard";  // Dashboard components/ এ
import Portfolio from "./components/Portfolio";  // নতুন portfolio component
import Login from "./Login";                     // Login src/ এ
import Register from "./Register";               // Register src/ এ
import "./App.css";

function App() {
  const [page, setPage] = useState("login"); // "login" বা "register" বা "portfolio"
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Navbar switchPage={setPage} />
      
      {isLoggedIn ? (
        <>
          {page === "dashboard" ? (
            <Dashboard />
          ) : page === "portfolio" ? (
            <Portfolio />
          ) : (
            <Dashboard /> 
          )}
        </>
      ) : (
        page === "login" ? (
          <Login
            onLoginSuccess={() => {
              setIsLoggedIn(true);
              setPage("dashboard");
            }}
            onSwitchToRegister={() => setPage("register")}
          />
        ) : (
          <Register onSwitchToLogin={() => setPage("login")} />
        )
      )}
    </div>
  );
}

export default App;
