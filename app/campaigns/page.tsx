"use client";

import { useState } from "react";

type Campaign = {
  id: number;
  name: string;
  tag: string;
  message: string;
  status: "Draft" | "Running" | "Completed";
};

export default function CampaignsPage() {
  const [showModal, setShowModal] = useState(false);

  const campaigns: Campaign[] = [
    {
      id: 1,
      name: "Ramadan Offer",
      tag: "Customer",
      message: "Get 20% off this Ramadan!",
      status: "Running",
    },
    {
      id: 2,
      name: "New Leads Intro",
      tag: "New",
      message: "Welcome! Let us guide you.",
      status: "Draft",
    },
  ];

  const cardStyle: React.CSSProperties = {
    background: "var(--card)",
    color: "var(--text)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: 16,
    height: "100%",
  };

  const modalStyle: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 520,
    background: "var(--card)",
    color: "var(--text)",
    border: "1px solid var(--border)",
    borderRadius: 16,
    zIndex: 1050,
  };

  const backdropStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    zIndex: 1040,
  };

  const getStatusStyle = (status: Campaign["status"]) => {
    switch (status) {
      case "Running":
        return {
          background: "rgba(34, 197, 94, 0.15)",
          color: "#22c55e",
          border: "1px solid rgba(34, 197, 94, 0.4)",
        };
      case "Draft":
        return {
          background: "rgba(148, 163, 184, 0.15)",
          color: "#94a3b8",
          border: "1px solid rgba(148, 163, 184, 0.4)",
        };
      case "Completed":
        return {
          background: "rgba(100, 116, 139, 0.15)",
          color: "#64748b",
          border: "1px solid rgba(100, 116, 139, 0.4)",
        };
    }
  };

  return (
    <div className="container-fluid py-3" style={{ color: "var(--text)" }}>

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Campaigns</h5>

        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Create Campaign
        </button>
      </div>

      {/* CAMPAIGN LIST */}
      <div className="row g-3">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="col-12 col-md-6 col-lg-4">
            <div style={cardStyle}>

              {/* HEADER */}
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h6 className="mb-0">{campaign.name}</h6>

                <span style={{
                  ...getStatusStyle(campaign.status),
                  padding: "4px 8px",
                  borderRadius: 999,
                  fontSize: 12,
                }}>
                  {campaign.status}
                </span>
              </div>

              {/* META */}
              <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 10 }}>
                Audience: {campaign.tag}
              </div>

              {/* MESSAGE */}
              <p style={{ fontSize: 14, marginBottom: 12 }}>
                {campaign.message}
              </p>

              {/* ACTIONS */}
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-primary">
                  Edit
                </button>
                <button className="btn btn-sm btn-outline-success">
                  Start
                </button>
                <button className="btn btn-sm btn-outline-danger">
                  Stop
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* CREATE CAMPAIGN MODAL */}
      {showModal && (
        <>
          <div style={backdropStyle} onClick={() => setShowModal(false)} />

          <div style={modalStyle}>
            <div
              style={{
                padding: 14,
                borderBottom: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h5 style={{ margin: 0 }}>Create Campaign</h5>

              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <input style={inputStyle} placeholder="Campaign Name" />

              <select style={inputStyle}>
                <option>Select Audience Tag</option>
                <option>Customer</option>
                <option>New</option>
                <option>Hot Lead</option>
              </select>

              <textarea
                style={{ ...inputStyle, minHeight: 120 }}
                placeholder="Enter campaign message..."
              />
            </div>

            <div
              style={{
                padding: 14,
                borderTop: "1px solid var(--border)",
                display: "flex",
                gap: 10,
                justifyContent: "flex-end",
              }}
            >
              <button className="btn btn-secondary">
                Save Draft
              </button>
              <button className="btn btn-primary">
                Launch Campaign
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: 10,
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--text)",
  outline: "none",
};