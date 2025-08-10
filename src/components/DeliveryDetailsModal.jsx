import React from "react";
import { X, Truck } from "lucide-react";

export default function DeliveryDetailsModal({ isOpen, onClose, delivery }) {
  if (!isOpen || !delivery) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "En route":
        return "bg-orange-100 text-orange-700";
      case "Livré":
        return "bg-green-100 text-green-700";
      case "Préparation":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-auto animate-fadeInUp">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Truck className="w-6 h-6 mr-2 text-orange-600" />
            Détails de la livraison {delivery.idLivraison}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-500">ID Livraison</p>
            <p className="text-gray-900 font-semibold">
              {delivery.idLivraison}
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-500">Commande ID</p>
            <p className="text-gray-900 font-semibold">{delivery.commandeId}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-md">
            <p className="text-sm font-medium text-gray-500">Date Expédition</p>
            <p className="text-blue-700 font-semibold">
              {delivery.dateExpedition}
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-500">Livreur ID</p>
            <p className="text-gray-900 font-semibold">{delivery.livreurId}</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-md">
            <p className="text-sm font-medium text-gray-500">
              Date Livraison Prévue
            </p>
            <p className="text-yellow-700 font-semibold">
              {delivery.dateLivraisonPrevue}
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-md">
            <p className="text-sm font-medium text-gray-500">
              Date Livraison Effective
            </p>
            <p className="text-green-700 font-semibold">
              {delivery.dateLivraisonEffective}
            </p>
          </div>
        </div>

        <div className="p-3 bg-gray-50 rounded-md mb-6">
          <p className="text-sm font-medium text-gray-500">Statut Livraison</p>
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
              delivery.statutLivraison
            )}`}
          >
            {delivery.statutLivraison}
          </span>
        </div>

        <div className="p-3 bg-gray-50 rounded-md mb-6">
          <p className="text-sm font-medium text-gray-500">Notes Livreur</p>
          <p className="text-gray-900 font-semibold">{delivery.notesLivreur}</p>
        </div>

        <div className="p-3 bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-500">Signature Client</p>
          <p className="text-gray-900 font-semibold">
            {delivery.signatureClient}
          </p>
        </div>
      </div>
    </div>
  );
}
