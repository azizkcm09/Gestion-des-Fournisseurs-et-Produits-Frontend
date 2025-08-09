import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";

export default function UserSearchFilter() {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
        <SlidersHorizontal className="w-5 h-5 mr-2" />
        <span>Filtrer</span>
      </button>
    </div>
  );
}
