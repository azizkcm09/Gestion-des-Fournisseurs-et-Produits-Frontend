import React from "react";
import AlertTable from "./AlertTable";

export default function AlertManagementContent() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Gestion des alertes
        </h1>
        <p className="text-gray-600">
          Suivez et gérez toutes les alertes du système
        </p>
      </div>
      <AlertTable />
    </div>
  );
}
