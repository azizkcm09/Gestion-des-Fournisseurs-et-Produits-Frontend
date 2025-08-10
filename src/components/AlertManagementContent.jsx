import React, { useState } from "react";
import AlertTable from "./AlertTable";

export default function AlertManagementContent() {
  const [alerts, setAlerts] = useState([
    {
      id: "ALRT001",
      type: "Stock",
      message: "Stock faible pour le produit XYZ",
      date: "2024-01-15",
      priority: "High",
      read: false,
    },
    {
      id: "ALRT002",
      type: "Commande",
      message: "Nouvelle commande en attente",
      date: "2024-01-15",
      priority: "Medium",
      read: false,
    },
    {
      id: "ALRT003",
      type: "Livraison",
      message: "Retard de livraison CMD001",
      date: "2024-01-14",
      priority: "High",
      read: false,
    },
  ]);

  const handleToggleReadStatus = (id) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, read: !alert.read } : alert
      )
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Gestion des alertes
        </h1>
        <p className="text-gray-600">Consultez et gérez les alertes système</p>
      </div>
      <AlertTable alerts={alerts} onToggleReadStatus={handleToggleReadStatus} />
    </div>
  );
}
