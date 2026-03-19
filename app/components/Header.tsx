"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/context/ThemeContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

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
          background: "var(--card)",
          backdropFilter: "blur(10px)",
          padding: "12px 20px",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          color: "var(--text)",
          borderBottom: "1px solid var(--border)",
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
                background: "var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              T
            </div>

            {/* DROPDOWN */}
            <div
              style={{
                position: "absolute",
                top: 50,
                left: 0,
                background: "var(--card)",
                color: "var(--text)",
                borderRadius: 10,
                width: 180,
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                border: "1px solid var(--border)",
                opacity: profileOpen ? 1 : 0,
                transform: profileOpen
                  ? "translateY(0)"
                  : "translateY(-10px)",
                pointerEvents: profileOpen ? "auto" : "none",
                transition: "all 0.25s ease",
                overflow: "hidden",
              }}
            >
              {/* THEME TOGGLE */}
              <div
                onClick={() => {
                  toggleTheme();
                  setProfileOpen(false);
                }}
                style={{ padding: "10px 15px", cursor: "pointer" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--border)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                Switch to {theme === "light" ? "Dark" : "Light"} Mode
              </div>

              {/* OTHER OPTIONS */}
              {["Reminders", "Settings"].map((item) => (
                <div
                  key={item}
                  style={{ padding: "10px 15px", cursor: "pointer" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--border)")
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

          {/* CENTER: NAV */}
          <nav className="d-none d-md-flex align-items-center gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  style={{
                    textDecoration: "none",
                    color: isActive ? "#0d6efd" : "var(--text)",
                    fontWeight: isActive ? 600 : 400,
                    paddingBottom: 2,
                    borderBottom: isActive
                      ? "2px solid #0d6efd"
                      : "2px solid transparent",
                    transition: "0.2s",
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: HAMBURGER */}
          <div
            className="d-md-none"
            onClick={() => setMenuOpen(true)}
            style={{
              fontSize: 24,
              cursor: "pointer",
              color: "var(--text)",
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
          background: "var(--card)",
          color: "var(--text)",
          zIndex: 1050,
          transition: "0.3s ease",
          boxShadow: "-5px 0 20px rgba(0,0,0,0.1)",
          padding: 20,
          borderLeft: "1px solid var(--border)",
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
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMenuOpen(false)}
                style={{
                  textDecoration: "none",
                  color: isActive ? "#0d6efd" : "var(--text)",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {item.name}
              </Link>
            );
          })}
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