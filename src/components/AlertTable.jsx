import React from "react";
import { Eye } from "lucide-react";

export default function AlertTable() {
  const alerts = [
    {
      id: "ALRT001",
      type: "Stock faible",
      message: "Le stock du produit X est inférieur à 10 unités.",
      date: "2024-08-01",
      priority: "Haute",
    },
    {
      id: "ALRT002",
      type: "Nouvelle commande",
      message: "Une nouvelle commande a été passée (CMD005).",
      date: "2024-08-02",
      priority: "Moyenne",
    },
    {
      id: "ALRT003",
      type: "Erreur système",
      message: "Erreur de connexion à la base de données.",
      date: "2024-08-03",
      priority: "Critique",
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Haute":
        return "bg-red-500 text-white";
      case "Moyenne":
        return "bg-yellow-500 text-white";
      case "Critique":
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
              ID Alerte
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Message
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
              Priorité
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
            <tr key={alert.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {alert.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {alert.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {alert.message}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {alert.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(
                    alert.priority
                  )}`}
                >
                  {alert.priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900">
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
