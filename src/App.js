import React, { useState } from "react";
import Background from "./components/Background";
import Nav from "./components/Nav";
import RightPanel from "./components/RightPanel";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="hero">
      {/* Geometric Background */}
      <Background />

      {/* Navigation */}
      <Nav page={page} setPage={setPage} />

      {/* Main Content */}
      <div className="hero-content">
        {/* Left Column */}
        <div className="hero-main">
          <div>
            <h1 className="company-name">NoStops Capital</h1>
            <div className="separator"></div>
            <p className="tagline">Capital × Systems</p>
          </div>
          <p className="tagline" style={{ marginTop: 0 }}>
            Trading Infrastructure. Data Infrastructure. Product Development.
          </p>
        </div>

        {/* Right Column (Dynamic) */}
        <RightPanel page={page} />
      </div>

      {/* Footer */}
      <div className="footer-label">contact@nostops.capital</div>
    </div>
  );
}

export default App;