import React from "react";
import { Eye } from "lucide-react";

export default function DeliveryTable() {
  const deliveries = [
    {
      id: "LIV001",
      orderId: "CMD001",
      deliveryPerson: "Paul Leblanc",
      status: "En route",
      eta: "14:30",
    },
    {
      id: "LIV002",
      orderId: "CMD002",
      deliveryPerson: "Sophie Moreau",
      status: "Livré",
      eta: "Terminé",
    },
    {
      id: "LIV003",
      orderId: "CMD003",
      deliveryPerson: "Marc Dubois",
      status: "Préparation",
      eta: "16:00",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "En route":
        return "bg-blue-500 text-white";
      case "Livré":
        return "bg-green-500 text-white";
      case "Préparation":
        return "bg-orange-500 text-white";
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
              ID Livraison
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Commande
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Livreur
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
              ETA
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
          {deliveries.map((delivery) => (
            <tr key={delivery.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {delivery.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {delivery.orderId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {delivery.deliveryPerson}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    delivery.status
                  )}`}
                >
                  {delivery.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {delivery.eta}
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
