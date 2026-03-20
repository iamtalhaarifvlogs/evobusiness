"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
} from "@/app/lib/storage";

import SuccessModal from "@/app/components/SuccessModal";

type Contact = {
  id: number;
  name: string;
  phone: string;
  email: string;
  tag: string;
};

export default function ContactsPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [tag, setTag] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    setContacts(getContacts());
  }, []);

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setTag("");
    setEditingId(null);
    setError("");
  };

  const handleEdit = (contact: Contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setEmail(contact.email);
    setTag(contact.tag);

    setEditingId(contact.id);
    setShowAddModal(true);
  };

  const handleSave = () => {
    setError("");

    if (!name || !phone || !email || !tag) {
      setError("All fields are required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (editingId !== null) {
      updateContact({
        id: editingId,
        name,
        phone,
        email,
        tag,
      });
    } else {
      addContact({
        id: Date.now(),
        name,
        phone,
        email,
        tag,
      });
    }

    setContacts(getContacts());
    setShowSuccess(true);
    setShowAddModal(false);
    resetForm();
  };

  const handleDelete = () => {
    if (!selectedContact) return;

    deleteContact(selectedContact.id);
    setContacts(getContacts());

    setSelectedContact(null);
    setShowDeleteModal(false);
    setShowSuccess(true);
  };

  // ================= VIEW CHAT =================
  const handleViewChat = (contact: Contact) => {
    router.push(`/conversations?contactId=${contact.id}`);
  };

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
  };

  return (
    <div className="container-fluid py-3">

      {/* HEADER */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">

        <h5 className="mb-0">Contacts</h5>

        <div className="d-flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            style={{ ...inputStyle, maxWidth: 260 }}
          />

          <button
            className="btn btn-primary"
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
          >
            + Add
          </button>
        </div>
      </div>

      {/* CONTACTS */}
      <div className="row g-3">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="col-12 col-md-4">
            <div style={cardStyle}>

              {/* INFO */}
              <div
                onClick={() => setSelectedContact(contact)}
                style={{ cursor: "pointer" }}
              >
                <h6>{contact.name}</h6>
                <div style={{ fontSize: 13 }}>{contact.phone}</div>
                <div style={{ fontSize: 13 }}>{contact.email}</div>
                <small>{contact.tag}</small>
              </div>

              {/* ACTIONS */}
              <div className="d-flex flex-wrap gap-2 mt-3">

                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleEdit(contact)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => {
                    setSelectedContact(contact);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </button>

                {/* ✅ NEW VIEW CHAT BUTTON */}
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleViewChat(contact)}
                >
                  View Chat
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT MODAL */}
      {showAddModal && (
        <>
          <div style={backdropStyle} onClick={() => setShowAddModal(false)} />

          <div style={modalStyle}>
            <div style={{ padding: 15, borderBottom: "1px solid var(--border)" }}>
              <h5>{editingId ? "Edit Contact" : "Add Contact"}</h5>
            </div>

            <div style={{ padding: 15, display: "flex", flexDirection: "column", gap: 10 }}>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" style={inputStyle} />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" style={inputStyle} />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={inputStyle} />
              <input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Tag" style={inputStyle} />

              {error && <div style={{ color: "red", fontSize: 13 }}>{error}</div>}
            </div>

            <div style={{ padding: 15, borderTop: "1px solid var(--border)" }}>
              <button className="btn btn-primary w-100" onClick={handleSave}>
                {editingId ? "Save Changes" : "Save Contact"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && selectedContact && (
        <>
          <div style={backdropStyle} onClick={() => setShowDeleteModal(false)} />

          <div style={modalStyle}>
            <div style={{ padding: 15 }}>
              <h5>Are you sure?</h5>
              <p>
                Delete <b>{selectedContact.name}</b>?
              </p>
            </div>

            <div className="d-flex gap-2 p-3">
              <button className="btn btn-secondary w-50" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="btn btn-danger w-50" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </>
      )}

      {/* SUCCESS */}
      <SuccessModal
        show={showSuccess}
        title="Success 🎉"
        message="Action completed successfully"
        buttonText="Okay"
        redirectTo="/contacts"
        onClose={() => setShowSuccess(false)}
      />

      {/* DETAILS MODAL */}
      {selectedContact && !showDeleteModal && (
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