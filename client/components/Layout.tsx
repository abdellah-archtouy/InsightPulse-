import { ReactNode, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  useEffect(() => {
    // Initialize theme on app load
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="lg:pl-64">
        <div className="fixed top-0 right-0 left-0 lg:left-64 z-40">
          <Navbar />
        </div>
        <main className="pt-16 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
