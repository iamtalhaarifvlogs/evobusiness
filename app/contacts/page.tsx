"use client";

import { useState } from "react";

type Contact = {
  id: number;
  name: string;
  phone: string;
  email: string;
  tag: string;
};

export default function ContactsPage() {
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const contacts: Contact[] = [
    {
      id: 1,
      name: "Ali Raza",
      phone: "+92 300 1234567",
      email: "ali@email.com",
      tag: "Hot Lead",
    },
    {
      id: 2,
      name: "Sara Khan",
      phone: "+92 301 9876543",
      email: "sara@email.com",
      tag: "Customer",
    },
    {
      id: 3,
      name: "John Doe",
      phone: "+1 555 123456",
      email: "john@email.com",
      tag: "New",
    },
  ];

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

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

  return (
    <div className="container-fluid py-3" style={{ color: "var(--text)" }}>

      {/* HEADER */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
        <h5 className="mb-0">Contacts</h5>

        <div className="d-flex gap-2 w-100 w-md-auto">
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--card)",
              color: "var(--text)",
            }}
          />

          <button
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            + Add
          </button>
        </div>
      </div>

      {/* CONTACT LIST */}
      <div className="row g-3">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="col-12 col-sm-6 col-lg-4">
            <div
              style={cardStyle}
              onClick={() => setSelectedContact(contact)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--border)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--card)")
              }
              style={{
                ...cardStyle,
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              <h6 className="mb-1">{contact.name}</h6>
              <div style={{ fontSize: 13, opacity: 0.7 }}>
                {contact.phone}
              </div>
              <div style={{ fontSize: 13, opacity: 0.7 }}>
                {contact.email}
              </div>

              <span
                style={{
                  display: "inline-block",
                  marginTop: 10,
                  padding: "4px 8px",
                  borderRadius: 8,
                  fontSize: 12,
                  border: "1px solid var(--border)",
                }}
              >
                {contact.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CONTACT DETAILS MODAL */}
      {selectedContact && (
        <>
          <div style={backdropStyle} onClick={() => setSelectedContact(null)} />

          <div style={modalStyle}>
            <div
              style={{
                padding: 14,
                borderBottom: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h5 style={{ margin: 0 }}>{selectedContact.name}</h5>
              <button
                onClick={() => setSelectedContact(null)}
                className="btn btn-sm btn-outline-secondary"
              >
                ✕
              </button>
            </div>

            <div style={{ padding: 14 }}>
              <p><strong>Phone:</strong> {selectedContact.phone}</p>
              <p><strong>Email:</strong> {selectedContact.email}</p>
              <p>
                <strong>Tag:</strong>{" "}
                <span style={{ opacity: 0.8 }}>{selectedContact.tag}</span>
              </p>
            </div>

            <div style={{ padding: 14, borderTop: "1px solid var(--border)" }}>
              <button className="btn btn-primary w-100">
                Start Conversation
              </button>
            </div>
          </div>
        </>
      )}

      {/* ADD CONTACT MODAL */}
      {showAddModal && (
        <>
          <div style={backdropStyle} onClick={() => setShowAddModal(false)} />

          <div style={modalStyle}>
            <div
              style={{
                padding: 14,
                borderBottom: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h5 style={{ margin: 0 }}>Add Contact</h5>
              <button
                onClick={() => setShowAddModal(false)}
                className="btn btn-sm btn-outline-secondary"
              >
                ✕
              </button>
            </div>

            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <input style={inputStyle} placeholder="Name" />
              <input style={inputStyle} placeholder="Phone" />
              <input style={inputStyle} placeholder="Email" />
              <input style={inputStyle} placeholder="Tag" />
            </div>

            <div style={{ padding: 14, borderTop: "1px solid var(--border)" }}>
              <button className="btn btn-primary w-100">
                Save Contact
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
};