import React from "react";
import AddCategoryButton from "./AddCategoryButton";
import CategoryCard from "./CategoryCard";

export default function CategoryManagementContent() {
  const categories = [
    {
      id: 1,
      name: "Électronique",
      description: "Produits électroniques",
      tag: "Technologie",
      productCount: 45,
      icon: "Monitor",
    },
    {
      id: 2,
      name: "Vêtements",
      description: "Articles vestimentaires",
      tag: "Mode",
      productCount: 32,
      icon: "Shirt",
    },
    {
      id: 3,
      name: "Alimentation",
      description: "Produits alimentaires",
      tag: "Nourriture",
      productCount: 78,
      icon: "Apple",
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Gestion des catégories
          </h1>
          <p className="text-gray-600">
            Créez, modifiez et supprimez les catégories
          </p>
        </div>
        <AddCategoryButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
