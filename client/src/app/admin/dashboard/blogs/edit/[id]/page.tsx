"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

type Section = { type: "heading" | "paragraph" | "image"; content: string | File };
type Category = { id: string; name: string };

export default function EditBlogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogData = searchParams.get("blog");
  const blog = blogData ? JSON.parse(decodeURIComponent(blogData)) : null;

  const [title, setTitle] = useState(blog?.title || "");
  const [bannerImage, setBannerImage] = useState<File | null>(blog?.bannerimage || null);
  const [description, setDescription] = useState(blog?.description || "");
  const [categoryId, setCategoryId] = useState(blog?.category_id || "");
  const [categories, setCategories] = useState<Category[]>([]);
  const [sections, setSections] = useState<Section[]>(blog?.sections || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // ✅ Add a new section dynamically
  const addSection = (type: Section["type"]) => {
    setSections([...sections, { type, content: type === "image" ? "" : "" }]);
  };

  // ✅ Handle section content change
  const handleSectionChange = (index: number, value: string | File) => {
    const updatedSections = [...sections];
    updatedSections[index].content = value;
    setSections(updatedSections);
  };

  // ✅ Remove a section
  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category_id", categoryId);
      formData.append("description", description);

      // Append sections
      sections.forEach((section, index) => {
        if (section.type === "image" && section.content instanceof File) {
          formData.append(`sections[${index}][type]`, section.type);
          formData.append(`sections[${index}][content]`, section.content);
        } else {
          formData.append(`sections[${index}][type]`, section.type);
          formData.append(`sections[${index}][content]`, section.content as string);
        }
      });

      if (bannerImage) {
        formData.append("bannerImage", bannerImage);
      }

      await axiosInstance.put(`/blogs/${blog.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Blog updated successfully!");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="mt-1 w-full border rounded-md p-2"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Banner Image */}
        <div>
          <label className="block text-sm font-medium">Banner Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBannerImage(e.target.files?.[0] || null)}
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 w-full border rounded-md p-2"
          ></textarea>
        </div>

        {/* Sections */}
        <div>
          <h2 className="text-lg font-medium">Sections</h2>
          {sections.map((section, index) => (
            <div key={index} className="border p-3 rounded-md mb-4">
              <label className="block text-sm font-medium">
                {section.type === "heading"
                  ? "Heading"
                  : section.type === "paragraph"
                  ? "Paragraph"
                  : "Image"}
              </label>

              {section.type === "image" ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleSectionChange(index, e.target.files?.[0] || "")}
                  className="mt-1 w-full border rounded-md p-2"
                />
              ) : (
                <textarea
                  value={section.content as string}
                  onChange={(e) => handleSectionChange(index, e.target.value)}
                  className="mt-1 w-full border rounded-md p-2"
                ></textarea>
              )}

              <button
                type="button"
                onClick={() => removeSection(index)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Remove Section
              </button>
            </div>
          ))}

          {/* Add Section Buttons */}
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => addSection("heading")}
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
            >
              + Add Heading
            </button>
            <button
              type="button"
              onClick={() => addSection("paragraph")}
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
            >
              + Add Paragraph
            </button>
            <button
              type="button"
              onClick={() => addSection("image")}
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
            >
              + Add Image
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
