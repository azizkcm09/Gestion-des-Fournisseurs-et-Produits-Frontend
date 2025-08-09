import React from "react";
import { Package, ShoppingCart, Truck, ChevronRight } from "lucide-react";
import AlertItem from "./AlertItem";
export default function RecentAlerts() {
  const recentAlerts = [
    {
      type: "Stock",
      message: "Stock faible pour le produit XYZ",
      priority: "high",
      icon: Package,
    },
    {
      type: "Commande",
      message: "Nouvelle commande en attente",
      priority: "medium",
      icon: ShoppingCart,
    },
    {
      type: "Livraison",
      message: "Retard de livraison CMD001",
      priority: "high",
      icon: Truck,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Alertes récentes
        </h2>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {recentAlerts.map((alert, index) => (
          <AlertItem key={index} alert={alert} />
        ))}
      </div>
    </div>
  );
}
