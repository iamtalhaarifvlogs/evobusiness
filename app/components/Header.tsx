"use client";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <header className="header shadow-sm">
        <div className="container-fluid d-flex align-items-center justify-content-between">

          {/* LEFT: Profile Section */}
          <div className="position-relative">
            <div
              className="profile-icon"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <img
                src="https://via.placeholder.com/40"
                alt="profile"
                className="rounded-circle"
              />
            </div>

            {/* Profile Dropdown */}
            <div className={`profile-dropdown ${profileOpen ? "show" : ""}`}>
              <div className="dropdown-item">Theme</div>
              <div className="dropdown-item">Reminders</div>
              <div className="dropdown-item">Settings</div>
            </div>
          </div>

          {/* CENTER: Navbar (Desktop) */}
          <nav className="nav-center d-none d-md-flex">
            <a className="nav-link">Conversations</a>
            <a className="nav-link">Analytics</a>
            <a className="nav-link">Contacts</a>
            <a className="nav-link">Campaigns</a>
          </nav>

          {/* RIGHT: Hamburger (Mobile) */}
          <div
            className="hamburger d-md-none"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </div>
        </div>
      </header>

      {/* Mobile Slide Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="menu-header d-flex justify-content-between align-items-center p-3">
          <span>Menu</span>
          <button className="btn-close" onClick={() => setMenuOpen(false)} />
        </div>

        <div className="menu-items">
          <a className="menu-link">Conversations</a>
          <a className="menu-link">Analytics</a>
          <a className="menu-link">Contacts</a>
          <a className="menu-link">Campaigns</a>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
}
