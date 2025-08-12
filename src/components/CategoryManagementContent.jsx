import React, { useState, useEffect } from "react";
import AddCategoryButton from "./AddCategoryButton";
import CategoryCard from "./CategoryCard";
import AddEditCategoryModal from "./AddEditCategoryModal";
import DeleteCategoryConfirmationModal from "./DeleteCategoryConfirmationModal";
import { api } from "../api/axios";

export default function CategoryManagementContent() {
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return console.error("No token found");

        const res = await api.get("/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCategories(res.data);
      } catch (error) {
        console.error("Fetch categories error:", error);
        // En cas d'erreur, utiliser des données par défaut
        setCategories([
          {
            idCategorie: "1",
            nomCategorie: "Électronique",
            descriptionCategorie: "Produits électroniques",
            typeCategorie: "Technologie",
            icon: "Monitor",
          },
          {
            idCategorie: "2",
            nomCategorie: "Vêtements",
            descriptionCategorie: "Articles vestimentaires",
            typeCategorie: "Mode",
            icon: "Shirt",
          },
          {
            idCategorie: "3",
            nomCategorie: "Alimentation",
            descriptionCategorie: "Produits alimentaires",
            typeCategorie: "Nourriture",
            icon: "Apple",
          },
        ]);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async (newCategoryData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No token found");

      const res = await api.post("/categories", newCategoryData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories((prev) => [...prev, res.data]);
      setIsAddEditModalOpen(false);
    } catch (error) {
      console.error("Add category error:", error);
    }
  };

  const handleEditCategory = async (updatedCategory) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No token found");

      await api.put(
        `/categories/${updatedCategory.idCategorie}`,
        updatedCategory,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCategories((prev) =>
        prev.map((category) =>
          category.idCategorie === updatedCategory.idCategorie
            ? updatedCategory
            : category
        )
      );
      setIsAddEditModalOpen(false);
      setCategoryToEdit(null);
    } catch (error) {
      console.error("Edit category error:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No token found");

      await api.delete(`/categories/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories((prev) =>
        prev.filter((category) => category.idCategorie !== categoryId)
      );
      setIsDeleteConfirmationOpen(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error("Delete category error:", error);
    }
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
            key={category.idCategorie}
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
        onConfirm={() => handleDeleteCategory(categoryToDelete.idCategorie)}
        categoryName={categoryToDelete?.nomCategorie}
      />
    </div>
  );
}
