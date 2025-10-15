import React from "react";
import { Clock, CheckCircle, Package, Truck, AlertCircle } from "lucide-react";

export default function OrderItem({ order }) {
  const statusColors = {
    "En attente": "bg-yellow-100 text-yellow-700 border-yellow-200",
    Confirmée: "bg-blue-100 text-blue-700 border-blue-200",
    "En préparation": "bg-purple-100 text-purple-700 border-purple-200",
    Expédiée: "bg-indigo-100 text-indigo-700 border-indigo-200",
    Livrée: "bg-green-100 text-green-700 border-green-200",
    Annulée: "bg-red-100 text-red-700 border-red-200",
    // Fallback for old status names
    "En cours": "bg-blue-100 text-blue-700 border-blue-200",
    Livré: "bg-green-100 text-green-700 border-green-200",
  };

  const statusIcons = {
    "En attente": Clock,
    Confirmée: CheckCircle,
    "En préparation": Package,
    Expédiée: Truck,
    Livrée: CheckCircle,
    Annulée: AlertCircle,
    // Fallback for old status names
    "En cours": Clock,
    Livré: CheckCircle,
  };

  const StatusIcon = statusIcons[order.status] || Clock; // Default to Clock icon

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
      <div className="flex-1">
        <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
          {order.id}
        </p>
        <p className="text-sm text-gray-500">{order.client}</p>
      </div>
      <span
        className={`
        px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1
        ${
          statusColors[order.status] ||
          "bg-gray-100 text-gray-700 border-gray-200"
        }
      `}
      >
        <StatusIcon className="w-3 h-3" />
        {order.status}
      </span>
    </div>
  );
}
