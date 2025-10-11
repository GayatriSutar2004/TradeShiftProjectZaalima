import React, { useState } from "react";
import Navbar from "./Navbar"; // Import the Navbar component
import Dashboard from "./components/Dashboard"; // Import Dashboard component
import Orders from "./components/Orders"; // Import Orders component
import Login from "./Login"; // Import Login page component
import Register from "./Register"; // Import Register page component
import "./App.css"; // Import App's CSS file

function App() {
  // State to track the current page. Default is "login"
  const [page, setPage] = useState("login");

  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle menu clicks from Navbar and change page
  const handleMenuClick = (menu) => {
    setPage(menu); // Update the page state
  };

  return (
    <div>
      {/* Navbar component. switchPage prop allows changing page from Navbar */}
      <Navbar switchPage={setPage} />

      {/* If the user is logged in */}
      {isLoggedIn ? (
        // If current page is "orders", show Orders component
        page === "orders" ? (
          <Orders onMenuClick={handleMenuClick} />
        ) : (
          // Otherwise, show Dashboard
          <Dashboard onMenuClick={handleMenuClick} />
        )
      ) : 
      // If user is not logged in
      page === "login" ? (
        // Show Login component. on successful login, set isLoggedIn to true
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        // Show Register page. on successful registration, navigate to login page
        <Register onRegisterSuccess={() => setPage("login")} />
      )}
    </div>
  );
}

export default App;
