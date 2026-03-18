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

  // Dummy Data (Replace with API later)
  const data = [
    { name: "Mon", chats: 30, users: 10 },
    { name: "Tue", chats: 45, users: 15 },
    { name: "Wed", chats: 60, users: 20 },
    { name: "Thu", chats: 40, users: 12 },
    { name: "Fri", chats: 80, users: 25 },
    { name: "Sat", chats: 50, users: 18 },
    { name: "Sun", chats: 70, users: 22 },
  ];

  return (
    <div className="container-fluid py-3">

      {/* HEADER */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
        <h5 className="mb-0">Analytics</h5>

        {/* Duration Selector */}
        <select
          className="form-select w-auto"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* STATS CARDS */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="p-3 bg-white rounded shadow-sm">
            <h6>Total Chats</h6>
            <h4>375</h4>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="p-3 bg-white rounded shadow-sm">
            <h6>Active Users</h6>
            <h4>98</h4>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="p-3 bg-white rounded shadow-sm">
            <h6>Bot Responses</h6>
            <h4>290</h4>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="p-3 bg-white rounded shadow-sm">
            <h6>Manual Replies</h6>
            <h4>85</h4>
          </div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="row g-3">

        {/* Line Chart */}
        <div className="col-12 col-lg-6">
          <div className="p-3 bg-white rounded shadow-sm">
            <h6>Chats Over Time</h6>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="chats" stroke="#0d6efd" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="col-12 col-lg-6">
          <div className="p-3 bg-white rounded shadow-sm">
            <h6>User Activity</h6>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
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
