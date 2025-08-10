import React, { useState } from "react";
import AddCategoryButton from "./AddCategoryButton";
import CategoryCard from "./CategoryCard";
import AddEditCategoryModal from "./AddEditCategoryModal";
import DeleteCategoryConfirmationModal from "./DeleteCategoryConfirmationModal";

export default function CategoryManagementContent() {
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [categories, setCategories] = useState([
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
  ]);

  const handleAddCategory = (newCategoryData) => {
    setCategories((prevCategories) => [
      ...prevCategories,
      { id: prevCategories.length + 1, ...newCategoryData },
    ]);
  };

  const handleEditCategory = (updatedCategory) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.id === updatedCategory.id ? updatedCategory : cat
      )
    );
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories((prevCategories) =>
      prevCategories.filter((cat) => cat.id !== categoryId)
    );
    setIsDeleteConfirmationOpen(false);
    setCategoryToDelete(null);
  };

  const openAddModal = () => {
    setCategoryToEdit(null);
    setIsAddEditModalOpen(true);
  };

  const openEditModal = (category) => {
    setCategoryToEdit(category);
    setIsAddEditModalOpen(true);
  };

  const openDeleteConfirmation = (category) => {
    setCategoryToDelete(category);
    setIsDeleteConfirmationOpen(true);
  };

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
        <AddCategoryButton onClick={openAddModal} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={openEditModal}
            onDelete={openDeleteConfirmation}
          />
        ))}
      </div>
      <AddEditCategoryModal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        onSaveCategory={categoryToEdit ? handleEditCategory : handleAddCategory}
        category={categoryToEdit}
      />
      <DeleteCategoryConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
        onConfirm={() => handleDeleteCategory(categoryToDelete.id)}
        categoryName={categoryToDelete?.name}
      />
    </div>
  );
}
