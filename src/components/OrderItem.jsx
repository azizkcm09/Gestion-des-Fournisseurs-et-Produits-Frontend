import React from "react";
import { Clock, CheckCircle } from "lucide-react";
export default function OrderItem({ order }) {
  const statusColors = {
    "En cours": "bg-blue-100 text-blue-700 border-blue-200",
    Livré: "bg-green-100 text-green-700 border-green-200",
    "En attente": "bg-yellow-100 text-yellow-700 border-yellow-200",
  };

  const statusIcons = {
    "En cours": Clock,
    Livré: CheckCircle,
    "En attente": Clock,
  };

  const StatusIcon = statusIcons[order.status];

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
        ${statusColors[order.status]}
      `}
      >
        <StatusIcon className="w-3 h-3" />
        {order.status}
      </span>
    </div>
  );
}
