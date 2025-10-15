import React, { useState } from "react";
import { Eye, Edit } from "lucide-react";
import { api } from "../api/axios";

export default function OrderTable({ orders, onViewDetails, onUpdateOrder }) {
  const [editingStatus, setEditingStatus] = useState(null);
  const [updating, setUpdating] = useState(false);

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

  const statusOptions = [
    { value: "EN_ATTENTE", label: "En attente" },
    { value: "CONFIRMEE", label: "Confirmée" },
    { value: "EN_PREPARATION", label: "En préparation" },
    { value: "EXPEDIEE", label: "Expédiée" },
    { value: "LIVREE", label: "Livrée" },
    { value: "ANNULEE", label: "Annulée" },
  ];

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      setUpdating(true);
      const token = localStorage.getItem("token");

      await api.put(
        `/commandes/${orderId}`,
        { statutCommande: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state
      if (onUpdateOrder) {
        onUpdateOrder(orderId, newStatus);
      }

      setEditingStatus(null);
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Erreur lors de la mise à jour du statut");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Commande
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.idCommande} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {order.numeroCommande || `CMD-${order.idCommande}`}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {order.idCommande}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {order.client
                      ? `${order.client.prenom || ""} ${
                          order.client.nom || ""
                        }`.trim() || "Client"
                      : "Client"}
                  </div>
                  {order.client?.email && (
                    <div className="text-sm text-gray-500">
                      {order.client.email}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.dateCommande
                    ? new Date(order.dateCommande).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingStatus === order.idCommande ? (
                    <select
                      className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue={order.statutCommande}
                      onChange={(e) =>
                        handleStatusUpdate(order.idCommande, e.target.value)
                      }
                      disabled={updating}
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        order.statutCommande
                      )}`}
                    >
                      {getStatusLabel(order.statutCommande)}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {typeof order.totalCommande === "number"
                    ? `${order.totalCommande.toFixed(2)} €`
                    : order.totalCommande || "0.00 €"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() =>
                      setEditingStatus(
                        editingStatus === order.idCommande
                          ? null
                          : order.idCommande
                      )
                    }
                    className="text-blue-600 hover:text-blue-900"
                    title="Modifier le statut"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onViewDetails(order)}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Voir les détails"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Aucune commande trouvée
        </div>
      )}
    </div>
  );
}
