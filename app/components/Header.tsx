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
    { name: "Conversations", path: "/conversations" },
    { name: "Analytics", path: "/analytics" },
    { name: "Contacts", path: "/contacts" },
    { name: "Campaigns", path: "/campaigns" },
  ];

  // ✅ SSR-safe outside click handler
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        profileRef.current &&
        !profileRef.current.contains(target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* HEADER */}
      <header
        className="shadow-sm"
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

          {/* LEFT: PROFILE */}
          <div
            className="position-relative"
            ref={profileRef}
          >
            <div
              onClick={() => setProfileOpen((prev) => !prev)}
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
                transition: "0.2s",
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
                borderRadius: 12,
                width: 200,
                boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
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
                style={{
                  padding: "12px 15px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--border)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <span>
                  {theme === "light"
                    ? "🌙 Dark Mode"
                    : "☀️ Light Mode"}
                </span>

                {/* Toggle UI */}
                <div
                  style={{
                    width: 36,
                    height: 18,
                    borderRadius: 20,
                    background:
                      theme === "light" ? "#ccc" : "#0d6efd",
                    position: "relative",
                    transition: "0.3s",
                  }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: "#fff",
                      position: "absolute",
                      top: 2,
                      left: theme === "light" ? 2 : 20,
                      transition: "0.3s",
                    }}
                  />
                </div>
              </div>

              {/* REMINDERS */}
              <div
                style={{ padding: "12px 15px", cursor: "pointer" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--border)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                Reminders
              </div>

              {/* SETTINGS */}
              <div
                style={{ padding: "12px 15px", cursor: "pointer" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--border)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                Settings
              </div>
            </div>
          </div>

          {/* CENTER NAV */}
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
                    paddingBottom: 4,
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

          {/* MOBILE MENU BUTTON */}
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
          boxShadow: "-5px 0 25px rgba(0,0,0,0.15)",
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