<<<<<<< HEAD
import { useState, useMemo, useEffect } from "react";
import styles from "./BooksTable.module.css"; // CSS module

export default function BooksTable({ books = [], onEdit, onDelete, onView, onBorrow, onReturn }) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => setCurrentPage(1), [books]);

  const totalPages = Math.max(1, Math.ceil(books.length / ITEMS_PER_PAGE));

  const currentBooks = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return books.slice(start, start + ITEMS_PER_PAGE);
  }, [books, currentPage]);

  const handleNext = () => currentPage < totalPages && setCurrentPage((p) => p + 1);
  const handlePrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);

  const truncate = (text, length = 12) => text?.length > length ? text.slice(0, length) + "..." : text || "";

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Genre</th>
            <th>Year</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentBooks.map((book) => (
            <tr key={book.id}>
              <td title={book.title}>{truncate(book.title)}</td>
              <td title={book.author}>{truncate(book.author)}</td>
              <td title={book.isbn}>{truncate(book.isbn)}</td>
              <td title={book.genre}>{truncate(book.genre)}</td>
              <td>{book.year || "N/A"}</td>
              <td className={book.is_available ? styles.available : styles.borrowed}>
                {book.is_available ? "Available" : "Borrowed"}
              </td>
              <td>
                <button className={styles.actionBtn} onClick={() => onView(book.id)}>View</button>
                <button className={styles.actionBtn} onClick={() => onEdit(book)}>Edit</button>
                <button className={styles.dangerBtn} onClick={() => onDelete(book.id)}>Delete</button>
                {book.is_available ? (
                  <button className={styles.borrowBtn} onClick={() => onBorrow(book.id)}>Borrow</button>
                ) : (
                  <button className={styles.returnBtn} onClick={() => onReturn(book.id)}>Return</button>
                )}
              </td>
            </tr>
          ))}

          {currentBooks.length === 0 && (
            <tr>
              <td colSpan={7} className={styles.noBooks}>No books found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button onClick={handlePrev} disabled={currentPage === 1} className={styles.pageBtn}>← Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages} className={styles.pageBtn}>Next →</button>
=======
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
>>>>>>> d18564e593577e1e49fc7fad5e0460dc0d09bd3e
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

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
>>>>>>> d18564e593577e1e49fc7fad5e0460dc0d09bd3e
