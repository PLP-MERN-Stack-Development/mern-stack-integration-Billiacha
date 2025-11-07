// src/components/Nav.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "#282c34",
        color: "white",
      }}
    >
      <h2>MERN Blog</h2>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/create" style={{ color: "white", textDecoration: "none" }}>
          New Post
        </Link>
      </div>
    </nav>
  );
}
