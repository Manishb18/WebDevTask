"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Blogs from "../components/Blogs";
import axiosInstance from "@/lib/axiosInstance";

export default function Page() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>(""); // Search state
  const [category, setCategory] = useState<string | null>(null); // Category state
  const [debouncedSearch, setDebouncedSearch] = useState(search); // Debounced search state

  // Debounce search (500ms delay)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler); // Cleanup function
  }, [search]);

  // Fetch blogs when debounced search or category changes
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (debouncedSearch) queryParams.append("search", debouncedSearch);
        if (category) queryParams.append("category_id", category);

        const response = await axiosInstance.get(`/blogs?${queryParams.toString()}`);
        setBlogs(response.data.blogs);
      } catch (err) {
        setError("Failed to fetch blogs");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [debouncedSearch, category]);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Header search={search} setSearch={setSearch} setCategory={setCategory} />
      <Blogs blogs={blogs} />
    </div>
  );
}
