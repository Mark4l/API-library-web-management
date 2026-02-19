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
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(true);

  const BORROWER_NAME = "Emanuel";

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await getBooks();
      setBooks(data);
      setFilteredBooks(null);
    } catch {
      showToast("Failed to load books", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearchResults = useCallback((results) => {
    setFilteredBooks(results);
  }, []);

  const displayBooks = filteredBooks ?? books;

  const handleSave = async (payload, setMessage) => {
    try {
      let saved;
      if (formData) {
        saved = await updateBook({ id: formData.id, ...payload });
        setBooks(prev => prev.map(b => Number(b.id) === Number(saved.id) ? saved : b));
      } else {
        saved = await createBook(payload);
        setBooks(prev => [...prev, saved]);
      }
      setShowForm(false);
      setFormData(null);
      showToast("Saved successfully");
    } catch (err) {
      setMessage(err.message || "Save failed");
      showToast(err.message, "error");
    }
  };

  const handleEdit = (book) => {
    setFormData(book);
    setShowForm(true);
  };

  const handleView = (id) => {
    const book = books.find(b => Number(b.id) === Number(id));
    if (book) setShowDetails(book);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await deleteBook(id);
      setBooks(prev => prev.filter(b => Number(b.id) !== Number(id)));
      showToast("Book deleted");
    } catch {
      showToast("Delete failed", "error");
    }
  };

  const handleBorrow = async (id) => {
    try {
      await borrowBook(id, BORROWER_NAME);
      setBooks(prev => prev.map(b => Number(b.id) === Number(id) ? { ...b, is_available: false } : b));
      showToast("Book borrowed");
    } catch {
      showToast("Borrow failed", "error");
    }
  };

  const handleReturn = async (id) => {
    try {
      await returnBook(id, BORROWER_NAME);
      setBooks(prev => prev.map(b => Number(b.id) === Number(id) ? { ...b, is_available: true } : b));
      showToast("Book returned");
    } catch {
      showToast("Return failed", "error");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Library App</h1>

      {showForm && (
        <BookForm
          initialData={formData}
          onSubmit={handleSave}
          onCancel={() => { setShowForm(false); setFormData(null); }}
        />
      )}

      {!showForm && (
        <>
          <div className={styles.topActions}>
            <button className={styles.addBtn} onClick={() => setShowForm(true)}>
              + Add Book
            </button>
          </div>

          <div className={styles.searchWrapper}>
            <BookSearch onResults={handleSearchResults} showToast={showToast} />
          </div>

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
      )}

      {toast.message && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
