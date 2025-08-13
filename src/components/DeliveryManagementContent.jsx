import React, { useState, useEffect } from "react";
import DeliveryTable from "./DeliveryTable";
import DeliveryDetailsModal from "./DeliveryDetailsModal";
import { api } from "../api/axios";

export default function DeliveryManagementContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          setError("Token d'authentification manquant");
          return;
        }

        const res = await api.get("/livraisons", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Deliveries fetched:", res.data);
        setDeliveries(res.data);
        setError(null);
      } catch (error) {
        console.error("Fetch deliveries error:", error);
        setError("Erreur lors du chargement des livraisons");
        // En cas d'erreur, utiliser des données par défaut
        setDeliveries([
          {
            id: 1,
            idLivraison: "LIV001",
            commandeId: "CMD001",
            livreur: "Paul Leblanc",
            statut: "En route",
            eta: "14:30",
            dateExpedition: "2024-01-15",
            livreurId: "LIV_001",
            dateLivraisonPrevue: "2024-01-16",
            dateLivraisonEffective: "Non livré",
            statutLivraison: "En route",
            notesLivreur: "Client absent, nouvelle tentative prévue",
            signatureClient: "Non signée",
          },
          {
            id: 2,
            idLivraison: "LIV002",
            commandeId: "CMD002",
            livreur: "Sophie Moreau",
            statut: "Livré",
            eta: "Terminé",
            dateExpedition: "2024-01-14",
            livreurId: "LIV_002",
            dateLivraisonPrevue: "2024-01-15",
            dateLivraisonEffective: "2024-01-15",
            statutLivraison: "Livré",
            notesLivreur: "Livré au voisin",
            signatureClient: "Signée numériquement",
          },
          {
            id: 3,
            idLivraison: "LIV003",
            commandeId: "CMD003",
            livreur: "Marc Dubois",
            statut: "Préparation",
            eta: "16:00",
            dateExpedition: "2024-01-13",
            livreurId: "LIV_003",
            dateLivraisonPrevue: "2024-01-14",
            dateLivraisonEffective: "Non livré",
            statutLivraison: "Préparation",
            notesLivreur: "Colis en attente de ramassage",
            signatureClient: "Non signée",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDeliveries();
  }, []);
  const openDeliveryDetailsModal = (delivery) => {
    setSelectedDelivery(delivery);
    setIsModalOpen(true);
  };
  if (isLoading) {
    return <div className="text-center text-gray-600">Chargement...</div>;
  }
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
      <DeliveryTable
        deliveries={deliveries}
        onViewDetails={openDeliveryDetailsModal}
      />
      <DeliveryDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        delivery={selectedDelivery}
      />
      {deliveries.length === 0 && !isLoading && (
        <div className="text-center text-gray-600">
          Aucune livraison trouvée.
        </div>
      )}
    </div>
  );
}
