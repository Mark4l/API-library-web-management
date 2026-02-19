import { useState, useEffect } from "react";
import styles from "./searchBox.module.css";

export default function BookSearch({ books = [], onResults }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!query.trim()) {
        onResults(books);
        return;
      }

      const q = query.toLowerCase();

      const filtered = books.filter((b) =>
        [b?.title, b?.author, b?.genre]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );

      onResults(filtered);
    }, 200);

    return () => clearTimeout(timer);
  }, [query, books, onResults]); // ✅ FIXED: stable dependency array

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBox}>
        <span className={styles.icon}>🔍</span>

        <input
          type="text"
          placeholder="Search by title, author, or genre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className={styles.clearIcon}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
