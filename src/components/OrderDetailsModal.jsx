import React from "react";
import { X, ShoppingCart } from "lucide-react";

export default function OrderDetailsModal({ isOpen, onClose, order }) {
  if (!isOpen || !order) return null;

  const getStatusColor = (statut) => {
    switch (statut) {
      case "En cours":
        return "bg-purple-100 text-purple-700";
      case "Livré":
        return "bg-green-100 text-green-700";
      case "En attente":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-auto animate-fadeInUp">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <ShoppingCart className="w-6 h-6 mr-2 text-purple-600" />
            Détails de la commande {order.idCommande}
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
            <p className="text-sm font-medium text-gray-500">ID Commande</p>
            <p className="text-gray-900 font-semibold">{order.idCommande}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-500">Numéro Commande</p>
            <p className="text-gray-900 font-semibold">
              {order.numeroCommande}
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-500">Date Commande</p>
            <p className="text-gray-900 font-semibold">{order.dateCommande}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-500">Statut</p>
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                order.statut
              )}`}
            >
              {order.statutCommande}
            </span>
          </div>
          <div className="p-3 bg-green-50 rounded-md">
            <p className="text-sm font-medium text-gray-500">Total Commande</p>
            <p className="text-green-700 font-semibold">
              {order.totalCommande}
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-500">
              Taxes Appliquées
            </p>
            <p className="text-gray-900 font-semibold">
              {order.taxesAppliquees}
            </p>
          </div>
        </div>

        <div className="p-3 bg-blue-50 rounded-md mb-6">
          <p className="text-sm font-medium text-gray-500">
            Adresse de Livraison
          </p>
          <p className="text-gray-900 font-semibold">
            {order.adresseLivraison}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-500">
              Mode de Paiement
            </p>
            <p className="text-gray-900 font-semibold">{order.modePaiement}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-500">
              Date de Paiement
            </p>
            <p className="text-gray-900 font-semibold">{order.datePaiement}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
