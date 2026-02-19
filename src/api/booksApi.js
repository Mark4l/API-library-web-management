const BASE_URL = "http://127.0.0.1:5000";

export async function getBooks() {
  try {
    const res = await fetch(`${BASE_URL}/books`);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Failed to fetch books");
    }
    const data = await res.json();
    return Array.isArray(data.books) ? data.books : [];
  } catch (err) {
    console.error("getBooks error:", err);
    return [];
  }
}

export async function createBook(book) {
  try {
    const res = await fetch(`${BASE_URL}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to create book");
    return data.book || { id: Date.now(), ...book, created_at: new Date().toISOString() };
  } catch (err) {
    console.error("createBook error:", err);
    throw err;
  }
}

export async function updateBook(book) {
  try {
    const { id, ...payload } = book;
    const res = await fetch(`${BASE_URL}/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to update book");
    return data.book || { id, ...payload, updated_at: new Date().toISOString() };
  } catch (err) {
    console.error("updateBook error:", err);
    throw err;
  }
}

export async function deleteBook(id) {
  try {
    const res = await fetch(`${BASE_URL}/books/${id}`, { method: "DELETE" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Failed to delete book");
    return data.message || "Book deleted successfully";
  } catch (err) {
    console.error("deleteBook error:", err);
    throw err;
  }
}

// Borrow / Return books
export async function borrowBook(bookId, borrowerName) {
  const res = await fetch(`${BASE_URL}/borrow`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ book_id: bookId, borrower_name: borrowerName }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Failed to borrow book");
  return data;
}

export async function returnBook(bookId, borrowerName) {
  const res = await fetch(`${BASE_URL}/return`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ book_id: bookId, borrower_name: borrowerName }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Failed to return book");
  return data;
}

// Search books by query
export async function searchBooks(query) {
  if (!query) return [];
  try {
    const params = new URLSearchParams({ q: query });
    const res = await fetch(`${BASE_URL}/books/search?${params.toString()}`);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Search failed");
    }
    const data = await res.json();
    return Array.isArray(data.results) ? data.results : [];
  } catch (err) {
    console.error("searchBooks error:", err);
    return [];
  }
}
