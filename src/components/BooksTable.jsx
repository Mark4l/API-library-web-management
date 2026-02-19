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
      </div>
    </div>
  );
}
