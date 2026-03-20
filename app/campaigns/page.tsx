"use client";

import { useState, useEffect } from "react";
import { getCampaigns, addCampaign } from "@/app/lib/storage";
import SuccessModal from "@/app/components/SuccessModal";

type Campaign = {
  id: number;
  name: string;
  tag: string;
  message: string;
  status: "Draft" | "Running" | "Completed";
};

export default function CampaignsPage() {
  // ================= STATE =================
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // form state
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  // ================= LOAD =================
  useEffect(() => {
    setCampaigns(getCampaigns());
  }, []);

  // ================= SAVE =================
  const handleCreate = (status: "Draft" | "Running") => {
    setError("");

    // VALIDATION
    if (!name || !tag || !message) {
      setError("All fields are required");
      return;
    }

    const newCampaign: Campaign = {
      id: Date.now(),
      name,
      tag,
      message,
      status,
    };

    addCampaign(newCampaign);

    const updated = getCampaigns();
    setCampaigns(updated);

    // reset form
    setName("");
    setTag("");
    setMessage("");

    setShowModal(false);
    setShowSuccess(true);
  };

  // ================= STATUS STYLE =================
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

  // ================= STYLES =================
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

  const inputStyle: React.CSSProperties = {
    padding: 10,
    borderRadius: 8,
    border: "1px solid var(--border)",
    background: "var(--card)",
    color: "var(--text)",
    outline: "none",
  };

  return (
    <div className="container-fluid py-3">

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

      {/* LIST */}
      <div className="row g-3">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="col-12 col-md-6 col-lg-4">
            <div style={cardStyle}>

              <div className="d-flex justify-content-between mb-2">
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

              <div style={{ fontSize: 13, opacity: 0.7 }}>
                Audience: {campaign.tag}
              </div>

              <p style={{ fontSize: 14, marginTop: 10 }}>
                {campaign.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <>
          <div style={backdropStyle} onClick={() => setShowModal(false)} />

          <div style={modalStyle}>
            <div style={{ padding: 14, borderBottom: "1px solid var(--border)" }}>
              <h5>Create Campaign</h5>
            </div>

            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>

              <input
                style={inputStyle}
                placeholder="Campaign Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <select
                style={inputStyle}
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              >
                <option value="">Select Audience Tag</option>
                <option value="Customer">Customer</option>
                <option value="New">New</option>
                <option value="Hot Lead">Hot Lead</option>
              </select>

              <textarea
                style={{ ...inputStyle, minHeight: 120 }}
                placeholder="Enter campaign message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              {error && (
                <div style={{ color: "red", fontSize: 13 }}>
                  {error}
                </div>
              )}
            </div>

            <div style={{ padding: 14, borderTop: "1px solid var(--border)", display: "flex", gap: 10 }}>
              <button
                className="btn btn-secondary w-50"
                onClick={() => handleCreate("Draft")}
              >
                Save Draft
              </button>

              <button
                className="btn btn-primary w-50"
                onClick={() => handleCreate("Running")}
              >
                Launch
              </button>
            </div>
          </div>
        </>
      )}

      {/* SUCCESS MODAL */}
      <SuccessModal
        show={showSuccess}
        title="Campaign Created 🚀"
        message="Your campaign has been successfully saved."
        buttonText="View Campaigns"
        redirectTo="/campaigns"
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
}