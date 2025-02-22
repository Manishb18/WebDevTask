"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { baseUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

interface Blog {
  id: number;
  title: string;
  category_id: number;
  description: string;
  bannerimage: string;
  sections: { content: string }[];
}

interface BlogsProps {
  blogs: Blog[];
}

const Blogs: React.FC<BlogsProps> = ({ blogs }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);
  const [blogList, setBlogList] = useState<Blog[]>(blogs); // Store blogs in local state

  const handleEdit = (blog: Blog) => {
    router.push(`/admin/dashboard/blogs/edit/1?blog=${encodeURIComponent(JSON.stringify(blog))}`);
  };

  const handleDeleteClick = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedBlog) return;
    setLoading(true);

    try {
      await axiosInstance.delete(`/blogs/${selectedBlog.id}`);
      console.log(`Deleted blog with id: ${selectedBlog.id}`);

      // Remove the deleted blog from the frontend state
      setBlogList((prevBlogs) => prevBlogs.filter((b) => b.id !== selectedBlog.id));

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {blogList.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-gray-600 text-lg">No blogs found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogList.map((blog) => (
            <div key={blog.id} className="border rounded-lg overflow-hidden shadow-lg">
              <div className="relative w-full h-48">
                <Image src={`${baseUrl}${blog.bannerimage}`} alt={blog.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                <p className="text-gray-700 mb-4">{blog.description}</p>
                <div className="flex justify-between">
                  <Button onClick={() => handleEdit(blog)} className="bg-yellow-500 text-white hover:bg-yellow-600">
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(blog)}
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete the blog "{selectedBlog?.title}"?</p>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmDelete} className="bg-red-500 text-white hover:bg-red-600">
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blogs;