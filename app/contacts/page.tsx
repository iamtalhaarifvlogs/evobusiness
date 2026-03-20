"use client";

import { useState, useEffect } from "react";
import { getContacts, addContact } from "@/app/lib/storage";

type Contact = {
  id: number;
  name: string;
  phone: string;
  email: string;
  tag: string;
};

export default function ContactsPage() {
  // ================= STATE =================
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // form state (IMPORTANT FIX)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [tag, setTag] = useState("");

  // ================= LOAD DATA =================
  useEffect(() => {
    setContacts(getContacts());
  }, []);

  // ================= FILTER =================
  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // ================= SAVE CONTACT =================
  const handleSave = () => {
    const newContact: Contact = {
      id: Date.now(),
      name,
      phone,
      email,
      tag,
    };

    addContact(newContact);

    const updated = getContacts();
    setContacts(updated);

    // reset form
    setName("");
    setPhone("");
    setEmail("");
    setTag("");

    setShowAddModal(false);
  };

  // ================= STYLES =================
  const cardStyle: React.CSSProperties = {
    background: "var(--card)",
    color: "var(--text)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: 16,
    cursor: "pointer",
    transition: "0.2s ease",
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
            >
              <h6 className="mb-1">{contact.name}</h6>
              <div style={{ fontSize: 13, opacity: 0.7 }}>{contact.phone}</div>
              <div style={{ fontSize: 13, opacity: 0.7 }}>{contact.email}</div>

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

      {/* DETAILS MODAL */}
      {selectedContact && (
        <>
          <div style={backdropStyle} onClick={() => setSelectedContact(null)} />

          <div style={modalStyle}>
            <div style={{ padding: 14, borderBottom: "1px solid var(--border)" }}>
              <h5>{selectedContact.name}</h5>
            </div>

            <div style={{ padding: 14 }}>
              <p><strong>Phone:</strong> {selectedContact.phone}</p>
              <p><strong>Email:</strong> {selectedContact.email}</p>
              <p><strong>Tag:</strong> {selectedContact.tag}</p>
            </div>
          </div>
        </>
      )}

      {/* ADD MODAL */}
      {showAddModal && (
        <>
          <div style={backdropStyle} onClick={() => setShowAddModal(false)} />

          <div style={modalStyle}>
            <div style={{ padding: 14, borderBottom: "1px solid var(--border)" }}>
              <h5>Add Contact</h5>
            </div>

            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" style={inputStyle} />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" style={inputStyle} />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={inputStyle} />
              <input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Tag" style={inputStyle} />
            </div>

            <div style={{ padding: 14, borderTop: "1px solid var(--border)" }}>
              <button className="btn btn-primary w-100" onClick={handleSave}>
                Save Contact
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}