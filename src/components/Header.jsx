import React from "react";
import { Menu, Bell } from "lucide-react";
export default function Header({ toggleSidebar }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Tableau de bord
            </h1>
            <p className="text-sm text-gray-500">
              Vue d'ensemble de votre système de gestion
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </button>
        </div>
      </div>
    </header>
  );
}
