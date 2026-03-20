"use client";

import { useEffect, useState } from "react";
import { getContacts } from "@/app/lib/storage";

// ================= TYPES =================
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
  sender: "user" | "bot";
  text: string;
};

// ================= STORAGE KEYS =================
const CHAT_KEY = "chats";
const MESSAGE_KEY = "messages";

// ================= COMPONENT =================
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

  // ================= LOAD EVERYTHING =================
  useEffect(() => {
    setContacts(getContacts());

    const storedChats = JSON.parse(localStorage.getItem(CHAT_KEY) || "[]");
    const storedMessages = JSON.parse(localStorage.getItem(MESSAGE_KEY) || "{}");

    setChats(storedChats);
    setMessagesMap(storedMessages);

    // 🔥 HANDLE CONTACT → CHAT HANDOFF
    const selectedContactId = localStorage.getItem("openChatContactId");

    if (selectedContactId) {
      const contactId = Number(selectedContactId);
      const contact = getContacts().find((c) => c.id === contactId);

      if (contact) {
        const existing = storedChats.find((c: Chat) => c.contactId === contact.id);

        if (existing) {
          setSelectedChat(existing);
        } else {
          const newChat: Chat = {
            id: Date.now(),
            contactId: contact.id,
            name: contact.name,
            lastMessage: "No messages yet",
          };

          const updatedChats = [newChat, ...storedChats];

          setChats(updatedChats);
          localStorage.setItem(CHAT_KEY, JSON.stringify(updatedChats));

          setMessagesMap((prev) => ({
            ...prev,
            [newChat.id]: [],
          }));

          setSelectedChat(newChat);
        }
      }

      localStorage.removeItem("openChatContactId");
    }
  }, []);

  // ================= PERSIST =================
  useEffect(() => {
    localStorage.setItem(CHAT_KEY, JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem(MESSAGE_KEY, JSON.stringify(messagesMap));
  }, [messagesMap]);

  const currentMessages = selectedChat
    ? messagesMap[selectedChat.id] || []
    : [];

  // ================= START CHAT =================
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
        c.id === selectedChat.id ? { ...c, lastMessage: input } : c
      )
    );

    setInput("");

    if (!manualMode) {
      setTimeout(() => {
        const botMsg: Message = {
          id: Date.now(),
          sender: "bot",
          text: "🤖 AI response placeholder",
        };

        setMessagesMap((prev) => ({
          ...prev,
          [selectedChat.id]: [...(prev[selectedChat.id] || []), botMsg],
        }));
      }, 600);
    }
  };

  // ================= UI =================
  return (
    <div className="container-fluid py-3">

      {/* HEADER */}
      <div className="d-flex justify-content-between mb-3">
        <h5>Conversations</h5>

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
      </div>

      {/* ================= CHAT MODAL ================= */}
      {selectedChat && (
        <div style={overlay}>
          <div style={modal}>

            {/* HEADER */}
            <div className="p-2 border-bottom d-flex justify-content-between align-items-center">
              <b>{selectedChat.name}</b>

              <div className="d-flex gap-2 align-items-center">
                <button
                  onClick={() => setManualMode((p) => !p)}
                  className={`btn btn-sm ${
                    manualMode ? "btn-danger" : "btn-success"
                  }`}
                >
                  {manualMode ? "Manual" : "Bot"}
                </button>

                {/* CLOSE BUTTON */}
                <button
                  onClick={() => setSelectedChat(null)}
                  className="btn btn-sm btn-outline-secondary"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-grow-1 p-3 overflow-auto">
              {currentMessages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    textAlign: m.sender === "user" ? "right" : "left",
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "10px 14px",
                      borderRadius: 12,
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
            <div className="p-2 border-top d-flex gap-2 align-items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={!manualMode}
                className="form-control"
                placeholder={
                  manualMode ? "Type message..." : "Bot is active..."
                }
              />

              {/* ROUND SEND BUTTON */}
              <button
                onClick={sendMessage}
                disabled={!manualMode}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  border: "none",
                  background: "#0d6efd",
                  color: "#fff",
                  fontSize: 18,
                }}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CONTACT SELECTOR ================= */}
      {showContacts && (
        <div style={overlay}>
          <div style={contactModal}>
            <h6>Select Contact</h6>

            {contacts.length === 0 ? (
              <p>No contacts found</p>
            ) : (
              contacts.map((c) => (
                <div
                  key={c.id}
                  onClick={() => startChatWithContact(c)}
                  style={contactItem}
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

// ================= STYLES =================
const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  zIndex: 9999,
};

const modal: React.CSSProperties = {
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
};

const contactModal: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  background: "#fff",
  borderRadius: 10,
  padding: 10,
};

const contactItem: React.CSSProperties = {
  padding: 8,
  borderBottom: "1px solid #ddd",
  cursor: "pointer",
};