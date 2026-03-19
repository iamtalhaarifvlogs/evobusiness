"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Conversations", path: "/conversations" },
    { name: "Analytics", path: "/analytics" },
    { name: "Contacts", path: "/contacts" },
    { name: "Campaigns", path: "/campaigns" },
  ];

  return (
    <>
      <header
        className="shadow-sm"
        style={{
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(10px)",
          padding: "12px 20px",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between">

          {/* LEFT: PROFILE */}
          <div className="position-relative">
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "#e9ecef",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              T
            </div>

            {/* Dropdown */}
            <div
              style={{
                position: "absolute",
                top: 50,
                left: 0,
                background: "#fff",
                borderRadius: 10,
                width: 180,
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                opacity: profileOpen ? 1 : 0,
                transform: profileOpen
                  ? "translateY(0)"
                  : "translateY(-10px)",
                pointerEvents: profileOpen ? "auto" : "none",
                transition: "all 0.25s ease",
                overflow: "hidden",
              }}
            >
              {["Theme", "Reminders", "Settings"].map((item) => (
                <div
                  key={item}
                  style={{
                    padding: "10px 15px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f5f5f5")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* CENTER: NAV (DESKTOP) */}
          <nav className="d-none d-md-flex align-items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                style={{
                  textDecoration: "none",
                  color:
                    pathname === item.path ? "#0d6efd" : "#333",
                  fontWeight: pathname === item.path ? 600 : 400,
                  position: "relative",
                  transition: "0.2s",
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT: HAMBURGER */}
          <div
            className="d-md-none"
            onClick={() => setMenuOpen(true)}
            style={{
              fontSize: 24,
              cursor: "pointer",
            }}
          >
            ☰
          </div>
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: menuOpen ? 0 : -280,
          width: 260,
          height: "100%",
          background: "#fff",
          zIndex: 1050,
          transition: "0.3s ease",
          boxShadow: "-5px 0 20px rgba(0,0,0,0.1)",
          padding: 20,
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <strong>Menu</strong>
          <span
            style={{ cursor: "pointer", fontSize: 20 }}
            onClick={() => setMenuOpen(false)}
          >
            ×
          </span>
        </div>

        <div className="d-flex flex-column gap-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: "none",
                color:
                  pathname === item.path ? "#0d6efd" : "#333",
                fontWeight: pathname === item.path ? 600 : 400,
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.3)",
            zIndex: 1040,
          }}
        />
      )}
    </>
  );
}