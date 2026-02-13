import { useEffect, useState } from "react";
import BookForm from "../components/BookForm.jsx";
import BooksTable from "../components/BooksTable.jsx";
import BookDetailForm from "../components/BookDetailCard.jsx";
import Toast from "../components/Toast.jsx";
import { getBooks, createBook, updateBook, deleteBook } from "../api/booksApi.js";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(true);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

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

  const handleEdit = (book) => {
    setFormData(book);
    setShowForm(true);
  };

  const handleView = (id) => {
    const book = books.find(b => b.id === id);
    if (book) setShowDetails(book);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteBook(id);
      setBooks(prev => prev.filter(b => b.id !== id));
      showToast("Book deleted successfully");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  return (
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

      {showForm && (
        <BookForm
          initialData={formData}
          onSubmit={handleSave}
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
      )}

      {toast.message && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
