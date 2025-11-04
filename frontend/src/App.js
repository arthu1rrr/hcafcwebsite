import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Teams from "./pages/Teams";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleCreated() {
    setRefreshKey((k) => k + 1); // trigger TeamsList to refetch
  }

  return (
    <Router>
      

      
        <main >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/teams" element={<Teams />} />
        </Routes>
      </main>

      
    </Router>
  );
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  borderBottom: "1px solid #ddd",
};

const navStyle = { display: "flex", gap: "1rem" };
const logoStyle = { fontWeight: 700, textDecoration: "none", color: "#000" };
const footerStyle = { textAlign: "center", marginTop: "2rem", padding: "1rem", borderTop: "1px solid #ddd" };




export default App;



