"use client";
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

type Section = {
  type: string;
  content: string | File;
};

type Category = {
  id: string;
  name: string;
};

export default function CreateBlogPage() {
  const router = useRouter(); 
  const [title, setTitle] = useState("");
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(""); // Selected category
  const [categories, setCategories] = useState<Category[]>([]); // Category list from backend
  const [sections, setSections] = useState<Section[]>([{ type: "", content: "" }]);
  const [loading, setLoading] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories");
        setCategories(response.data); // Assuming API returns an array of { id, name }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddSection = () => {
    setSections([...sections, { type: "", content: "" }]);
  };

  const handleSectionChange = (index: number, field: string, value: string | File) => {
    const newSections = sections.map((section, i) => {
      if (i === index) {
        return { ...section, [field]: value };
      }
      return section;
    });
    setSections(newSections);
  };

  const handleDeleteSection = (index: number) => {
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
      formData.append("sections", JSON.stringify(sections));

      if (bannerImage) {
        formData.append("bannerImage", bannerImage);
      }

      // Append images from sections
      sections.forEach((section, index) => {
        if (section.type === "image" && section.content instanceof File) {
          formData.append(`sectionImages`, section.content);
        }
      });

      await axiosInstance.post("/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Blog created successfully!");
      router.push("/admin/dashboard"); // Redirect to dashboard after success
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Create Blog Post</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Banner Image</label>
          <input
            type="file"
            name="bannerImage"
            accept="image/*"
            onChange={(e) => setBannerImage(e.target.files?.[0] || null)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          ></textarea>
        </div>

        {sections.map((section, index) => (
          <div key={index} className="relative border border-gray-300 rounded-md p-4">
            <button
              type="button"
              onClick={() => handleDeleteSection(index)}
              className="absolute top-2 right-2 text-red-500"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <label className="block text-sm font-medium text-gray-700">Section Type</label>
            <select
              value={section.type}
              onChange={(e) => handleSectionChange(index, "type", e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Select type</option>
              <option value="heading">Heading</option>
              <option value="subheading">Subheading</option>
              <option value="paragraph">Paragraph</option>
              <option value="image">Image</option>
            </select>

            {section.type && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Content</label>
                {section.type === "image" ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleSectionChange(index, "content", e.target.files[0]);
                      }
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                ) : (
                  <textarea
                    value={typeof section.content === "string" ? section.content : ""}
                    onChange={(e) => handleSectionChange(index, "content", e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                )}
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddSection}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 mr-4"
        >
          Add New Section
        </button>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
