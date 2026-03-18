"use client";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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

  return (
    <div className="container-fluid py-3">

      {/* HEADER */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
        <h5 className="mb-0">Contacts</h5>

        <div className="d-flex gap-2 w-100 w-md-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
          <div
            key={contact.id}
            className="col-12 col-sm-6 col-lg-4"
          >
            <div
              className="p-3 bg-white rounded shadow-sm h-100"
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedContact(contact)}
            >
              <h6 className="mb-1">{contact.name}</h6>
              <small className="text-muted d-block">
                {contact.phone}
              </small>
              <small className="text-muted d-block">
                {contact.email}
              </small>

              <span className="badge bg-secondary mt-2">
                {contact.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CONTACT DETAILS MODAL */}
      {selectedContact && (
        <>
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
              <div className="modal-content">

                <div className="modal-header">
                  <h5>{selectedContact.name}</h5>
                  <button
                    className="btn-close"
                    onClick={() => setSelectedContact(null)}
                  />
                </div>

                <div className="modal-body">
                  <p><strong>Phone:</strong> {selectedContact.phone}</p>
                  <p><strong>Email:</strong> {selectedContact.email}</p>
                  <p>
                    <strong>Tag:</strong>{" "}
                    <span className="badge bg-secondary">
                      {selectedContact.tag}
                    </span>
                  </p>
                </div>

                <div className="modal-footer">
                  <button className="btn btn-outline-primary">
                    Start Conversation
                  </button>
                </div>

              </div>
            </div>
          </div>

          <div
            className="modal-backdrop fade show"
            onClick={() => setSelectedContact(null)}
          ></div>
        </>
      )}

      {/* ADD CONTACT MODAL */}
      {showAddModal && (
        <>
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
              <div className="modal-content">

                <div className="modal-header">
                  <h5>Add Contact</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowAddModal(false)}
                  />
                </div>

                <div className="modal-body d-flex flex-column gap-2">
                  <input className="form-control" placeholder="Name" />
                  <input className="form-control" placeholder="Phone" />
                  <input className="form-control" placeholder="Email" />
                  <input className="form-control" placeholder="Tag" />
                </div>

                <div className="modal-footer">
                  <button className="btn btn-primary">
                    Save Contact
                  </button>
                </div>

              </div>
            </div>
          </div>

          <div
            className="modal-backdrop fade show"
            onClick={() => setShowAddModal(false)}
          ></div>
        </>
      )}
    </div>
  );
}
