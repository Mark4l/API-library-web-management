import { useEffect } from "react";

export default function Toast({ type, message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const bg = type === "error" ? "#f87171" : "#34d399";

  return (
    <div
      style={{
        backgroundColor: bg,
        color: "white",
        padding: "10px 14px",
        marginBottom: "16px",
        borderRadius: "6px",
        textAlign: "center",
      }}
    >
      {message}
    </div>
  );
}
