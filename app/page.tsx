"use client";

import { useState } from "react";
import SuccessModal from "@/app/components/SuccessModal";

export default function HomePage() {
  // ================= STATES =================
  const [showContactModal, setShowContactModal] = useState(false);
  const [animateContact, setAnimateContact] = useState(false);

  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [animateCampaign, setAnimateCampaign] = useState(false);

  const [success, setSuccess] = useState({
    show: false,
    title: "",
    message: "",
    buttonText: "",
    redirectTo: "",
  });

  // ================= DATA =================
  const stats = [
    { label: "Contacts", value: 128 },
    { label: "Active Campaigns", value: 4 },
    { label: "New Leads", value: 18 },
    { label: "Messages Sent", value: 342 },
  ];

  // ================= STYLES =================
  const cardStyle: React.CSSProperties = {
    background: "var(--card)",
    color: "var(--text)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: 16,
  };

  const inputStyle: React.CSSProperties = {
    padding: 10,
    borderRadius: 8,
    border: "1px solid var(--border)",
    background: "var(--card)",
    color: "var(--text)",
  };

  // ================= MODAL HANDLERS =================
  const openContactModal = () => {
    setShowContactModal(true);
    setTimeout(() => setAnimateContact(true), 10);
  };

  const closeContactModal = () => {
    setAnimateContact(false);
    setTimeout(() => setShowContactModal(false), 200);
  };

  const openCampaignModal = () => {
    setShowCampaignModal(true);
    setTimeout(() => setAnimateCampaign(true), 10);
  };

  const closeCampaignModal = () => {
    setAnimateCampaign(false);
    setTimeout(() => setShowCampaignModal(false), 200);
  };

  // ================= UI =================
  return (
    <div
      className="container-fluid py-3"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <div className="mb-4">
        <h4>Dashboard</h4>
        <p style={{ opacity: 0.7 }}>
          Welcome back — here’s what’s happening today
        </p>
      </div>

      {/* STATS */}
      <div className="row g-3 mb-4">
        {stats.map((s, i) => (
          <div key={i} className="col-12 col-sm-6 col-lg-3">
            <div style={cardStyle}>
              <div style={{ opacity: 0.7 }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 600 }}>
                {s.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="mb-4">
        <h6>Quick Actions</h6>

        <div className="d-flex flex-wrap gap-2">
          <button className="btn btn-primary" onClick={openContactModal}>
            + Add Contact
          </button>

          <button
            className="btn btn-outline-primary"
            onClick={openCampaignModal}
          >
            + Create Campaign
          </button>
        </div>
      </div>

      {/* ================= CONTACT MODAL ================= */}
      {showContactModal && (
        <>
          {/* BACKDROP */}
          <div
            onClick={closeContactModal}
            style={{
              ...backdrop,
              opacity: animateContact ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}
          />

          {/* MODAL */}
          <div
            style={{
              ...modal,
              opacity: animateContact ? 1 : 0,
              transform: animateContact
                ? "translate(-50%, -50%) scale(1)"
                : "translate(-50%, -60%) scale(0.95)",
              transition: "all 0.2s ease",
            }}
          >
            <h5>Add Contact</h5>

            <div className="d-flex flex-column gap-2 mt-2">
              <input style={inputStyle} placeholder="Name" />
              <input style={inputStyle} placeholder="Phone" />
              <input style={inputStyle} placeholder="Email" />
              <input style={inputStyle} placeholder="Tag" />
            </div>

            <button
              className="btn btn-primary w-100 mt-3"
              onClick={() => {
                closeContactModal();

                setTimeout(() => {
                  setSuccess({
                    show: true,
                    title: "Success 🎉",
                    message: "Contact added successfully",
                    buttonText: "View Contacts",
                    redirectTo: "/contacts",
                  });
                }, 200);
              }}
            >
              Save Contact
            </button>
          </div>
        </>
      )}

      {/* ================= CAMPAIGN MODAL ================= */}
      {showCampaignModal && (
        <>
          {/* BACKDROP */}
          <div
            onClick={closeCampaignModal}
            style={{
              ...backdrop,
              opacity: animateCampaign ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}
          />

          {/* MODAL */}
          <div
            style={{
              ...modal,
              opacity: animateCampaign ? 1 : 0,
              transform: animateCampaign
                ? "translate(-50%, -50%) scale(1)"
                : "translate(-50%, -60%) scale(0.95)",
              transition: "all 0.2s ease",
            }}
          >
            <h5>Create Campaign</h5>

            <div className="d-flex flex-column gap-2 mt-2">
              <input style={inputStyle} placeholder="Campaign Name" />

              <select style={inputStyle}>
                <option>Select Audience</option>
                <option>Customer</option>
                <option>New</option>
                <option>Hot Lead</option>
              </select>

              <textarea
                style={inputStyle}
                placeholder="Message..."
              />
            </div>

            <button
              className="btn btn-primary w-100 mt-3"
              onClick={() => {
                closeCampaignModal();

                setTimeout(() => {
                  setSuccess({
                    show: true,
                    title: "Success 🚀",
                    message: "Campaign created successfully",
                    buttonText: "View Campaigns",
                    redirectTo: "/campaigns",
                  });
                }, 200);
              }}
            >
              Launch Campaign
            </button>
          </div>
        </>
      )}

      {/* ================= SUCCESS MODAL ================= */}
      <SuccessModal
        show={success.show}
        title={success.title}
        message={success.message}
        buttonText={success.buttonText}
        redirectTo={success.redirectTo}
        onClose={() =>
          setSuccess((prev) => ({ ...prev, show: false }))
        }
      />
    </div>
  );
}

// ================= GLOBAL STYLES =================
const modal: React.CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 400,
  background: "var(--card)",
  padding: 20,
  borderRadius: 12,
  zIndex: 1050,
  border: "1px solid var(--border)",
};

const backdrop: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  zIndex: 1040,
};