import React from "react";
import { CheckCircle, Circle } from "lucide-react";

export default function AlertTable({ alerts, onToggleReadStatus }) {
  const getStatusColor = (status) => {
    const s = status.trim();
    switch (s) {
      case "ACTIVE":
        return "bg-red-500 text-white";
      case "RESOLUE":
        return "bg-green-500 text-white";
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
              ID Alerte
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Seuil-Min
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Produit
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
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {alerts.map((alert) => (
            <tr
              key={alert.idAlerte}
              className={alert.read ? "bg-gray-100 opacity-70" : ""}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {alert.idAlerte}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {alert.seuilMinimum}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {alert.produit.nom}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {alert.dateAlerte
                  ? new Date(alert.dateAlerte).toISOString().slice(0, 16)
                  : "—"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap ">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    alert.statutAlerte
                  )}`}
                >
                  {alert.statutAlerte}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onToggleReadStatus(alert.id)}
                  className="text-indigo-600 hover:text-indigo-900 flex items-center"
                >
                  {alert.read ? (
                    <CheckCircle className="w-5 h-5 mr-1 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5 mr-1 text-gray-500" />
                  )}
                  {alert.read ? "Lu" : "Non lu"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
