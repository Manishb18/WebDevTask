"use client";

import { ThemeProvider } from "next-themes";

import { BlogProvider } from "./BlogContext";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <BlogProvider>{children}</BlogProvider>
    </ThemeProvider>
  );
}
