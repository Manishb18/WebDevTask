"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import axiosInstance from "@/lib/axiosInstance";

interface HeaderProps {
  search: string;
  setSearch: (search: string) => void;
  setCategory: (category: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({ search, setSearch, setCategory }) => {
  const router = useRouter();
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

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

  return (
    <header className="flex justify-between items-center p-4  border-b border-gray-300">
      <div className="w-full max-w-xl">
        <Input
          type="text"
          value={search} // Ensure the search input always shows the correct value
          placeholder="Search by title or category"
          className="w-full border border-gray-500"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="ml-4 flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="p-2 rounded border border-gray-300">
              Select Category
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setCategory(null)}>All Categories</DropdownMenuItem>
            {categories.map((cat) => (
              <DropdownMenuItem key={cat.id} onSelect={() => setCategory(cat.id)}>
                {cat.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="ml-4">
          <Button
            onClick={() => router.push('/admin/dashboard/blogs/create')}
            className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Create New Blog
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;