"use client";

import { useEffect, useState } from "react";
import { getContacts } from "@/app/lib/storage"; // 👈 adjust path if needed

type Chat = {
  id: number;
  contactId: number;
  name: string;
  lastMessage: string;
};

type Contact = {
  id: number;
  name: string;
};

type Message = {
  id: number;
  sender: "bot" | "user";
  text: string;
};

export default function ConversationsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const [manualMode, setManualMode] = useState(false);
  const [input, setInput] = useState("");
  const [showContacts, setShowContacts] = useState(false);

  const [messagesMap, setMessagesMap] = useState<
    Record<number, Message[]>
  >({});

  // ================= LOAD CONTACTS FROM STORAGE =================
  useEffect(() => {
    const load = () => {
      const stored = getContacts() || [];
      setContacts(stored);
    };

    load();

    // optional live sync (if other page updates)
    const interval = setInterval(load, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentMessages = selectedChat
    ? messagesMap[selectedChat.id] || []
    : [];

  // ================= CREATE CHAT FROM REAL CONTACT =================
  const startChatWithContact = (contact: Contact) => {
    const existing = chats.find((c) => c.contactId === contact.id);

    if (existing) {
      setSelectedChat(existing);
      setShowContacts(false);
      return;
    }

    const newChat: Chat = {
      id: Date.now(),
      contactId: contact.id,
      name: contact.name,
      lastMessage: "No messages yet",
    };

    setChats((prev) => [newChat, ...prev]);

    setMessagesMap((prev) => ({
      ...prev,
      [newChat.id]: [],
    }));

    setSelectedChat(newChat);
    setShowContacts(false);
  };

  // ================= SEND MESSAGE =================
  const sendMessage = () => {
    if (!selectedChat || !input.trim()) return;

    const msg: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
    };

    setMessagesMap((prev) => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), msg],
    }));

    setChats((prev) =>
      prev.map((c) =>
        c.id === selectedChat.id
          ? { ...c, lastMessage: input }
          : c
      )
    );

    setInput("");

    if (!manualMode) {
      setTimeout(() => {
        const botMsg: Message = {
          id: Date.now() + 1,
          sender: "bot",
          text: "🤖 AI response placeholder",
        };

        setMessagesMap((prev) => ({
          ...prev,
          [selectedChat.id]: [...(prev[selectedChat.id] || []), botMsg],
        }));
      }, 700);
    }
  };

  return (
    <div className="container-fluid py-3">

      {/* HEADER */}
      <div className="d-flex justify-content-between mb-3">
        <h5>Conversations</h5>

        {/* NOW REAL CONTACT-BASED FLOW */}
        <button
          onClick={() => setShowContacts(true)}
          className="btn btn-primary btn-sm rounded-pill"
        >
          + New
        </button>
      </div>

      {/* CHAT LIST */}
      <div className="row">
        <div className="col-md-4">
          <div className="border rounded">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                style={{ padding: 10, cursor: "pointer" }}
              >
                <b>{chat.name}</b>
                <div style={{ fontSize: 12, opacity: 0.6 }}>
                  {chat.lastMessage}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-8 d-none d-md-flex align-items-center justify-content-center">
          {!selectedChat && <div>Select a conversation</div>}
        </div>
      </div>

      {/* ================= CHAT MODAL ================= */}
      {selectedChat && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 850,
              height: "85vh",
              background: "var(--card)",
              borderRadius: 12,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* HEADER */}
            <div className="p-2 border-bottom d-flex justify-content-between">
              <b>{selectedChat.name}</b>

              <button
                onClick={() => setManualMode((p) => !p)}
                className={`btn btn-sm ${
                  manualMode ? "btn-danger" : "btn-success"
                }`}
              >
                {manualMode ? "Manual" : "Bot"}
              </button>
            </div>

            {/* MESSAGES */}
            <div className="flex-grow-1 p-3 overflow-auto">
              {currentMessages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    textAlign: m.sender === "user" ? "right" : "left",
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: 8,
                      borderRadius: 10,
                      background:
                        m.sender === "user" ? "#0d6efd" : "#eee",
                      color: m.sender === "user" ? "#fff" : "#000",
                    }}
                  >
                    {m.text}
                  </span>
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div className="p-2 border-top d-flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={!manualMode}
                className="form-control"
                placeholder={
                  manualMode ? "Type..." : "Switch to Manual"
                }
              />

              <button
                onClick={sendMessage}
                disabled={!manualMode}
                className="btn btn-primary"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CONTACT SELECTOR ================= */}
      {showContacts && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 10000,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              background: "#fff",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <h6>Select Contact</h6>

            {contacts.length === 0 ? (
              <p>No contacts found</p>
            ) : (
              contacts.map((c) => (
                <div
                  key={c.id}
                  onClick={() => startChatWithContact(c)}
                  style={{
                    padding: 8,
                    borderBottom: "1px solid #ddd",
                    cursor: "pointer",
                  }}
                >
                  {c.name}
                </div>
              ))
            )}

            <button
              onClick={() => setShowContacts(false)}
              className="btn btn-sm btn-secondary w-100 mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}