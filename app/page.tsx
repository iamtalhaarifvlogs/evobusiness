"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const [showContactModal, setShowContactModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [success, setSuccess] = useState<null | {
    message: string;
    redirect: string;
  }>(null);

  const stats = [
    { label: "Contacts", value: 128 },
    { label: "Active Campaigns", value: 4 },
    { label: "New Leads", value: 18 },
    { label: "Messages Sent", value: 342 },
  ];

  const cardStyle: React.CSSProperties = {
    background: "var(--card)",
    color: "var(--text)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: 16,
  };

  const modalStyle: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 500,
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
  };

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
        <h4 className="mb-1">Dashboard</h4>
        <p style={{ opacity: 0.7 }}>
          Welcome back — here’s what’s happening today
        </p>
      </div>

      {/* STATS */}
      <div className="row g-3 mb-4">
        {stats.map((s, i) => (
          <div key={i} className="col-12 col-sm-6 col-lg-3">
            <div style={cardStyle}>
              <div style={{ fontSize: 13, opacity: 0.7 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 24, fontWeight: 600 }}>
                {s.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div className="mb-4">
        <h6 className="mb-2">Quick Actions</h6>

        <div className="d-flex flex-wrap gap-2">
          <button
            className="btn btn-primary"
            onClick={() => setShowContactModal(true)}
          >
            + Add Contact
          </button>

          <button
            className="btn btn-outline-primary"
            onClick={() => setShowCampaignModal(true)}
          >
            + Create Campaign
          </button>

          <button className="btn btn-outline-secondary">
            View Reports
          </button>
        </div>
      </div>

      {/* ACTIVITY */}
      <div>
        <h6 className="mb-2">Recent Activity</h6>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            "Ali Raza opened campaign message",
            "New lead added: Sara Khan",
            "Ramadan Offer campaign started",
            "John Doe replied to message",
          ].map((item, i) => (
            <div key={i} style={{ ...cardStyle, padding: 12 }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ================= CONTACT MODAL ================= */}
      {showContactModal && (
        <>
          <div style={backdropStyle} onClick={() => setShowContactModal(false)} />

          <div style={modalStyle}>
            <div className="p-3 border-bottom">
              <h5>Add Contact</h5>
            </div>

            <div className="p-3 d-flex flex-column gap-2">
              <input style={inputStyle} placeholder="Name" />
              <input style={inputStyle} placeholder="Phone" />
              <input style={inputStyle} placeholder="Email" />
              <input style={inputStyle} placeholder="Tag" />
            </div>

            <div className="p-3 border-top">
              <button
                className="btn btn-primary w-100"
                onClick={() => {
                  setShowContactModal(false);
                  setSuccess({
                    message: "Contact Added Successfully",
                    redirect: "/contacts",
                  });
                }}
              >
                Save Contact
              </button>
            </div>
          </div>
        </>
      )}

      {/* ================= CAMPAIGN MODAL ================= */}
      {showCampaignModal && (
        <>
          <div style={backdropStyle} onClick={() => setShowCampaignModal(false)} />

          <div style={modalStyle}>
            <div className="p-3 border-bottom">
              <h5>Create Campaign</h5>
            </div>

            <div className="p-3 d-flex flex-column gap-3">
              <input style={inputStyle} placeholder="Campaign Name" />

              <select style={inputStyle}>
                <option>Select Audience</option>
                <option>Customer</option>
                <option>New</option>
                <option>Hot Lead</option>
              </select>

              <textarea
                style={inputStyle}
                rows={3}
                placeholder="Message..."
              />
            </div>

            <div className="p-3 border-top d-flex gap-2">
              <button
                className="btn btn-secondary w-50"
                onClick={() => setShowCampaignModal(false)}
              >
                Save Draft
              </button>

              <button
                className="btn btn-primary w-50"
                onClick={() => {
                  setShowCampaignModal(false);
                  setSuccess({
                    message: "Campaign Created Successfully",
                    redirect: "/campaigns",
                  });
                }}
              >
                Launch
              </button>
            </div>
          </div>
        </>
      )}

      {/* ================= SUCCESS MODAL ================= */}
      {success && (
        <>
          <div style={backdropStyle} onClick={() => setSuccess(null)} />

          <div style={modalStyle}>
            <div className="p-4 text-center">
              <h5>{success.message}</h5>

              <button
                className="btn btn-primary mt-3"
                onClick={() => {
                  router.push(success.redirect);
                }}
              >
                {success.redirect === "/contacts"
                  ? "View Contacts"
                  : "View Campaigns"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}