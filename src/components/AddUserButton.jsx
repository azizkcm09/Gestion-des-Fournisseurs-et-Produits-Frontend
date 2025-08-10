import React from "react";
import { Plus } from "lucide-react";

export default function AddUserButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-4 py-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
    >
      <Plus className="w-5 h-5 mr-2" />
      <span>Nouvel utilisateur</span>
    </button>
  );
}
