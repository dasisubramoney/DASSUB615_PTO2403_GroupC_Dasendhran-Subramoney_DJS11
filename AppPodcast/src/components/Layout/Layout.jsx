import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import GlobalAudioPlayer from "./AudioGlobal"; // Adjust the path as needed

export default function Layout() {
    return (
        <div className="site-wrapper">
            <Header />
            <Outlet /> {/* This renders the current page */}
            <GlobalAudioPlayer /> {/* This renders the global audio player */}
        </div>
    )
}