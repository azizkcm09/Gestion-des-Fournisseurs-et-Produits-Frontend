import React from "react";
import DeliveryTable from "./DeliveryTable";

export default function DeliveryManagementContent() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Gestion des livraisons
        </h1>
        <p className="text-gray-600">
          Suivez l'état des livraisons en temps réel
        </p>
      </div>
      <DeliveryTable />
    </div>
  );
}
