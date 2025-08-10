import React, { useState } from "react";
import OrderTable from "./OrdreTable";
import OrderDetailsModal from "./OrderDetailsModal";

export default function OrderManagementContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
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
  ];

  const openOrderDetailsModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Gestion des commandes
        </h1>
        <p className="text-gray-600">Suivez et gérez toutes les commandes</p>
      </div>
      <OrderTable orders={orders} onViewDetails={openOrderDetailsModal} />
      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
}
