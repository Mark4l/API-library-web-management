import React from "react";
import Home from "./pages/Home.jsx";
import { ErrorBoundary } from "./components/ErrorBoundary.jsx";

export default function App() {
  return (
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  );
}
