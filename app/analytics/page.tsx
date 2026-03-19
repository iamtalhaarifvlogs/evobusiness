"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AnalyticsPage() {
  const [duration, setDuration] = useState("week");

  const data = [
    { name: "Mon", chats: 30, users: 10 },
    { name: "Tue", chats: 45, users: 15 },
    { name: "Wed", chats: 60, users: 20 },
    { name: "Thu", chats: 40, users: 12 },
    { name: "Fri", chats: 80, users: 25 },
    { name: "Sat", chats: 50, users: 18 },
    { name: "Sun", chats: 70, users: 22 },
  ];

  const cardStyle: React.CSSProperties = {
    background: "var(--card)",
    color: "var(--text)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  };

  return (
    <div
      className="container-fluid py-3"
      style={{ background: "var(--card)", color: "var(--text)" }}
    >
      {/* HEADER */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
        <h5 className="mb-0">Analytics</h5>

        <select
          className="form-select w-auto"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{
            background: "var(--card)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          }}
        >
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* STATS CARDS */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-sm-6 col-lg-3">
          <div style={cardStyle}>
            <h6>Total Chats</h6>
            <h4>375</h4>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div style={cardStyle}>
            <h6>Active Users</h6>
            <h4>98</h4>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div style={cardStyle}>
            <h6>Bot Responses</h6>
            <h4>290</h4>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div style={cardStyle}>
            <h6>Manual Replies</h6>
            <h4>85</h4>
          </div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="row g-3">
        {/* LINE CHART */}
        <div className="col-12 col-lg-6">
          <div style={cardStyle}>
            <h6>Chats Over Time</h6>

            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="var(--text)" />
                  <YAxis stroke="var(--text)" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="chats"
                    stroke="#0d6efd"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* BAR CHART */}
        <div className="col-12 col-lg-6">
          <div style={cardStyle}>
            <h6>User Activity</h6>

            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="var(--text)" />
                  <YAxis stroke="var(--text)" />
                  <Tooltip />
                  <Bar dataKey="users" fill="#198754" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}