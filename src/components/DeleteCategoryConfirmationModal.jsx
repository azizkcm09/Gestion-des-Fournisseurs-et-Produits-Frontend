import React from "react";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function DeleteCategoryConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  categoryName,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto animate-fadeInUp">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2 text-red-500" />
            Confirmer la suppression
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-700 mb-6">
          Êtes-vous sûr de vouloir supprimer la catégorie{" "}
          <span className="font-semibold">{categoryName}</span> ? Cette action
          est irréversible.
        </p>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-colors flex items-center"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
