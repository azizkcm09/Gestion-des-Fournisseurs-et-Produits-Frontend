import React from "react";
import { Eye } from "lucide-react";

export default function OrderTable({ orders, onViewDetails }) {
  const getStatusColor = (status) => {
    const s = status.trim();
    switch (s) {
      case "CONFIRMEE":
        return "bg-blue-500 text-white";
      case "LIVREE":
        return "bg-green-500 text-white";
      case "EN_ATTENTE":
        return "bg-orange-500 text-white";
      case "ANNULÉE":
        return "bg-red-500 text-white";
      case "EN_PREPARATION":
        return "bg-yellow-500 text-white";
      case "EXPEDIE":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID Commande
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              numeroCommande
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Statut
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Total
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.idCommande}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {order.idCommande}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.numeroCommande}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.dateCommande
                  ? new Date(order.dateCommande).toISOString().slice(0, 16)
                  : "—"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    order.statutCommande
                  )}`}
                >
                  {order.statutCommande}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.totalCommande}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onViewDetails(order)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
