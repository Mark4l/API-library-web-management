<<<<<<< HEAD
import { useEffect, useState, useCallback } from "react";
import styles from "./Home.module.css";

import BookSearch from "../components/BookSearch.jsx";
import BooksTable from "../components/BooksTable.jsx";
import BookForm from "../components/BookForm.jsx";
import BookDetailForm from "../components/BookDetailCard.jsx";
import Toast from "../components/Toast.jsx";

import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
} from "../api/booksApi.js";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState(null);
  const [loading, setLoading] = useState(true);

=======
import { useEffect, useState } from "react";
import BookForm from "../components/BookForm.jsx";
import BooksTable from "../components/BooksTable.jsx";
import BookDetailForm from "../components/BookDetailCard.jsx";
import Toast from "../components/Toast.jsx";
import { getBooks, createBook, updateBook, deleteBook } from "../api/booksApi.js";

export default function Home() {
  const [books, setBooks] = useState([]);
>>>>>>> d18564e593577e1e49fc7fad5e0460dc0d09bd3e
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "" });
<<<<<<< HEAD

  const BORROWER_NAME = "Emanuel";
=======
  const [loading, setLoading] = useState(true);
>>>>>>> d18564e593577e1e49fc7fad5e0460dc0d09bd3e

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await getBooks();
      setBooks(data);
<<<<<<< HEAD
      setFilteredBooks(null);
    } catch {
      showToast("Failed to load books", "error");
=======
    } catch (err) {
      showToast(err.message, "error");
>>>>>>> d18564e593577e1e49fc7fad5e0460dc0d09bd3e
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

<<<<<<< HEAD
  const handleSearchResults = useCallback((results) => {
    setFilteredBooks(results);
  }, []);

  const displayBooks = filteredBooks ?? books;
=======
  const handleSave = async (bookData, setMessage) => {
    try {
      let savedBook;
      if (formData) {
        savedBook = await updateBook({ id: formData.id, ...bookData });
        setBooks(prev => prev.map(b => (b.id === savedBook.id ? savedBook : b)));
        showToast("Book updated successfully");
      } else {
        savedBook = await createBook(bookData);
        setBooks(prev => [...prev, savedBook]);
        showToast("Book added successfully");
      }
      setShowForm(false);
      setFormData(null);
    } catch (err) {
      setMessage(err.message || "Failed to save book");
      showToast(err.message, "error");
    }
  };
>>>>>>> d18564e593577e1e49fc7fad5e0460dc0d09bd3e

  const handleEdit = (book) => {
    setFormData(book);
    setShowForm(true);
  };

  const handleView = (id) => {
<<<<<<< HEAD
    const book = books.find((b) => Number(b.id) === Number(id));
=======
    const book = books.find(b => b.id === id);
>>>>>>> d18564e593577e1e49fc7fad5e0460dc0d09bd3e
    if (book) setShowDetails(book);
  };

  const handleDelete = async (id) => {
<<<<<<< HEAD
    if (!window.confirm("Delete this book?")) return;
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => Number(b.id) !== Number(id)));
      showToast("Book deleted");
    } catch {
      showToast("Delete failed", "error");
    }
  };

  const handleBorrow = async (id) => {
    try {
      await borrowBook(id, BORROWER_NAME);
      setBooks((prev) =>
        prev.map((b) =>
          Number(b.id) === Number(id) ? { ...b, is_available: false } : b
        )
      );
      showToast("Book borrowed");
    } catch {
      showToast("Borrow failed", "error");
    }
  };

  const handleReturn = async (id) => {
    try {
      await returnBook(id, BORROWER_NAME);
      setBooks((prev) =>
        prev.map((b) =>
          Number(b.id) === Number(id) ? { ...b, is_available: true } : b
        )
      );
      showToast("Book returned");
    } catch {
      showToast("Return failed", "error");
    }
  };

  const handleSave = async (payload, setMessage) => {
    try {
      let saved;

      if (formData) {
        saved = await updateBook({ id: formData.id, ...payload });
        setBooks((prev) =>
          prev.map((b) => (Number(b.id) === Number(saved.id) ? saved : b))
        );
      } else {
        saved = await createBook(payload);
        setBooks((prev) => [...prev, saved]);
      }

      setShowForm(false);
      setFormData(null);
      showToast("Saved successfully");
    } catch (err) {
      setMessage(err.message || "Save failed");
=======
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteBook(id);
      setBooks(prev => prev.filter(b => b.id !== id));
      showToast("Book deleted successfully");
    } catch (err) {
      showToast(err.message, "error");
>>>>>>> d18564e593577e1e49fc7fad5e0460dc0d09bd3e
    }
  };

  return (
<<<<<<< HEAD
    <div className={styles.container}>
      {/* Title */}
      <h1 className={styles.title}>Library App</h1>

      {/* Form */}
=======
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "25px" }}>Library App</h1>

      {!showForm && (
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <button
            onClick={() => { setShowForm(true); setFormData(null); }}
            style={{ padding: "10px 20px", background: "#2196F3", color: "#fff", borderRadius: "6px", border: "none", cursor: "pointer" }}
          >
            + Add Book
          </button>
        </div>
      )}

>>>>>>> d18564e593577e1e49fc7fad5e0460dc0d09bd3e
      {showForm && (
        <BookForm
          initialData={formData}
          onSubmit={handleSave}
<<<<<<< HEAD
          onCancel={() => {
            setShowForm(false);
            setFormData(null);
          }}
        />
      )}

      {/* Main Content */}
      {!showForm && (
        <>
          {/* Add button top right */}
          <div className={styles.topActions}>
            <button className={styles.addBtn} onClick={() => setShowForm(true)}>
              + Add Book
            </button>
          </div>

          {/* Search */}
          <div className={styles.searchWrapper}>
            <BookSearch books={books} onResults={handleSearchResults} />
          </div>

          {/* Table */}
          {loading ? (
            <p className={styles.loading}>Loading books...</p>
          ) : displayBooks.length === 0 ? (
            <p className={styles.empty}>No books available</p>
          ) : (
            <BooksTable
              books={displayBooks}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
              onBorrow={handleBorrow}
              onReturn={handleReturn}
            />
          )}
        </>
      )}

      {showDetails && (
        <BookDetailForm book={showDetails} onClose={() => setShowDetails(null)} />
=======
          onCancel={() => { setShowForm(false); setFormData(null); }}
        />
      )}

      {!showForm && (
        <div style={{ marginTop: "30px" }}>
          {loading ? (
            <p style={{ textAlign: "center" }}>Loading books...</p>
          ) : books.length === 0 ? (
            <p style={{ textAlign: "center", fontStyle: "italic" }}>No book created yet</p>
          ) : (
            <BooksTable
              books={books}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          )}
        </div>
      )}

      {showDetails && (
        <BookDetailForm
          book={showDetails}
          onClose={() => setShowDetails(null)}
        />
>>>>>>> d18564e593577e1e49fc7fad5e0460dc0d09bd3e
      )}

      {toast.message && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
