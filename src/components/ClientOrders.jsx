import { Package } from "lucide-react";

export default function ClientOrders() {
  // This is a placeholder. In a real app, you'd fetch orders from the backend
  const orders = [];

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Package className="w-24 h-24 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Aucune commande
        </h2>
        <p className="text-gray-600">
          Vos commandes apparaîtront ici une fois effectuées
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Mes Commandes</h2>
        <p className="text-gray-600">Historique de vos achats</p>
      </div>

      {/* Orders will be displayed here */}
    </div>
  );
}
