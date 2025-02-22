import React, { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "@/lib/axiosInstance";

interface Blog {
  id: number;
  title: string;
  description: string;
  bannerimage: string;
  sections: { type: string; content: string }[];
  author_id: number;
  category_id: string;
}

interface BlogContextType {
  allBlogs: Blog[] | null;
  visibleBlogs: Blog[] | null;
  loading: boolean;
  hasMore: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  loadMoreBlogs: () => void;
  categories: Record<string, string[]> | null;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allBlogs, setAllBlogs] = useState<Blog[] | null>(null);
  const [visibleBlogs, setVisibleBlogs] = useState<Blog[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Record<string, string[]> | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await axiosInstance.get("/blogs");
        setAllBlogs(response.data.blogs);
        setVisibleBlogs(response.data.blogs.slice(0, 6));
      } catch (error) {
        console.error(error);
      }
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axiosInstance.get("/categories");
        console.log("reponse ::", response)
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    let filteredBlogs = allBlogs;

    if (searchQuery) {
      filteredBlogs = filteredBlogs?.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) || null;
    }

    if (selectedCategoryId) {
      filteredBlogs = filteredBlogs?.filter(blog =>
        blog.category_id === selectedCategoryId
      ) || null;
    }

    setVisibleBlogs(filteredBlogs?.slice(0, 6) || null);
  }, [searchQuery, selectedCategoryId, allBlogs]);

  const loadMoreBlogs = () => {
    if (loading || !hasMore) return;
    setLoading(true);

    setTimeout(() => {
      const currentLength = visibleBlogs?.length || 0;
      const moreBlogs = allBlogs?.slice(currentLength, currentLength + 6) || [];

      if (moreBlogs.length === 0) {
        setHasMore(false);
      } else {
        setVisibleBlogs((prev) => [...(prev || []), ...moreBlogs]);
      }
      setLoading(false);
    }, 1000);
  };


  console.log("categories :: ", categories);
  return (
    <BlogContext.Provider
      value={{
        allBlogs,
        visibleBlogs,
        loading,
        hasMore,
        searchQuery,
        setSearchQuery,
        loadMoreBlogs,
        categories,
        selectedCategoryId,
        setSelectedCategoryId,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }
  return context;
};