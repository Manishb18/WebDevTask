"use client";
import { useEffect } from "react";
import BlogCard from "./BlogCard";
import { useBlogContext } from "../../BlogContext";

export default function BlogList() {
  const { visibleBlogs, loading, hasMore, loadMoreBlogs } = useBlogContext();

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !loading &&
      hasMore
    ) {
      loadMoreBlogs();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleBlogs, loading, hasMore]);

  if (!visibleBlogs) return null;
  if (!visibleBlogs.length) return <p>No blogs found</p>;

  return (
    <div className="min-h-screen">
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      {!hasMore && (
        <div className="text-center py-4 text-gray-600">
          No more blogs to load
        </div>
      )}
    </div>
  );
}