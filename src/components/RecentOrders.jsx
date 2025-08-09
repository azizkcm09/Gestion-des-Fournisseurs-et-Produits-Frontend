import React from "react";
import { ChevronRight } from "lucide-react";
import OrderItem from "./OrderItem";
export default function RecentOrders() {
  const recentOrders = [
    {
      id: "CMD001",
      client: "Entreprise ABC",
      status: "En cours",
      statusColor: "blue",
    },
    {
      id: "CMD002",
      client: "Société XYZ",
      status: "Livré",
      statusColor: "green",
    },
    {
      id: "CMD003",
      client: "SARL Martin",
      status: "En attente",
      statusColor: "yellow",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Commandes récentes
        </h2>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {recentOrders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
