import React, { useState, useEffect } from "react";
import { X, Box, Upload, CheckCircle, ChevronDown } from "lucide-react";

export default function AddEditCategoryModal({
  isOpen,
  onClose,
  onSaveCategory,
  category,
}) {
  const [formData, setFormData] = useState(
    category || {
      nom: "",
      description: "",
      type: "",
      imageFond: null,
    }
  );

  useEffect(() => {
    if (category) {
      setFormData(category);
    } else {
      setFormData({
        nom: "",
        description: "",
        type: "",
        imageFond: null,
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, imageFond: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveCategory(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto animate-fadeInUp">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Box className="w-6 h-6 mr-2 text-green-600" />
            {category ? "Modifier la catégorie" : "Nouvelle catégorie"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          {category
            ? "Modifiez les informations de la catégorie"
            : "Créez une nouvelle catégorie de produits"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nom"
              className="block text-sm font-medium text-gray-700"
            >
              Nom
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type de catégorie
            </label>
            <div className="relative mt-1">
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              >
                <option value="">Sélectionner un type</option>
                <option value="Technologie">Technologie</option>
                <option value="Mode">Mode</option>
                <option value="Nourriture">Nourriture</option>
                <option value="Maison">Maison</option>
                <option value="Sport">Sport</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="imageFond"
              className="block text-sm font-medium text-gray-700"
            >
              Image de fond
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                id="imageFond"
                name="imageFond"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="imageFond"
                className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Choisir un fichier
              </label>
              <span className="ml-2 text-sm text-gray-500">
                {formData.imageFond
                  ? formData.imageFond.name
                  : "Aucun fichier choisi"}
              </span>
              <Upload className="w-5 h-5 ml-auto text-gray-400" />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition-colors flex items-center"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              {category ? "Sauvegarder" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
