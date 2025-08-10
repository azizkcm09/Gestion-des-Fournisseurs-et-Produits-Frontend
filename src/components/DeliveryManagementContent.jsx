import React, { useState } from "react";
import DeliveryTable from "./DeliveryTable";
import DeliveryDetailsModal from "./DeliveryDetailsModal";

export default function DeliveryManagementContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const deliveries = [
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
  ];

  const openDeliveryDetailsModal = (delivery) => {
    setSelectedDelivery(delivery);
    setIsModalOpen(true);
  };

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
      <DeliveryTable
        deliveries={deliveries}
        onViewDetails={openDeliveryDetailsModal}
      />
      <DeliveryDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        delivery={selectedDelivery}
      />
    </div>
  );
}
