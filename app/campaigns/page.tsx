"use client";

import { useState, useEffect } from "react";
import {
  getCampaigns,
  addCampaign,
  updateCampaign,
  deleteCampaign,
} from "@/app/lib/storage";

import SuccessModal from "@/app/components/SuccessModal";

type Campaign = {
  id: number;
  name: string;
  tag: string;
audience: string;
  message: string;
  status: "Draft" | "Running" | "Completed";
};

export default function CampaignsPage() {
  // ================= STATE =================
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // form
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"Draft" | "Running" | "Completed">("Draft");

  const [error, setError] = useState("");

  // ================= LOAD =================
  useEffect(() => {
    setCampaigns(getCampaigns());
  }, []);

  // ================= RESET =================
  const resetForm = () => {
    setName("");
    setTag("");
    setMessage("");
    setStatus("Draft");
    setEditingId(null);
    setError("");
  };

  // ================= EDIT =================
  const handleEdit = (campaign: Campaign) => {
    setName(campaign.name);
    setTag(campaign.tag);
    setMessage(campaign.message);
    setStatus(campaign.status);
    setAudience(campaign.tag);

    setEditingId(campaign.id);
    setShowModal(true);
  };

  // ================= SAVE (CREATE + UPDATE) =================
  const handleSave = () => {
    setError("");

    if (!name || !tag || !message) {
      setError("All fields are required");
      return;
    }

    if (editingId !== null) {
      updateCampaign({
        id: editingId,
        name,
        tag,
        audience,
        message,
        status,
      });

      setShowSuccess(true);
    } else {
      addCampaign({
        id: Date.now(),
        name,
        tag,
        audience,
        message,
        status,
      });

      setShowSuccess(true);
    }

    setCampaigns(getCampaigns());
    setShowModal(false);
    resetForm();
  };

  // ================= DELETE =================
  const handleDelete = () => {
    if (!selectedCampaign) return;

    deleteCampaign(selectedCampaign.id);
    setCampaigns(getCampaigns());

    setSelectedCampaign(null);
    setShowDeleteModal(false);
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
    position: "relative",
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
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 1040,
  };

  const inputStyle: React.CSSProperties = {
    padding: 10,
    borderRadius: 8,
    border: "1px solid var(--border)",
    background: "var(--card)",
    color: "var(--text)",
    width: "100%",
    outline: "none",
  };

  return (
    <div className="container-fluid py-3">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Campaigns</h5>

        <button
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
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

              {/* ACTIONS */}
              <div className="d-flex gap-2 mt-3">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleEdit(campaign)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => {
                    setSelectedCampaign(campaign);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* MODAL (CREATE / EDIT) */}
      {showModal && (
        <>
          <div style={backdropStyle} onClick={() => setShowModal(false)} />

          <div style={modalStyle}>
            <div style={{ padding: 14, borderBottom: "1px solid var(--border)" }}>
              <h5>{editingId ? "Edit Campaign" : "Create Campaign"}</h5>
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

              <select
                style={inputStyle}
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
              >
                <option value="Draft">Draft</option>
                <option value="Running">Running</option>
                <option value="Completed">Completed</option>
              </select>

              <textarea
                style={{ ...inputStyle, minHeight: 120 }}
                placeholder="Enter campaign message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              {error && <div style={{ color: "red", fontSize: 13 }}>{error}</div>}
            </div>

            <div style={{ padding: 14, borderTop: "1px solid var(--border)" }}>
              <button className="btn btn-primary w-100" onClick={handleSave}>
                {editingId ? "Save Changes" : "Create Campaign"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && selectedCampaign && (
        <>
          <div style={backdropStyle} onClick={() => setShowDeleteModal(false)} />

          <div style={modalStyle}>
            <div style={{ padding: 15 }}>
              <h5>Are you sure?</h5>
              <p>
                Delete <b>{selectedCampaign.name}</b> campaign?
              </p>
            </div>

            <div className="d-flex gap-2 p-3">
              <button
                className="btn btn-secondary w-50"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-danger w-50"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}

      {/* SUCCESS MODAL */}
      <SuccessModal
        show={showSuccess}
        title="Action Successful 🚀"
        message="Your campaign has been updated successfully."
        buttonText="Okay"
        redirectTo="/campaigns"
        onClose={() => setShowSuccess(false)}
      />

    </div>
  );
}