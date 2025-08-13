import React, { useEffect, useState } from "react";
import AlertTable from "./AlertTable";
import { api } from "../api/axios";

export default function AlertManagementContent() {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          setError("Token d'authentification manquant");
          return;
        }
        const res = await api.get("/alertes-stock", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Alerts fetched:", res.data);
        setAlerts(res.data);
        setError(null);
      } catch (error) {
        console.error("Fetch alerts error:", error);
        setError("Erreur lors du chargement des alertes");
        // En cas d'erreur, utiliser des données par défaut
        setAlerts([
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlerts();
  }, []);

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
      {/* Affichage des erreurs */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-2 text-sm underline hover:no-underline"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
      <AlertTable alerts={alerts} onToggleReadStatus={handleToggleReadStatus} />
      {alerts.length === 0 && !isLoading && (
        <div className="text-center text-gray-600">Aucune alerte trouvée.</div>
      )}
    </div>
  );
}
