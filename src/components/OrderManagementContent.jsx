import React from "react";
import OrderTable from "./OrdreTable";

export default function OrderManagementContent() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Gestion des commandes
        </h1>
        <p className="text-gray-600">Suivez et gérez toutes les commandes</p>
      </div>
      <OrderTable />
    </div>
  );
}
