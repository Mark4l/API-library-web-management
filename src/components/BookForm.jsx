import { useState } from "react";

export default function BookForm({ initialData = {}, onSubmit, onCancel }) {
  const [book, setBook] = useState({
    title: initialData?.title || "",
    author: initialData?.author || "",
    isbn: initialData?.isbn || "",
    year: initialData?.year || "",
    genre: initialData?.genre || "",
    description: initialData?.description || "",
  });

  const [message, setMessage] = useState("");

<<<<<<< HEAD
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
=======
  function handleChange(e) {
    const { name, value } = e.target;
    setBook(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
>>>>>>> d18564e593577e1e49fc7fad5e0460dc0d09bd3e
    e.preventDefault();
    const missing = Object.values(book).some(v => !v);
    if (missing) {
      setMessage("Please fill in all required fields");
      return;
    }
    onSubmit?.(book, setMessage);
<<<<<<< HEAD
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div style={{
        width: "70%",
        position: "relative",
        padding: "30px",
        marginTop: "30px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        borderRadius: "8px",
        background: "#fff",
      }}>
        {/* Cancel X top-right */}
        <button onClick={onCancel} style={cancelXStyle}>×</button>

        <form onSubmit={handleSubmit} style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "space-between",
          marginTop: "20px",
        }}>
          <input name="title" placeholder="Title" value={book.title} onChange={handleChange} style={{ ...inputStyle, flex: "0 0 48%" }} />
          <input name="author" placeholder="Author" value={book.author} onChange={handleChange} style={{ ...inputStyle, flex: "0 0 48%" }} />
          <input name="isbn" placeholder="ISBN" value={book.isbn} onChange={handleChange} style={{ ...inputStyle, flex: "0 0 48%" }} />
          <input name="year" type="number" placeholder="Year" value={book.year} onChange={handleChange} style={{ ...inputStyle, flex: "0 0 48%" }} />
          <input name="genre" placeholder="Genre" value={book.genre} onChange={handleChange} style={{ ...inputStyle, flex: "0 0 48%" }} />
          <textarea name="description" placeholder="Description" value={book.description} onChange={handleChange} style={{ ...textareaStyle, flex: "0 0 100%" }} />

          {/* Save button centered */}
          <div style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
            <button type="submit" style={saveBtnStyle}>+ Save</button>
          </div>

          {message && <div style={{ width: "100%", textAlign: "center", marginTop: "15px", color: "green" }}>{message}</div>}
=======
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div
        style={{
          width: "70%",
          padding: "30px",
          marginTop: "30px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          borderRadius: "8px",
          background: "#fff",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "space-between",
          }}
        >
          <input
            name="title"
            placeholder="Title"
            value={book.title}
            onChange={handleChange}
            style={{ ...inputStyle, flex: "0 0 48%" }}
          />
          <input
            name="author"
            placeholder="Author"
            value={book.author}
            onChange={handleChange}
            style={{ ...inputStyle, flex: "0 0 48%" }}
          />

          <input
            name="isbn"
            placeholder="ISBN"
            value={book.isbn}
            onChange={handleChange}
            style={{ ...inputStyle, flex: "0 0 48%" }}
          />
          <input
            name="year"
            type="date"
            placeholder="Creation Date"
            value={book.year}
            onChange={handleChange}
            style={{ ...inputStyle, flex: "0 0 48%" }}
          />

          <input
            name="genre"
            placeholder="Genre"
            value={book.genre}
            onChange={handleChange}
            style={{ ...inputStyle, flex: "0 0 48%" }}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={book.description}
            onChange={handleChange}
            style={{ ...textareaStyle, flex: "0 0 100%" }}
          />

          <div style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
            <button
              type="submit"
              style={{ ...buttonStyle, background: "#2196F3", color: "#fff" }}
            >
              + Save
            </button>
            <button
              type="button"
              onClick={() => onCancel?.()}
              style={{
                ...buttonStyle,
                background: "#f44336",
                color: "#fff",
                marginLeft: "10px",
              }}
            >
              x Cancel
            </button>
          </div>

          {message && (
            <div
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: "15px",
                color: "green",
              }}
            >
              {message}
            </div>
          )}
>>>>>>> d18564e593577e1e49fc7fad5e0460dc0d09bd3e
        </form>
      </div>
    </div>
  );
}

<<<<<<< HEAD
const inputStyle = { padding: "12px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box" };
const textareaStyle = { padding: "12px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "14px", minHeight: "80px", resize: "vertical", boxSizing: "border-box" };
const saveBtnStyle = { padding: "10px 20px", borderRadius: "6px", border: "none", cursor: "pointer", background: "#2196F3", color: "#fff" };
const cancelXStyle = { position: "absolute", top: "10px", right: "10px", padding: "6px 12px", border: "none", background: "transparent", fontSize: "20px", cursor: "pointer", color: "#f44336" };
=======
const inputStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "14px",
  boxSizing: "border-box",
};

const textareaStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "14px",
  minHeight: "80px",
  resize: "vertical",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
};
>>>>>>> d18564e593577e1e49fc7fad5e0460dc0d09bd3e
