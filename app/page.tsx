"use client";

import { useState } from "react";
import SuccessModal from "@/app/components/SuccessModal";
import {
  getContacts,
  saveContacts,
  getCampaigns,
  saveCampaigns,
} from "@/app/lib/storage";

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

  // ================= FORM STATES =================
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    tag: "",
  });

  const [campaignForm, setCampaignForm] = useState({
    name: "",
    audience: "",
    message: "",
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
    width: "100%",
  };

  // ================= MODALS =================
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

  // ================= SAVE CONTACT =================
  const handleSaveContact = () => {
    const contacts = getContacts();

    const newContact = {
      id: Date.now(),
      ...contactForm,
    };

    const updated = [...contacts, newContact];

    saveContacts(updated);

    closeContactModal();

    setContactForm({
      name: "",
      phone: "",
      email: "",
      tag: "",
    });

    setTimeout(() => {
      setSuccess({
        show: true,
        title: "Success 🎉",
        message: "Contact added successfully",
        buttonText: "View Contacts",
        redirectTo: "/contacts",
      });
    }, 200);
  };

  // ================= SAVE CAMPAIGN =================
  const handleSaveCampaign = () => {
    const campaigns = getCampaigns();

    const newCampaign = {
      id: Date.now(),
      ...campaignForm,
    };

    const updated = [...campaigns, newCampaign];

    saveCampaigns(updated);

    closeCampaignModal();

    setCampaignForm({
      name: "",
      audience: "",
      message: "",
    });

    setTimeout(() => {
      setSuccess({
        show: true,
        title: "Success 🚀",
        message: "Campaign created successfully",
        buttonText: "View Campaigns",
        redirectTo: "/campaigns",
      });
    }, 200);
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
      <h4>Dashboard</h4>

      {/* STATS */}
      <div className="row g-3 mb-4">
        {stats.map((s, i) => (
          <div key={i} className="col-12 col-sm-6 col-lg-3">
            <div style={cardStyle}>
              <div style={{ opacity: 0.7 }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 600 }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="mb-4">
        <h6>Quick Actions</h6>

        <div className="d-flex gap-2 flex-wrap">
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
          <div style={backdrop} onClick={closeContactModal} />

          <div
            style={{
              ...modal,
              opacity: animateContact ? 1 : 0,
              transform: animateContact
                ? "translate(-50%, -50%) scale(1)"
                : "translate(-50%, -60%) scale(0.95)",
            }}
          >
            <h5>Add Contact</h5>

            <input
              style={inputStyle}
              placeholder="Name"
              value={contactForm.name}
              onChange={(e) =>
                setContactForm({ ...contactForm, name: e.target.value })
              }
            />

            <input
              style={inputStyle}
              placeholder="Phone"
              value={contactForm.phone}
              onChange={(e) =>
                setContactForm({ ...contactForm, phone: e.target.value })
              }
            />

            <input
              style={inputStyle}
              placeholder="Email"
              value={contactForm.email}
              onChange={(e) =>
                setContactForm({ ...contactForm, email: e.target.value })
              }
            />

            <input
              style={inputStyle}
              placeholder="Tag"
              value={contactForm.tag}
              onChange={(e) =>
                setContactForm({ ...contactForm, tag: e.target.value })
              }
            />

            <button
              className="btn btn-primary w-100 mt-3"
              onClick={handleSaveContact}
            >
              Save Contact
            </button>
          </div>
        </>
      )}

      {/* ================= CAMPAIGN MODAL ================= */}
      {showCampaignModal && (
        <>
          <div style={backdrop} onClick={closeCampaignModal} />

          <div
            style={{
              ...modal,
              opacity: animateCampaign ? 1 : 0,
              transform: animateCampaign
                ? "translate(-50%, -50%) scale(1)"
                : "translate(-50%, -60%) scale(0.95)",
            }}
          >
            <h5>Create Campaign</h5>

            <input
              style={inputStyle}
              placeholder="Campaign Name"
              value={campaignForm.name}
              onChange={(e) =>
                setCampaignForm({ ...campaignForm, name: e.target.value })
              }
            />

            <select
              style={inputStyle}
              value={campaignForm.audience}
              onChange={(e) =>
                setCampaignForm({ ...campaignForm, audience: e.target.value })
              }
            >
              <option value="">Select Audience</option>
              <option value="Customer">Customer</option>
              <option value="New">New</option>
              <option value="Hot Lead">Hot Lead</option>
            </select>

            <textarea
              style={inputStyle}
              placeholder="Message..."
              value={campaignForm.message}
              onChange={(e) =>
                setCampaignForm({ ...campaignForm, message: e.target.value })
              }
            />

            <button
              className="btn btn-primary w-100 mt-3"
              onClick={handleSaveCampaign}
            >
              Launch Campaign
            </button>
          </div>
        </>
      )}

      {/* ================= SUCCESS ================= */}
      <SuccessModal
        show={success.show}
        title={success.title}
        message={success.message}
        buttonText={success.buttonText}
        redirectTo={success.redirectTo}
        onClose={() => setSuccess((p) => ({ ...p, show: false }))}
      />
    </div>
  );
}

// ================= STYLES =================
const modal: React.CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 420,
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