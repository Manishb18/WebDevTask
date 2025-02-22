"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const categories = {
  DSA: [
    "Getting Started",
    "Array",
    "Linked List",
    "Greedy Algorithm",
    "Recursion",
    "Binary Search",
    "Stack and Queue",
    "String",
    "Binary Tree",
  ],
  JavaScript: ["Basics", "ES6+", "Closures", "Async/Await", "Prototypes"],
  ReactJS: [
    "Components",
    "State & Props",
    "Hooks",
    "Context API",
    "Performance Optimization",
  ],
  NextJS: ["SSR & SSG", "Routing", "API Routes", "Middleware"],
};

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pathname = usePathname();

  // Exclude layout for admin routes
  if (pathname.startsWith('/admin')) {
    return <></>; // No layout for /admin
  }

  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-gray-200 dark:bg-black text-black dark:text-white">
      {/* Website Name */}
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 italic">
        InterviewPro
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
        {Object.keys(categories).map((category, index) => (
          <a
            key={index}
            href={`#${category.toLowerCase()}`}
            className="hover:text-gray-500 dark:hover:text-gray-300"
          >
            {category}
          </a>
        ))}
      </div>

      {/* Dark Mode Toggle for Desktop */}
      {mounted && (
        <div className="items-center justify-center gap-4 hidden md:flex">
          <Input
            type="text"
            placeholder="Search"
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
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 italic">
              InterviewPro
            </h1>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Bar */}
          <Input
            type="text"
            placeholder="Search documentation..."
            className={cn(
              "w-full my-4 border-none",
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-black"
            )}
          />

          {/* Categories Dropdown */}
          {Object.entries(categories).map(([category, subcategories]) => (
            <div key={category} className="mb-4">
              <button
                className="flex justify-between w-full p-2 text-left text-lg font-medium rounded-md"
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === category ? null : category
                  )
                }
              >
                {category}
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform",
                    expandedCategory === category && "rotate-180"
                  )}
                />
              </button>
              {expandedCategory === category && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4 mt-2 space-y-1 text-gray-300"
                >
                  {subcategories.map((sub, i) => (
                    <li key={i} className="p-2 rounded-md cursor-pointer">
                      {sub}
                    </li>
                  ))}
                </motion.ul>
              )}
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
