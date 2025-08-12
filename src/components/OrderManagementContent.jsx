import React, { useState, useEffect } from "react";
import OrderTable from "./OrdreTable";
import OrderDetailsModal from "./OrderDetailsModal";
import { api } from "../api/axios";

export default function OrderManagementContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          setError("Token d'authentification manquant");
          return;
        }

        const res = await api.get("/commandes", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Orders fetched:", res.data);
        setOrders(res.data);
        setError(null);
      } catch (error) {
        console.error("Fetch orders error:", error);
        setError("Erreur lors du chargement des commandes");
        // En cas d'erreur, utiliser des données par défaut
        setOrders([
          {
            id: 1,
            idCommande: "CMD001",
            numeroCommande: "2024-001",
            client: "Entreprise ABC",
            dateCommande: "2024-01-15",
            statut: "En cours",
            totalCommande: "1,250€",
            taxesAppliquees: "250€",
            adresseLivraison: "123 Rue de la Paix, 75001 Paris",
            modePaiement: "Carte bancaire",
            datePaiement: "2024-01-15",
          },
          {
            id: 2,
            idCommande: "CMD002",
            numeroCommande: "2024-002",
            client: "Société XYZ",
            dateCommande: "2024-01-14",
            statut: "Livré",
            totalCommande: "890€",
            taxesAppliquees: "150€",
            adresseLivraison: "456 Avenue des Champs, 75008 Paris",
            modePaiement: "Virement bancaire",
            datePaiement: "2024-01-14",
          },
          {
            id: 3,
            idCommande: "CMD003",
            numeroCommande: "2024-003",
            client: "SARL Martin",
            dateCommande: "2024-01-13",
            statut: "En attente",
            totalCommande: "2,100€",
            taxesAppliquees: "300€",
            adresseLivraison: "789 Boulevard Saint-Michel, 75005 Paris",
            modePaiement: "PayPal",
            datePaiement: "2024-01-13",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const openOrderDetailsModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setError(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des commandes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Gestion des commandes
        </h1>
        <p className="text-gray-600">Suivez et gérez toutes les commandes</p>
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

      <OrderTable orders={orders} onViewDetails={openOrderDetailsModal} />

      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        order={selectedOrder}
      />

      {orders.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-4">
            Aucune commande trouvée
          </div>
        </div>
      )}
    </div>
  );
}
