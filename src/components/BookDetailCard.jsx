export default function BookDetailForm({ book, onClose }) {
  if (!book) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: "60%",
          maxHeight: "80%",
          overflowY: "auto",
          background: "#fff",
          borderRadius: "8px",
          padding: "30px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          position: "relative",
        }}
      >
        <button onClick={onClose} style={closeXStyle}>
          ×
        </button>

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Book Details</h2>

        <div style={rowStyle}>
          <label style={labelStyle}>ID:</label>
          <span style={valueStyle}>{book.id}</span>
        </div>

        <div style={rowStyle}>
          <label style={labelStyle}>Title:</label>
          <span style={valueStyle}>{book.title}</span>
        </div>

        <div style={rowStyle}>
          <label style={labelStyle}>Author:</label>
          <span style={valueStyle}>{book.author}</span>
        </div>

        <div style={rowStyle}>
          <label style={labelStyle}>ISBN:</label>
          <span style={valueStyle}>{book.isbn}</span>
        </div>

        <div style={rowStyle}>
          <label style={labelStyle}>Year:</label>
          <span style={valueStyle}>{book.year}</span>
        </div>

        <div style={rowStyle}>
          <label style={labelStyle}>Genre:</label>
          <span style={valueStyle}>{book.genre}</span>
        </div>

        <div style={rowStyle}>
          <label style={labelStyle}>Description:</label>
          <span style={{ ...valueStyle, display: "block", whiteSpace: "pre-wrap" }}>
            {book.description}
          </span>
        </div>

        <div style={rowStyle}>
          <label style={labelStyle}>Created At:</label>
          <span style={valueStyle}>{book.created_at || "-"}</span>
        </div>

        <div style={rowStyle}>
          <label style={labelStyle}>Updated At:</label>
          <span style={valueStyle}>{book.updated_at || "-"}</span>
        </div>

        <div style={{ textAlign: "center", marginTop: "25px" }}>
          <button onClick={onClose} style={closeBtnStyle}>
            Close ×
          </button>
        </div>
      </div>
    </div>
  );
}

const rowStyle = {
  display: "flex",
  marginBottom: "15px",
  gap: "10px",
};

const labelStyle = {
  flex: "0 0 120px",
  fontWeight: "bold",
};

const valueStyle = {
  flex: "1",
};

const closeXStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  padding: "6px 12px",
  border: "none",
  background: "transparent",
  fontSize: "20px",
  cursor: "pointer",
  color: "#f44336",
};

const closeBtnStyle = {
  padding: "10px 20px",
  borderRadius: "6px",
  border: "none",
  background: "#e53935",
  color: "#fff",
  cursor: "pointer",
};
