"use client";

import { useEffect, useState } from "react";
import SuccessModal from "@/app/components/SuccessModal";
import { getSettings, saveSettings, Settings } from "@/app/lib/storage";

type FullSettings = Settings & {
  botType: string;
  openaiKey: string;
  grokKey: string;
  phoneId: string;
  accessToken: string;
  autoReply: boolean;
  delay: number;
};

export default function SettingsPage() {
  // ================= FULL STATE =================
  const [settings, setSettings] = useState<FullSettings>({
    theme: "light",
    notifications: true,
    autoSave: true,

    botType: "openai",
    openaiKey: "",
    grokKey: "",

    phoneId: "",
    accessToken: "",

    autoReply: true,
    delay: 2,
  });

  const [success, setSuccess] = useState(false);

  // ================= LOAD =================
  useEffect(() => {
    const saved = getSettings() as Partial<FullSettings>;

    setSettings((prev) => ({
      ...prev,
      ...saved,
    }));
  }, []);

  // ================= UPDATE =================
  const update = (key: keyof FullSettings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ================= SAVE =================
  const handleSave = () => {
    saveSettings(settings);
    setSuccess(true);
  };

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

      {/* ================= AI BOT ================= */}
      <div style={cardStyle} className="mb-3">
        <h6>AI Bot Configuration</h6>

        <label>Choose Bot</label>
        <select
          value={settings.botType}
          onChange={(e) => update("botType", e.target.value)}
          style={inputStyle}
        >
          <option value="local">Local AI</option>
          <option value="openai">OpenAI</option>
          <option value="grok">Grok</option>
        </select>

        {settings.botType === "openai" && (
          <input
            type="password"
            placeholder="OpenAI Key"
            value={settings.openaiKey}
            onChange={(e) => update("openaiKey", e.target.value)}
            style={inputStyle}
            className="mt-2"
          />
        )}

        {settings.botType === "grok" && (
          <input
            type="password"
            placeholder="Grok Key"
            value={settings.grokKey}
            onChange={(e) => update("grokKey", e.target.value)}
            style={inputStyle}
            className="mt-2"
          />
        )}
      </div>

      {/* ================= WHATSAPP ================= */}
      <div style={cardStyle} className="mb-3">
        <h6>WhatsApp API Setup</h6>

        <input
          placeholder="Phone Number ID"
          value={settings.phoneId}
          onChange={(e) => update("phoneId", e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Access Token"
          value={settings.accessToken}
          onChange={(e) => update("accessToken", e.target.value)}
          style={inputStyle}
          className="mt-2"
        />

        <input
          value="https://yourdomain.com/api/webhook"
          disabled
          style={{ ...inputStyle, opacity: 0.6 }}
          className="mt-2"
        />
      </div>

      {/* ================= AUTOMATION ================= */}
      <div style={cardStyle} className="mb-3">
        <h6>Automation Settings</h6>

        <div className="d-flex justify-content-between">
          <span>Auto Reply</span>
          <input
            type="checkbox"
            checked={settings.autoReply}
            onChange={(e) => update("autoReply", e.target.checked)}
          />
        </div>

        <input
          type="number"
          value={settings.delay}
          onChange={(e) => update("delay", Number(e.target.value))}
          style={inputStyle}
          className="mt-2"
        />
      </div>

      {/* ================= APP PREFS ================= */}
      <div style={cardStyle} className="mb-3">
        <h6>App Preferences</h6>

        <div className="d-flex justify-content-between">
          <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={settings.theme === "dark"}
            onChange={(e) =>
              update("theme", e.target.checked ? "dark" : "light")
            }
          />
        </div>

        <div className="d-flex justify-content-between mt-2">
          <span>Notifications</span>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => update("notifications", e.target.checked)}
          />
        </div>

        <div className="d-flex justify-content-between mt-2">
          <span>Auto Save</span>
          <input
            type="checkbox"
            checked={settings.autoSave}
            onChange={(e) => update("autoSave", e.target.checked)}
          />
        </div>
      </div>

      {/* SAVE */}
      <button className="btn btn-primary" onClick={handleSave}>
        Save Settings
      </button>

      {/* SUCCESS */}
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