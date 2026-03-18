"use client";

import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  return (
    <footer className="bg-light text-dark mt-auto py-3 border-top">
      <div className="container text-center">
        <small>
          © {new Date().getFullYear()} EvoDynamics Vision. All rights reserved.
        </small>
      </div>
    </footer>
  );
}