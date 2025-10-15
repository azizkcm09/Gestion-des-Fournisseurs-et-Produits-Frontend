import React from "react";
import {
  X,
  ShoppingCart,
  User,
  MapPin,
  CreditCard,
  Package,
} from "lucide-react";

export default function OrderDetailsModal({ isOpen, onClose, order }) {
  if (!isOpen || !order) return null;

  const getStatusColor = (status) => {
    const s = status?.trim();
    switch (s) {
      case "CONFIRMEE":
        return "bg-blue-100 text-blue-800";
      case "LIVREE":
        return "bg-green-100 text-green-800";
      case "EN_ATTENTE":
        return "bg-yellow-100 text-yellow-800";
      case "ANNULEE":
        return "bg-red-100 text-red-800";
      case "EN_PREPARATION":
        return "bg-purple-100 text-purple-800";
      case "EXPEDIEE":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      EN_ATTENTE: "En attente",
      CONFIRMEE: "Confirmée",
      EN_PREPARATION: "En préparation",
      EXPEDIEE: "Expédiée",
      LIVREE: "Livrée",
      ANNULEE: "Annulée",
    };
    return labels[status] || status;
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl mx-auto animate-fadeInUp max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-3 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <ShoppingCart className="w-6 h-6 mr-2 text-purple-600" />
            Détails de la commande{" "}
            {order.numeroCommande || `CMD-${order.idCommande}`}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Informations Commande
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-500">ID Commande</p>
                <p className="text-gray-900 font-semibold">
                  {order.idCommande}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-500">Numéro</p>
                <p className="text-gray-900 font-semibold">
                  {order.numeroCommande || `CMD-${order.idCommande}`}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-gray-900 font-semibold">
                  {order.dateCommande
                    ? new Date(order.dateCommande).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—"}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-500">Statut</p>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    order.statutCommande
                  )}`}
                >
                  {getStatusLabel(order.statutCommande)}
                </span>
              </div>
            </div>

            <div className="p-3 bg-green-50 rounded-md">
              <p className="text-sm font-medium text-gray-500">
                Total Commande
              </p>
              <p className="text-green-700 font-bold text-xl">
                {typeof order.totalCommande === "number"
                  ? `${order.totalCommande.toFixed(2)} €`
                  : order.totalCommande || "0.00 €"}
              </p>
            </div>
          </div>

          {/* Client Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Informations Client
            </h3>

            <div className="p-4 bg-blue-50 rounded-md">
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Nom</p>
                  <p className="text-gray-900 font-semibold">
                    {order.client
                      ? `${order.client.prenom || ""} ${
                          order.client.nom || ""
                        }`.trim() || "Client"
                      : "Client"}
                  </p>
                </div>
                {order.client?.email && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-gray-900">{order.client.email}</p>
                  </div>
                )}
              </div>
            </div>

            {order.adresseLivraison && (
              <div className="p-4 bg-orange-50 rounded-md">
                <p className="text-sm font-medium text-gray-500 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Adresse de Livraison
                </p>
                <p className="text-gray-900 font-semibold mt-1">
                  {order.adresseLivraison}
                </p>
              </div>
            )}

            <div className="p-4 bg-purple-50 rounded-md">
              <p className="text-sm font-medium text-gray-500 flex items-center">
                <CreditCard className="w-4 h-4 mr-1" />
                Mode de Paiement
              </p>
              <p className="text-gray-900 font-semibold mt-1">
                {order.modePaiement || "Non spécifié"}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        {order.lignesCommande && order.lignesCommande.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Articles commandés
            </h3>
            <div className="bg-gray-50 rounded-md overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Produit
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Quantité
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Prix unitaire
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.lignesCommande.map((ligne, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">
                        <div className="flex items-center">
                          {ligne.produit?.imageURL && (
                            <img
                              src={
                                ligne.produit.imageURL.startsWith("http")
                                  ? ligne.produit.imageURL
                                  : `http://localhost:4000${ligne.produit.imageURL}`
                              }
                              alt={ligne.produit.nom}
                              className="w-8 h-8 object-cover rounded mr-2"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect fill='%23f3f4f6' width='32' height='32'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='10' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3E?%3C/text%3E%3C/svg%3E";
                              }}
                            />
                          )}
                          <span className="text-sm font-medium text-gray-900">
                            {ligne.produit?.nom || "Produit"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {ligne.quantiteCommande}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {typeof ligne.produit?.prix === "number"
                          ? `${ligne.produit.prix.toFixed(2)} €`
                          : ligne.produit?.prix || "0.00 €"}
                      </td>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900">
                        {typeof ligne.produit?.prix === "number" &&
                        typeof ligne.quantiteCommande === "number"
                          ? `${(
                              ligne.produit.prix * ligne.quantiteCommande
                            ).toFixed(2)} €`
                          : "0.00 €"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
