import React from "react";


export default function Nav({ page, setPage }) {
  return (
    <nav className="nav">
      <button
        className={`nav-link ${page === "home" ? "active" : ""}`}
        onClick={() => setPage("home")}
      >
        Home
      </button>
      <button
        className={`nav-link ${page === "about" ? "active" : ""}`}
        onClick={() => setPage("about")}
      >
        About
      </button>

      <button
        className={`nav-link ${page === "blog" ? "active" : ""}`}
        onClick={() => setPage("blog")}
      >
        Blog
      </button>

      <button
        className="nav-link"
        onClick={() => {
          window.location.href = "https://dashboard.nostops.capital"; // change domain later
        }}
      >
        Login
      </button>
    </nav>
  );
}