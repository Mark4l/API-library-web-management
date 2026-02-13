const BASE_URL = "http://127.0.0.1:5000";

// Fetch all books
export async function getBooks() {
  try {
    const res = await fetch(`${BASE_URL}/books`);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to fetch books");
    }
    const data = await res.json();
    return Array.isArray(data.books) ? data.books : [];
  } catch (err) {
    console.error("getBooks error:", err);
    throw err;
  }
}

// Create a new book
export async function createBook(book) {
  try {
    // Do not send id; backend will assign it
    const payload = { ...book };

    const res = await fetch(`${BASE_URL}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error creating book");

    return data.book; // return created book object
  } catch (err) {
    console.error("createBook error:", err);
    throw err;
  }
}

// Update an existing book
export async function updateBook(book) {
  try {
    const { id, ...payload } = book; // remove id from payload
    const res = await fetch(`${BASE_URL}/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), // send only fields to update
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error updating book");

    return data.book; // return updated book object
  } catch (err) {
    console.error("updateBook error:", err);
    throw err;
  }
}

// Delete a book by ID
export async function deleteBook(id) {
  try {
    const res = await fetch(`${BASE_URL}/books/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error deleting book");

    return data.message || "Book deleted successfully";
  } catch (err) {
    console.error("deleteBook error:", err);
    throw err;
  }
}

// Search books (by title, author, or genre)
export async function searchBooks(query) {
  try {
    const res = await fetch(
      `${BASE_URL}/books/search?title=${encodeURIComponent(query)}`
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Error searching books");
    }

    return Array.isArray(data.results) ? data.results : [];
  } catch (err) {
    console.error("searchBooks error:", err);
    throw err;
  }
}
