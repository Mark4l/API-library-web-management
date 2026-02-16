import { useState } from "react";

export default function BooksTable({ books, onEdit, onDelete, onView }) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBooks = books.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Author</th>
            <th style={thStyle}>ISBN</th>
            <th style={thStyle}>Genre</th>
            <th style={thStyle}>Year</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Created At</th>
            <th style={thStyle}>Last Edited</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map(book => (
            <tr key={book.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={tdStyle}>{book.title}</td>
              <td style={tdStyle}>{book.author}</td>
              <td style={tdStyle}>{book.isbn}</td>
              <td style={tdStyle}>{book.genre}</td>
              <td style={tdStyle}>{book.year || "N/A"}</td>
              <td style={tdStyle}>{book.description}</td>
              <td style={tdStyle}>
                {book.created_at ? new Date(book.created_at).toLocaleString() : "N/A"}
              </td>
              <td style={tdStyle}>
                {book.updated_at ? new Date(book.updated_at).toLocaleString() : "N/A"}
              </td>
              <td style={tdStyle}>
                <button style={actionBtn} onClick={() => onView(book.id)}>View</button>
                <button style={actionBtn} onClick={() => onEdit(book)}>Edit</button>
                <button
                  style={{ ...actionBtn, background: "#f44336" }}
                  onClick={() => onDelete(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "15px", gap: "10px" }}>
        <button onClick={handlePrev} disabled={currentPage === 1} style={paginationBtn}>
          Previous
        </button>
        <span style={{ alignSelf: "center" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages} style={paginationBtn}>
          Next
        </button>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

const tdStyle = {
  padding: "12px",
  textAlign: "left",
};

const actionBtn = {
  padding: "5px 10px",
  marginRight: "5px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  background: "#2196F3",
  color: "#fff",
  fontSize: "12px",
};

const paginationBtn = {
  padding: "6px 12px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  background: "#2196F3",
  color: "#fff",
};
