import React from "react"
import { Link, NavLink } from "react-router-dom"

export default function Header() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616",
      };
      
      return (
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            borderBottom: "1px solid #ddd",
          }}
        >
          {/* Site Logo */}
          <Link
            className="site-logo"
            to="/"
            style={{ fontSize: "24px", fontWeight: "bold", textDecoration: "none", color: "#333" }}
          >
            Podcast
          </Link>
      
          {/* Navigation Links */}
          <nav
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            <NavLink
              to="/Shows"
              style={({ isActive }) => (isActive ? activeStyles : { textDecoration: "none", color: "#333" })}
            >
              Shows
            </NavLink>
            <NavLink
              to="/Genres"
              style={({ isActive }) => (isActive ? activeStyles : { textDecoration: "none", color: "#333" })}
            >
              Genres
            </NavLink>
            <NavLink
              to="/Favorites"
              style={({ isActive }) => (isActive ? activeStyles : { textDecoration: "none", color: "#333" })}
            >
              Favorites
            </NavLink>
          </nav>
        </header>
      );
}