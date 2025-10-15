import React from "react";
import {
  Edit,
  Trash2,
  Monitor,
  Shirt,
  Apple,
  Box,
  Home,
  Dumbbell,
  Heart,
  BookOpen,
} from "lucide-react";

export default function CategoryCard({ category, onEdit, onDelete }) {
  const IconComponent =
    {
      Monitor: Monitor,
      Shirt: Shirt,
      Apple: Apple,
      Box: Box,
      Home: Home,
      Dumbbell: Dumbbell,
      Heart: Heart,
      BookOpen: BookOpen,
    }[category.imageCategorie] || Box;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <IconComponent className="w-8 h-8 text-gray-600" />
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(category)}
            className="text-blue-600 hover:text-blue-900 transition-colors p-1 rounded-md hover:bg-blue-50"
            title="Modifier la catégorie"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(category)}
            className="text-red-600 hover:text-red-900 transition-colors p-1 rounded-md hover:bg-red-50"
            title="Supprimer la catégorie"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-1">
        {category.nomCategorie}
      </h3>

      <p className="text-sm text-gray-500 mb-3 flex-grow">
        {category.descriptionCategorie || "Aucune description"}
      </p>

      <div className="flex items-center mb-4">
        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
          {category.typeCategorie}
        </span>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100">
        <p className="text-2xl font-bold text-gray-800">
          {category._count?.produits || 0}
        </p>
        <p className="text-sm text-gray-500">
          {(category._count?.produits || 0) <= 1 ? "produit" : "produits"}
        </p>
      </div>
    </div>
  );
}
