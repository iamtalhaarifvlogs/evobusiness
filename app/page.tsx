"use client";

export default function HomePage() {
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
        <p style={{ opacity: 0.7, margin: 0 }}>
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
          <button className="btn btn-primary">
            + Add Contact
          </button>
          <button className="btn btn-outline-primary">
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
            <div
              key={i}
              style={{
                ...cardStyle,
                padding: 12,
                fontSize: 14,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}