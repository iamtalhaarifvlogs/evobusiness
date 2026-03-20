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
  const [manualMode, setManualMode] = useState(false);
  const [input, setInput] = useState("");

  // ================= INITIAL CHATS =================
  const [chats, setChats] = useState<Chat[]>([
    { id: 1, name: "Ali Raza", lastMessage: "Hi, I need help with pricing" },
    { id: 2, name: "Sara Khan", lastMessage: "Is this available?" },
    { id: 3, name: "John Doe", lastMessage: "Tell me more about your service" },
  ]);

  const [messagesMap, setMessagesMap] = useState<Record<number, Message[]>>({
    1: [
      { id: 1, sender: "user", text: "Hi" },
      { id: 2, sender: "bot", text: "Hello! How can I assist you?" },
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

  // ================= CREATE NEW CHAT =================
  const createNewChat = () => {
    const newId = Date.now();

    const newChat: Chat = {
      id: newId,
      name: "New Contact",
      lastMessage: "No messages yet",
    };

    setChats((prev) => [newChat, ...prev]);

    setMessagesMap((prev) => ({
      ...prev,
      [newId]: [],
    }));

    setSelectedChat(newChat);
  };

  // ================= SEND MESSAGE =================
  const sendMessage = () => {
    if (!selectedChat || !input.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
    };

    const updatedMessages = {
      ...messagesMap,
      [selectedChat.id]: [
        ...(messagesMap[selectedChat.id] || []),
        newMessage,
      ],
    };

    setMessagesMap(updatedMessages);

    setInput("");

    // update chat preview
    setChats((prev) =>
      prev.map((c) =>
        c.id === selectedChat.id
          ? { ...c, lastMessage: input }
          : c
      )
    );

    // BOT REPLY (only in bot mode)
    if (!manualMode) {
      setTimeout(() => {
        const botReply: Message = {
          id: Date.now() + 1,
          sender: "bot",
          text: "🤖 AI response will connect here later",
        };

        setMessagesMap((prev) => ({
          ...prev,
          [selectedChat.id]: [
            ...(prev[selectedChat.id] || []),
            botReply,
          ],
        }));
      }, 700);
    }
  };

  return (
    <div className="container-fluid py-3" style={{ color: "var(--text)" }}>

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3 px-2">
        <h5 className="mb-0">Conversations</h5>

        {/* FIXED + NEW BUTTON */}
        <button
          onClick={createNewChat}
          className="btn btn-primary btn-sm rounded-pill px-3"
        >
          + New
        </button>
      </div>

      <div className="row">

        {/* CHAT LIST */}
        <div className="col-12 col-md-4 col-lg-3">
          <div
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                style={{
                  padding: "12px 14px",
                  cursor: "pointer",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div style={{ fontWeight: 600 }}>{chat.name}</div>
                <div style={{ fontSize: 12, opacity: 0.6 }}>
                  {chat.lastMessage}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EMPTY STATE */}
        <div className="d-none d-md-flex col-md-8 col-lg-9 align-items-center justify-content-center">
          {!selectedChat && (
            <div style={{ opacity: 0.6, textAlign: "center" }}>
              <h5>Select a conversation</h5>
              <p>Open a chat or create a new one</p>
            </div>
          )}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selectedChat && (
        <>
          {/* BACKDROP (FIXED Z-INDEX) */}
          <div
            onClick={() => setSelectedChat(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.35)",
              zIndex: 9998,
            }}
          />

          {/* MODAL (FIXED OVERLAY ISSUE) */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "92%",
              maxWidth: 900,
              height: "85vh",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              zIndex: 9999, // 🔥 ABOVE EVERYTHING INCLUDING HEADER
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
              <div style={{ fontWeight: 600 }}>
                {selectedChat.name}
              </div>

              <div className="d-flex gap-2 align-items-center">

                <button
                  onClick={() => setManualMode((p) => !p)}
                  className={`btn btn-sm rounded-pill px-3 ${
                    manualMode ? "btn-danger" : "btn-success"
                  }`}
                >
                  {manualMode ? "Manual" : "Bot"}
                </button>

                <button
                  onClick={() => setSelectedChat(null)}
                  className="btn btn-sm btn-outline-secondary rounded-pill"
                >
                  ✕
                </button>

              </div>
            </div>

            {/* MESSAGES */}
            <div
              style={{
                flex: 1,
                padding: 14,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    justifyContent:
                      msg.sender === "user"
                        ? "flex-end"
                        : "flex-start",
                  }}
                >
                  <div
                    style={{
                      padding: "10px 12px",
                      borderRadius: 14,
                      maxWidth: "70%",
                      background:
                        msg.sender === "user"
                          ? "#0d6efd"
                          : "transparent",
                      color:
                        msg.sender === "user"
                          ? "#fff"
                          : "var(--text)",
                      border:
                        msg.sender === "user"
                          ? "none"
                          : "1px solid var(--border)",
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
                padding: 12,
                borderTop: "1px solid var(--border)",
                display: "flex",
                gap: 10,
                alignItems: "center",
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={!manualMode}
                placeholder={
                  manualMode
                    ? "Type message..."
                    : "Switch to Manual Mode"
                }
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: 999,
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                  color: "var(--text)",
                }}
              />

              <button
                onClick={sendMessage}
                disabled={!manualMode}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  border: "none",
                  background: manualMode ? "#0d6efd" : "#999",
                  color: "#fff",
                  fontSize: 16,
                  cursor: manualMode ? "pointer" : "not-allowed",
                }}
              >
                ➤
              </button>
            </div>

          </div>
        </>
      )}
    </div>
  );
}