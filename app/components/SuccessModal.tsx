"use client";

import { useRouter } from "next/navigation";

type Props = {
  show: boolean;
  title: string;
  message: string;
  buttonText: string;
  redirectTo: string;
  onClose: () => void;
};

export default function SuccessModal({
  show,
  title,
  message,
  buttonText,
  redirectTo,
  onClose,
}: Props) {
  const router = useRouter();

  if (!show) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
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
          maxWidth: 400,
          background: "var(--card)",
          color: "var(--text)",
          borderRadius: 16,
          border: "1px solid var(--border)",
          zIndex: 1050,
          textAlign: "center",
          padding: 20,
        }}
      >
        <h5 style={{ marginBottom: 10 }}>{title}</h5>
        <p style={{ opacity: 0.7 }}>{message}</p>

        <button
          className="btn btn-primary w-100 mt-2"
          onClick={() => {
            onClose();
            router.push(redirectTo);
          }}
        >
          {buttonText}
        </button>
      </div>
    </>
  );
}