"use client";

import { useState, useEffect } from "react";
import { getContacts, addContact } from "@/app/lib/storage";
import SuccessModal from "@/app/components/SuccessModal";

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

  // form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [tag, setTag] = useState("");

  // success modal
  const [showSuccess, setShowSuccess] = useState(false);

  // validation error
  const [error, setError] = useState("");

  // ================= LOAD DATA =================
  useEffect(() => {
    setContacts(getContacts());
  }, []);

  // ================= FILTER =================
  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // ================= VALIDATION =================
  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // ================= SAVE CONTACT =================
  const handleSave = () => {
    setError("");

    // VALIDATION RULES
    if (!name || !phone || !email || !tag) {
      setError("All fields are required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email format");
      return;
    }

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

    // show success modal
    setShowSuccess(true);
  };

  // ================= STYLES =================
  const cardStyle: React.CSSProperties = {
    background: "var(--card)",
    color: "var(--text)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: 16,
    cursor: "pointer",
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
    <div className="container-fluid py-3">

      {/* HEADER */}
      <div className="d-flex justify-content-between mb-3">
        <h5>Contacts</h5>

        <div className="d-flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            style={inputStyle}
          />

          <button
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            + Add
          </button>
        </div>
      </div>

      {/* CONTACTS */}
      <div className="row g-3">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="col-12 col-md-4">
            <div style={cardStyle} onClick={() => setSelectedContact(contact)}>
              <h6>{contact.name}</h6>
              <div style={{ fontSize: 13 }}>{contact.phone}</div>
              <div style={{ fontSize: 13 }}>{contact.email}</div>
              <small>{contact.tag}</small>
            </div>
          </div>
        ))}
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <>
          <div style={backdropStyle} onClick={() => setShowAddModal(false)} />

          <div style={modalStyle}>
            <div style={{ padding: 15, borderBottom: "1px solid var(--border)" }}>
              <h5>Add Contact</h5>
            </div>

            <div style={{ padding: 15, display: "flex", flexDirection: "column", gap: 10 }}>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" style={inputStyle} />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" style={inputStyle} />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={inputStyle} />
              <input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Tag" style={inputStyle} />

              {/* ERROR MESSAGE */}
              {error && (
                <div style={{ color: "red", fontSize: 13 }}>
                  {error}
                </div>
              )}
            </div>

            <div style={{ padding: 15, borderTop: "1px solid var(--border)" }}>
              <button className="btn btn-primary w-100" onClick={handleSave}>
                Save Contact
              </button>
            </div>
          </div>
        </>
      )}

      {/* SUCCESS MODAL */}
      <SuccessModal
        show={showSuccess}
        title="Contact Added 🎉"
        message="Your contact has been saved successfully."
        buttonText="View Contacts"
        redirectTo="/contacts"
        onClose={() => setShowSuccess(false)}
      />

      {/* DETAILS MODAL (unchanged) */}
      {selectedContact && (
        <>
          <div style={backdropStyle} onClick={() => setSelectedContact(null)} />

          <div style={modalStyle}>
            <div style={{ padding: 15 }}>
              <h5>{selectedContact.name}</h5>
              <p>{selectedContact.phone}</p>
              <p>{selectedContact.email}</p>
              <p>{selectedContact.tag}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}