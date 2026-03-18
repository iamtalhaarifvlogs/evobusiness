"use client";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

type Campaign = {
  id: number;
  name: string;
  tag: string;
  message: string;
  status: "Draft" | "Running" | "Completed";
};

export default function CampaignsPage() {
  const [showModal, setShowModal] = useState(false);

  const campaigns: Campaign[] = [
    {
      id: 1,
      name: "Ramadan Offer",
      tag: "Customer",
      message: "Get 20% off this Ramadan!",
      status: "Running",
    },
    {
      id: 2,
      name: "New Leads Intro",
      tag: "New",
      message: "Welcome! Let us guide you.",
      status: "Draft",
    },
  ];

  return (
    <div className="container-fluid py-3">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Campaigns</h5>

        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Create Campaign
        </button>
      </div>

      {/* CAMPAIGN LIST */}
      <div className="row g-3">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="col-12 col-md-6 col-lg-4"
          >
            <div className="p-3 bg-white rounded shadow-sm h-100">

              <div className="d-flex justify-content-between">
                <h6>{campaign.name}</h6>
                <span
                  className={`badge ${
                    campaign.status === "Running"
                      ? "bg-success"
                      : campaign.status === "Draft"
                      ? "bg-secondary"
                      : "bg-dark"
                  }`}
                >
                  {campaign.status}
                </span>
              </div>

              <small className="text-muted d-block mb-2">
                Audience: {campaign.tag}
              </small>

              <p className="small">{campaign.message}</p>

              <div className="d-flex gap-2 mt-2">
                <button className="btn btn-sm btn-outline-primary">
                  Edit
                </button>
                <button className="btn btn-sm btn-outline-success">
                  Start
                </button>
                <button className="btn btn-sm btn-outline-danger">
                  Stop
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* CREATE CAMPAIGN MODAL */}
      {showModal && (
        <>
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
              <div className="modal-content">

                <div className="modal-header">
                  <h5>Create Campaign</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  />
                </div>

                <div className="modal-body d-flex flex-column gap-3">

                  <input
                    className="form-control"
                    placeholder="Campaign Name"
                  />

                  {/* Audience Selection */}
                  <select className="form-select">
                    <option>Select Audience Tag</option>
                    <option>Customer</option>
                    <option>New</option>
                    <option>Hot Lead</option>
                  </select>

                  {/* Message */}
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Enter campaign message..."
                  />

                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary">
                    Save Draft
                  </button>
                  <button className="btn btn-primary">
                    Launch Campaign
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* BACKDROP */}
          <div
            className="modal-backdrop fade show"
            onClick={() => setShowModal(false)}
          ></div>
        </>
      )}
    </div>
  );
}
