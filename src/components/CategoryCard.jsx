import React from "react";
import { Edit, Trash2, Monitor, Shirt, Apple } from "lucide-react";

export default function CategoryCard({ category }) {
  const IconComponent = {
    Monitor: Monitor,
    Shirt: Shirt,
    Apple: Apple,
  }[category.icon];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        {IconComponent && <IconComponent className="w-8 h-8 text-gray-600" />}
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-900">
            <Edit className="w-5 h-5" />
          </button>
          <button className="text-red-600 hover:text-red-900">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-1">
        {category.name}
      </h3>
      <p className="text-sm text-gray-500 mb-3">{category.description}</p>
      <div className="flex items-center mb-4">
        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
          {category.tag}
        </span>
      </div>
      <div className="mt-auto pt-4 border-t border-gray-100">
        <p className="text-2xl font-bold text-gray-800">
          {category.productCount}
        </p>
        <p className="text-sm text-gray-500">produits</p>
      </div>
    </div>
  );
}
