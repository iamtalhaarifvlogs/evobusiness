"use client";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

type Chat = {
  id: number;
  name: string;
  lastMessage: string;
};

type Message = {
  sender: "bot" | "user";
  text: string;
};

export default function ConversationsPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [botPaused, setBotPaused] = useState(false);

  const chats: Chat[] = [
    { id: 1, name: "Ali Raza", lastMessage: "Hi, I need help with pricing" },
    { id: 2, name: "Sara Khan", lastMessage: "Is this available?" },
    { id: 3, name: "John Doe", lastMessage: "Tell me more about your service" },
  ];

  const messages: Message[] = [
    { sender: "user", text: "Hi" },
    { sender: "bot", text: "Hello! How can I assist you today?" },
    { sender: "user", text: "I need pricing details" },
    { sender: "bot", text: "Sure, let me guide you." },
  ];

  return (
    <div className="container-fluid py-3">
      
      {/* HEADER ROW */}
      <div className="d-flex justify-content-between align-items-center mb-3 px-2">
        <h5 className="mb-0">Conversations</h5>
        <button className="btn btn-primary btn-sm">+ New</button>
      </div>

      {/* CHAT LIST */}
      <div className="row">
        <div className="col-12 col-md-4 col-lg-3 border-end">
          <div className="list-group">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="list-group-item list-group-item-action"
                onClick={() => setSelectedChat(chat)}
                style={{ cursor: "pointer" }}
              >
                <strong>{chat.name}</strong>
                <div className="text-muted small">
                  {chat.lastMessage}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP EMPTY STATE */}
        <div className="d-none d-md-flex col-md-8 col-lg-9 align-items-center justify-content-center">
          <div className="text-center text-muted">
            <h5>Select a conversation</h5>
            <p>Click a chat to open messages</p>
          </div>
        </div>
      </div>

      {/* CHAT MODAL */}
      {selectedChat && (
        <>
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down modal-lg">
              <div className="modal-content d-flex flex-column" style={{ height: "90vh" }}>

                {/* HEADER */}
                <div className="modal-header sticky-top bg-white">
                  <h6 className="mb-0">{selectedChat.name}</h6>

                  <div className="d-flex align-items-center gap-2">
                    <button
                      className={`btn btn-sm ${
                        botPaused ? "btn-danger" : "btn-success"
                      }`}
                      onClick={() => setBotPaused(!botPaused)}
                    >
                      {botPaused ? "Paused" : "Bot"}
                    </button>

                    <button
                      className="btn-close"
                      onClick={() => setSelectedChat(null)}
                    />
                  </div>
                </div>

                {/* MESSAGES */}
                <div
                  className="flex-grow-1 p-3"
                  style={{ overflowY: "auto", background: "#f8f9fa" }}
                >
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`d-flex mb-2 ${
                        msg.sender === "user"
                          ? "justify-content-start"
                          : "justify-content-end"
                      }`}
                    >
                      <div
                        className={`p-2 rounded ${
                          msg.sender === "user"
                            ? "bg-white border"
                            : "bg-primary text-white"
                        }`}
                        style={{ maxWidth: "75%" }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* INPUT */}
                <div className="p-2 border-top bg-white d-flex gap-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={
                      botPaused
                        ? "Type message..."
                        : "Bot is active..."
                    }
                    disabled={!botPaused}
                  />
                  <button
                    className="btn btn-primary"
                    disabled={!botPaused}
                  >
                    Send
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* BACKDROP */}
          <div
            className="modal-backdrop fade show"
            onClick={() => setSelectedChat(null)}
          ></div>
        </>
      )}
    </div>
  );
}
