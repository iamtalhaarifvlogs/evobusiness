"use client";

import { useState } from "react";
import SuccessModal from "@/app/components/SuccessModal";
import {
  getContacts,
  saveContacts,
  getCampaigns,
  saveCampaigns,
} from "@/app/lib/storage";

import type { Campaign } from "@/app/lib/storage";

// ================= TYPES =================
type Contact = {
  id: number;
  name: string;
  phone: string;
  email: string;
  tag: string;
};

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

  // ================= SAVE CONTACT =================
  const handleSaveContact = () => {
    if (!contactForm.name || !contactForm.phone) return;

    const contacts: Contact[] = getContacts();

    const newContact: Contact = {
      id: Date.now(),
      name: contactForm.name,
      phone: contactForm.phone,
      email: contactForm.email,
      tag: contactForm.tag,
    };

    saveContacts([...contacts, newContact]);

    setContactForm({ name: "", phone: "", email: "", tag: "" });
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
  };

  // ================= SAVE CAMPAIGN =================
  const handleSaveCampaign = () => {
    if (!campaignForm.name || !campaignForm.message) return;

    const campaigns: Campaign[] = getCampaigns();

    const newCampaign: Campaign = {
      id: Date.now(),
      name: campaignForm.name,
      audience: campaignForm.audience || "General",
      message: campaignForm.message,
      status: "Draft", // ✅ FIXED (was "draft")
      tag: campaignForm.audience || "General",
    };

    saveCampaigns([...campaigns, newCampaign]);

    setCampaignForm({ name: "", audience: "", message: "" });
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

      {/* ACTIONS */}
      <div className="mb-4">
        <h6>Quick Actions</h6>

        <div className="d-flex gap-2 flex-wrap">
          <button className="btn btn-primary" onClick={openContactModal}>
            + Add Contact
          </button>

          <button className="btn btn-outline-primary" onClick={openCampaignModal}>
            + Create Campaign
          </button>
        </div>
      </div>

      {/* CONTACT MODAL */}
      {showContactModal && (
        <>
          <div style={backdrop} onClick={closeContactModal} />

          <div style={modal}>
            <h5>Add Contact</h5>

            <input
              placeholder="Name"
              value={contactForm.name}
              onChange={(e) =>
                setContactForm({ ...contactForm, name: e.target.value })
              }
              style={inputStyle}
            />

            <input
              placeholder="Phone"
              value={contactForm.phone}
              onChange={(e) =>
                setContactForm({ ...contactForm, phone: e.target.value })
              }
              style={inputStyle}
            />

            <input
              placeholder="Email"
              value={contactForm.email}
              onChange={(e) =>
                setContactForm({ ...contactForm, email: e.target.value })
              }
              style={inputStyle}
            />

            <input
              placeholder="Tag"
              value={contactForm.tag}
              onChange={(e) =>
                setContactForm({ ...contactForm, tag: e.target.value })
              }
              style={inputStyle}
            />

            <button className="btn btn-primary w-100 mt-3" onClick={handleSaveContact}>
              Save Contact
            </button>
          </div>
        </>
      )}

      {/* CAMPAIGN MODAL */}
      {showCampaignModal && (
        <>
          <div style={backdrop} onClick={closeCampaignModal} />

          <div style={modal}>
            <h5>Create Campaign</h5>

            <input
              placeholder="Campaign Name"
              value={campaignForm.name}
              onChange={(e) =>
                setCampaignForm({ ...campaignForm, name: e.target.value })
              }
              style={inputStyle}
            />

            <select
              value={campaignForm.audience}
              onChange={(e) =>
                setCampaignForm({ ...campaignForm, audience: e.target.value })
              }
              style={inputStyle}
            >
              <option value="">Select Audience</option>
              <option value="Customer">Customer</option>
              <option value="New">New</option>
              <option value="Hot Lead">Hot Lead</option>
            </select>

            <textarea
              placeholder="Message..."
              value={campaignForm.message}
              onChange={(e) =>
                setCampaignForm({ ...campaignForm, message: e.target.value })
              }
              style={inputStyle}
            />

            <button className="btn btn-primary w-100 mt-3" onClick={handleSaveCampaign}>
              Launch Campaign
            </button>
          </div>
        </>
      )}

      {/* SUCCESS */}
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
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  zIndex: 1040,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 10,
  marginTop: 8,
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--text)",
};