import React from "react"
import { Link, NavLink } from "react-router-dom"

export default function Header() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <header>
            <Link className="site-logo" to="/">Podcast</Link>
            <nav>
                <NavLink
                    to="/Shows"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Shows
                </NavLink>
                <NavLink
                    to="/Genres"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Genres
                </NavLink>
                <NavLink
                    to="/Favorites"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Favorites
                </NavLink>
            </nav>
        </header>
    )
}