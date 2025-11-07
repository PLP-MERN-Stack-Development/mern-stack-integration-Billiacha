// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import PostList from "./pages/PostList";
import PostView from "./pages/PostView";
import PostForm from "./pages/PostForm";
import Nav from "./components/Nav";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:id" element={<PostView />} />
        <Route path="/create" element={<PostForm />} />
      </Routes>
    </>
  );
}
