import React from "react";
import { Plus } from "lucide-react";

export default function AddCategoryButton() {
  return (
    <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      <Plus className="w-5 h-5 mr-2" />
      <span>Nouvelle catégorie</span>
    </button>
  );
}
