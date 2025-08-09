import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import LoadingState from "../components/LoadingState";
import CategoryManagementContent from "../components/CategoryManagementContent";

export default function Categories() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("categories");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => setIsLoading(false), 1000);

    // Add animation styles
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar Component */}
      <Sidebar
        isOpen={isSidebarOpen}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Component */}
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Main Category Management Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {isLoading ? <LoadingState /> : <CategoryManagementContent />}
        </main>
      </div>
    </div>
  );
}
