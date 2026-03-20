"use client";

import { useMemo, useState } from "react";

type Chat = {
  id: number;
  name: string;
  lastMessage: string;
};

type Message = {
  id: number;
  sender: "bot" | "user";
  text: string;
};

export default function ConversationsPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  // true = bot OFF (manual mode)
  const [manualMode, setManualMode] = useState(false);

  const [input, setInput] = useState("");

  const chats: Chat[] = useMemo(
    () => [
      { id: 1, name: "Ali Raza", lastMessage: "Hi, I need help with pricing" },
      { id: 2, name: "Sara Khan", lastMessage: "Is this available?" },
      { id: 3, name: "John Doe", lastMessage: "Tell me more about your service" },
    ],
    []
  );

  const [messagesMap, setMessagesMap] = useState<Record<number, Message[]>>({
    1: [
      { id: 1, sender: "user", text: "Hi" },
      { id: 2, sender: "bot", text: "Hello! How can I assist you today?" },
    ],
    2: [
      { id: 1, sender: "user", text: "Is this available?" },
      { id: 2, sender: "bot", text: "Yes, it is available." },
    ],
    3: [
      { id: 1, sender: "user", text: "Tell me more" },
      { id: 2, sender: "bot", text: "Sure, here's everything you need." },
    ],
  });

  const currentMessages = selectedChat
    ? messagesMap[selectedChat.id] || []
    : [];

  const cardStyle: React.CSSProperties = {
    background: "var(--card)",
    color: "var(--text)",
    border: "1px solid var(--border)",
  };

  // ================= SEND MESSAGE =================
  const sendMessage = () => {
    if (!selectedChat || !input.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
    };

    const updated = {
      ...messagesMap,
      [selectedChat.id]: [
        ...(messagesMap[selectedChat.id] || []),
        newMsg,
      ],
    };

    setMessagesMap(updated);
    setInput("");

    // ================= FUTURE BOT HOOK =================
    if (!manualMode) {
      setTimeout(() => {
        const botReply: Message = {
          id: Date.now() + 1,
          sender: "bot",
          text: "🤖 (AI response will be connected here later)",
        };

        setMessagesMap((prev) => ({
          ...prev,
          [selectedChat.id]: [...(prev[selectedChat.id] || []), botReply],
        }));
      }, 800);
    }
  };

  return (
    <div className="container-fluid py-3" style={{ color: "var(--text)" }}>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3 px-2">
        <h5 className="mb-0">Conversations</h5>
        <button className="btn btn-primary btn-sm">+ New</button>
      </div>

      <div className="row">
        {/* CHAT LIST */}
        <div className="col-12 col-md-4 col-lg-3">
          <div style={{ ...cardStyle, borderRadius: 12, overflow: "hidden" }}>
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                style={{
                  padding: 12,
                  cursor: "pointer",
                  borderBottom: "1px solid var(--border)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--border)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <strong>{chat.name}</strong>
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  {chat.lastMessage}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EMPTY STATE */}
        <div className="d-none d-md-flex col-md-8 col-lg-9 align-items-center justify-content-center">
          {!selectedChat && (
            <div style={{ opacity: 0.6 }}>
              <h5>Select a conversation</h5>
              <p>Click a chat to open messages</p>
            </div>
          )}
        </div>
      </div>

      {/* ================= CHAT MODAL ================= */}
      {selectedChat && (
        <>
          {/* BACKDROP */}
          <div
            onClick={() => setSelectedChat(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 1040,
            }}
          />

          {/* MODAL */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 900,
              height: "85vh",
              background: "var(--card)",
              color: "var(--text)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              zIndex: 1050,
              overflow: "hidden",
            }}
          >
            {/* HEADER */}
            <div
              style={{
                padding: 12,
                borderBottom: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h6 style={{ margin: 0 }}>{selectedChat.name}</h6>

              <div className="d-flex gap-2 align-items-center">
                {/* 🔥 MODE TOGGLE */}
                <button
                  onClick={() => setManualMode((p) => !p)}
                  className={`btn btn-sm ${
                    manualMode ? "btn-danger" : "btn-success"
                  }`}
                >
                  {manualMode ? "Manual Mode" : "Bot Mode"}
                </button>

                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setSelectedChat(null)}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* MESSAGES */}
            <div
              style={{
                flex: 1,
                padding: 12,
                overflowY: "auto",
              }}
            >
              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    justifyContent:
                      msg.sender === "user" ? "flex-start" : "flex-end",
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      padding: "10px 12px",
                      borderRadius: 10,
                      maxWidth: "70%",
                      background:
                        msg.sender === "user" ? "transparent" : "#0d6efd",
                      color:
                        msg.sender === "user"
                          ? "var(--text)"
                          : "#fff",
                      border:
                        msg.sender === "user"
                          ? "1px solid var(--border)"
                          : "none",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div
              style={{
                padding: 10,
                borderTop: "1px solid var(--border)",
                display: "flex",
                gap: 10,
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={!manualMode}
                placeholder={
                  manualMode
                    ? "Type message..."
                    : "Switch to Manual Mode to type..."
                }
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
                onClick={sendMessage}
                className="btn btn-primary"
                disabled={!manualMode}
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}