"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/context/ThemeContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const profileRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Conversations", path: "/conversations" },
    { name: "Analytics", path: "/analytics" },
    { name: "Contacts", path: "/contacts" },
    { name: "Campaigns", path: "/campaigns" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        style={{
          background: "var(--card)",
          backdropFilter: "blur(12px)",
          padding: "12px 20px",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          color: "var(--text)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between">

          {/* LEFT: PROFILE + NAV */}
          <div className="d-flex align-items-center gap-3">

            {/* PROFILE */}
            <div className="position-relative" ref={profileRef}>
              <div
                onClick={() => setProfileOpen((p) => !p)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontWeight: 600,
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
                  width: 200,
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                  opacity: profileOpen ? 1 : 0,
                  transform: profileOpen ? "translateY(0)" : "translateY(-10px)",
                  pointerEvents: profileOpen ? "auto" : "none",
                  transition: "0.25s",
                  overflow: "hidden",
                }}
              >
                <div
                  onClick={() => {
                    toggleTheme();
                    setProfileOpen(false);
                  }}
                  style={{ padding: 12, cursor: "pointer" }}
                >
                  {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </div>

                <div style={{ padding: 12, cursor: "pointer" }}>
                  Reminders
                </div>

                <div style={{ padding: 12, cursor: "pointer" }}>
                  Settings
                </div>
              </div>
            </div>

            {/* DESKTOP NAV */}
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
                      borderBottom: isActive ? "2px solid #0d6efd" : "2px solid transparent",
                      paddingBottom: 4,
                    }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* CENTER: BRAND */}
          <Link
            href="/"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              textDecoration: "none",
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: "1px",
              color: "var(--text)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#0d6efd",
              }}
            />
            EVB
          </Link>

          {/* RIGHT: MOBILE MENU */}
          <div
            className="d-md-none"
            onClick={() => setMenuOpen(true)}
            style={{ fontSize: 24, cursor: "pointer" }}
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
          borderLeft: "1px solid var(--border)",
          zIndex: 1050,
          padding: 20,
          transition: "0.3s",
        }}
      >
        <div className="d-flex justify-content-between mb-4">
          <strong>Menu</strong>
          <span onClick={() => setMenuOpen(false)} style={{ cursor: "pointer" }}>
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
                color: pathname === item.path ? "#0d6efd" : "var(--text)",
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
            inset: 0,
            background: "rgba(0,0,0,0.3)",
            zIndex: 1040,
          }}
        />
      )}
    </>
  );
}