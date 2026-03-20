"use client";

import { useEffect, useState } from "react";
import SuccessModal from "@/app/components/SuccessModal";
import { getSettings, saveSettings, Settings } from "@/app/lib/storage";

export default function SettingsPage() {
  // ================= STATE =================
  const [settings, setSettings] = useState<Settings>({
    theme: "light",
    notifications: true,
    autoSave: true,
  });

  const [botType, setBotType] = useState("openai");

  const [openaiKey, setOpenaiKey] = useState("");
  const [grokKey, setGrokKey] = useState("");

  const [phoneId, setPhoneId] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const [autoReply, setAutoReply] = useState(true);
  const [delay, setDelay] = useState(2);

  const [success, setSuccess] = useState(false);

  // ================= LOAD SAVED SETTINGS =================
  useEffect(() => {
    const saved = getSettings();
    setSettings(saved);
  }, []);

  // ================= STYLES =================
  const cardStyle: React.CSSProperties = {
    background: "var(--card)",
    color: "var(--text)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: 16,
  };

  const inputStyle: React.CSSProperties = {
    padding: 10,
    borderRadius: 8,
    border: "1px solid var(--border)",
    background: "var(--bg)",
    color: "var(--text)",
    width: "100%",
  };

  // ================= UPDATE SETTINGS =================
  const updateSettings = (key: keyof Settings, value: any) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
  };

  // ================= SAVE =================
  const handleSave = () => {
    saveSettings(settings);
    setSuccess(true);
  };

  return (
    <div
      className="container-fluid py-3"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
      }}
    >
      <h4 className="mb-4">Settings</h4>

      {/* ================= AI BOT SETTINGS ================= */}
      <div style={cardStyle} className="mb-3">
        <h6>AI Bot Configuration</h6>

        <div className="mt-2">
          <label>Choose Bot</label>
          <select
            value={botType}
            onChange={(e) => setBotType(e.target.value)}
            style={inputStyle}
          >
            <option value="local">Local AI</option>
            <option value="openai">OpenAI</option>
            <option value="grok">Grok</option>
          </select>
        </div>

        {botType === "openai" && (
          <div className="mt-2">
            <label>OpenAI API Key</label>
            <input
              type="password"
              placeholder="sk-..."
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              style={inputStyle}
            />
          </div>
        )}

        {botType === "grok" && (
          <div className="mt-2">
            <label>Grok API Key</label>
            <input
              type="password"
              value={grokKey}
              onChange={(e) => setGrokKey(e.target.value)}
              style={inputStyle}
            />
          </div>
        )}
      </div>

      {/* ================= WHATSAPP SETTINGS ================= */}
      <div style={cardStyle} className="mb-3">
        <h6>WhatsApp API Setup</h6>

        <div className="mt-2">
          <label>Phone Number ID</label>
          <input
            value={phoneId}
            onChange={(e) => setPhoneId(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div className="mt-2">
          <label>Access Token</label>
          <input
            type="password"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div className="mt-2">
          <label>Webhook URL</label>
          <input
            value="https://yourdomain.com/api/webhook"
            disabled
            style={{ ...inputStyle, opacity: 0.6 }}
          />
        </div>
      </div>

      {/* ================= AUTOMATION SETTINGS ================= */}
      <div style={cardStyle} className="mb-3">
        <h6>Automation Settings</h6>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <span>Auto Reply</span>
          <input
            type="checkbox"
            checked={autoReply}
            onChange={(e) => setAutoReply(e.target.checked)}
          />
        </div>

        <div className="mt-3">
          <label>Reply Delay (seconds)</label>
          <input
            type="number"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            style={inputStyle}
          />
        </div>
      </div>

      {/* ================= GLOBAL SETTINGS (NEW FIXED STORAGE) ================= */}
      <div style={cardStyle} className="mb-3">
        <h6>App Preferences</h6>

        <div className="d-flex justify-content-between align-items-center">
          <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={settings.theme === "dark"}
            onChange={(e) =>
              updateSettings("theme", e.target.checked ? "dark" : "light")
            }
          />
        </div>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <span>Notifications</span>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) =>
              updateSettings("notifications", e.target.checked)
            }
          />
        </div>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <span>Auto Save</span>
          <input
            type="checkbox"
            checked={settings.autoSave}
            onChange={(e) => updateSettings("autoSave", e.target.checked)}
          />
        </div>
      </div>

      {/* SAVE BUTTON */}
      <button className="btn btn-primary" onClick={handleSave}>
        Save Settings
      </button>

      {/* SUCCESS MODAL */}
      <SuccessModal
        show={success}
        title="Saved ✅"
        message="Settings updated successfully"
        buttonText="Close"
        redirectTo="/"
        onClose={() => setSuccess(false)}
      />
    </div>
  );
}