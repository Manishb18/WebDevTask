"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useBlogContext } from "../BlogContext";

interface Category {
  id: string;
  name: string;
}

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { searchQuery, setSearchQuery, categories, selectedCategoryId, setSelectedCategoryId } = useBlogContext();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const pathname = usePathname();

  // Exclude layout for admin routes
  if (pathname.startsWith('/admin')) {
    return <></>; // No layout for /admin
  }

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategoryId(null);
    router.push('/');
  };

  return (
    <nav className="flex justify-between items-center py-3 px-6  text-black dark:text-white border-b border-gray-600">
      {/* Website Name */}
      <h1
        className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 italic cursor-pointer"
        onClick={resetFilters}
      >
        Blogger Pro
      </h1>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Desktop Categories and Search Bar */}
      <div className="hidden md:flex space-x-6 items-center">
        {Array.isArray(categories) && categories.map((category: Category, index : number) => (
          <div
            key={index}
            className={cn(
              "hover:text-gray-500 dark:hover:text-gray-300 cursor-pointer px-2 py-1 rounded",
              selectedCategoryId === category.id
                ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                : ""
            )}
            onClick={() => setSelectedCategoryId(category.id)}
          >
            {category.name}
          </div>
        ))}
      </div>

      {/* Dark Mode Toggle for Desktop */}
      {mounted && (
        <div className="items-center justify-center gap-4 hidden md:flex">
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full my-4 bg-gray-800 text-white border-none"
          />
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className=" p-2 rounded-full bg-gray-200 dark:bg-gray-800"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-800" />
            )}
          </button>
        </div>
      )}

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed inset-0 w-80 p-4 z-50 shadow-lg overflow-y-auto",
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          )}
        >
          {/* Close Button */}
          <div className="flex justify-between items-center">
            <h1
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 italic cursor-pointer"
              onClick={resetFilters}
            >
              Blogger Pro
            </h1>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Bar */}
          <Input
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full my-4 border-none",
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-black"
            )}
          />

          {/* Categories */}
          {Array.isArray(categories) && categories && categories.map((category: Category, index : number) => (
            <div
              key={index}
              className={cn(
                "mb-4 p-2 text-left text-lg font-medium rounded-md cursor-pointer",
                selectedCategoryId === category.id
                  ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                  : ""
              )}
              onClick={() => setSelectedCategoryId(category.id)}
            >
              {category.name}
            </div>
          ))}

          {/* Dark Mode Toggle */}
          <div className="mt-6 border-t border-gray-700 pt-4 flex items-center space-x-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-gray-800"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-300" />
                )}
              </button>
            )}
            <span>{theme === "dark" ? "Light" : "Dark"}</span>
          </div>
        </motion.div>
      )}
    </nav>
  );
}