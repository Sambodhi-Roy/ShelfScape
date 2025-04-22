import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GenreSelector from "./pages/GenreSelector.jsx";
import AuthorSelector from "./pages/AuthorSelector.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import BookSurvey from "./pages/BookSurvey.jsx";
import RecommendedBooks from "./pages/RecommendedBooks.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/genre" element={<GenreSelector />} />
        <Route path="/auther" element={<AuthorSelector />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book" element={<BookSurvey/>} />
        <Route path="/recommended-books" element={<RecommendedBooks/>} />

      </Routes>
    </Router>
  </React.StrictMode>
);
